import { Router } from "express";
import {
  getConsignorList,
  getMatchingByAssetID,
} from "../app/http/controllers/admin";
import { authUser } from "../app/http/middleware/auth";

const adminRouter = Router();

adminRouter.get("/matching/:assetID", getMatchingByAssetID);

adminRouter.post("/asset/:assetID", getMatchingByAssetID);

adminRouter.get("/consignor-list", authUser, getConsignorList);

export default adminRouter;
