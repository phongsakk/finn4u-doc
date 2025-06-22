import { Router } from "express";
import { getMatchingByAssetID } from "../app/http/controllers/admin";

const adminRouter = Router();

adminRouter.get("/matching/:assetID", getMatchingByAssetID);

adminRouter.post("/asset/:assetID", getMatchingByAssetID);

export default adminRouter;
