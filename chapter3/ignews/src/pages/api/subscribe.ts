import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";
type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_costumer_id: string;
  };
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get the user session from cookies
  const session = await getSession({ req });

  const user = await fauna.query<User>(
    q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
  );

  // try to get the user stripe_costumer_id 
  let customerId = user.data.stripe_costumer_id;
  if (!customerId) {
    //creates a new user at stripe for the user who wants to do a payment
    const stripeCostumer = await stripe.customers.create({
      email: session.user.email,
    });

    await fauna.query(
      q.Update(q.Ref(q.Collection("users"), user.ref.id), {
        data: {
          stripe_costumer_id: stripeCostumer.id,
        },
      })
    );
    customerId = stripeCostumer.id;
  }

  //check if the request is post, request for stripeCheckoutSession is only by method post
  if (req.method === "POST") {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1JH8M5LcoIv6OTSUNYl5Jf4w",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
