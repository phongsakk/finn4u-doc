import { Router } from "express";
import { Recommended } from "../app/http/controllers/asset";

const assetRouter = Router();

assetRouter.get("/recommended", Recommended);

export default assetRouter;
