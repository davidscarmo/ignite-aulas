import { createServer, Model } from "miragejs";
type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}), //it can contain all User parameters or not;
    },
    routes() {
      this.namespace = "api";
      this.timing = 750; //delay of 750ms
      this.get("/users");
      this.post("/users");

      this.namespace = ""; // resets the namespace because of the api of next api folder
      this.passthrough(); //if the route doesn't exist pass through it and goes to the original route'
    },
  });
  return server;
}
