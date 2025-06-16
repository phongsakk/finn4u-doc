import { Router } from "express";
import { health } from "../app/http/controllers";
import { investorRouter } from "./investor";

const routeHandler = Router();

routeHandler.get("/", health);
routeHandler.use("/investor/", investorRouter);

export default routeHandler;
