import { Router } from "express";
import { health } from "../app/http/controllers";
import adminRouter from "./admin";
import authRouter from "./auth";
import investorRouter from "./investor";

const routeHandler = Router();

routeHandler.get("/", health);
routeHandler.use("/auth", authRouter);
routeHandler.use("/investor", investorRouter);
routeHandler.use("/admin", adminRouter);

export default routeHandler;
