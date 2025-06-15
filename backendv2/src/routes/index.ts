import { Router } from "express";
import { health } from "../app/http/controllers";
import { guard } from "../app/services/guard";

const routeHandler = Router();

routeHandler.get("/", guard(health));

export default routeHandler;
