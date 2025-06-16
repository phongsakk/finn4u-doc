import express from "express";
import { env } from "./settings/env";
import corsMiddleware from "./app/http/middleware/cors";
import errorHandler from "./app/http/middleware/errorHandler";
import routeHandler from "./routes";
import startLogs from "./app/services/startLogs";
import trackRoutes from "./app/http/middleware/trackRoutes";
import bootstrap from "./app/services/bootstrap";
import clearSession from "./app/services/clearSession";

(async () => {
  await bootstrap();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use(trackRoutes);
  app.use(routeHandler);
  app.use(errorHandler);

  app.listen(env.PORT, startLogs);
})().catch((err) => {
  console.log("Error starting server", err);
  clearSession();
});
