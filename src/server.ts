import { app } from "./app";
import { env } from "./.env";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is listening on port 3337`);
  });
