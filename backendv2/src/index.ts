import express from "express";
import corsMiddleware from "./app/http/middleware/cors";
import errorHandler from "./app/http/middleware/errorHandler";
import routeHandler from "./routes";
import { env } from "./settings/env";
import startLogs from "./app/services/startLogs";

const app = express();
app.use(corsMiddleware);
app.use(routeHandler);
app.use(errorHandler);

app.listen(env.PORT, startLogs);
