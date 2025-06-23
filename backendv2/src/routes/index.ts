import { Router } from "express";
import { health } from "../app/http/controllers";
import adminRouter from "./admin";
import authRouter from "./auth";
import assetRouter from "./asset";
import investorRouter from "./investor";

const routeHandler = Router();

routeHandler.get("/", health);
routeHandler.use("/admin", adminRouter);
routeHandler.use("/asset", assetRouter);
routeHandler.use("/auth", authRouter);
routeHandler.use("/investor", investorRouter);

export default routeHandler;
