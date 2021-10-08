import { createServer, Factory, Model } from "miragejs";
import faker from "faker";
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
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase(); // it generates fake emails and applies lowercase on them
        },
        createdAt() {
          return faker.date.recent(10); // it generates recent dates / range of 10 days before current date
        },
      }),
    },
    seeds(server) {
      server.createList("user", 10);
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
