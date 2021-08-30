import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }
    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }
    try {
      const response = await api.post("/subscribe"); //acess the route who creates the checkoutSession
      const { sessionId } = response.data; // gets the id of the checkoutSession
      const stripe = await getStripeJs(); // load the application thar is used for the payment
      stripe.redirectToCheckout({ sessionId }); // redirect to the payment page at stripe
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {" "}
      Subscribe Now!{" "}
    </button>
  );
}
