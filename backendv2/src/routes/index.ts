import { Router } from "express";
import { health } from "../app/http/controllers";
import { investorRouter } from "./investor";
import adminRouter from "./admin";

const routeHandler = Router();

routeHandler.get("/", health);
routeHandler.use("/investor", investorRouter);
routeHandler.use("/admin", adminRouter);

export default routeHandler;
