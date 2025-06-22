import { Router } from "express";
import { consignorMatchingAll, consignorMatchingDetails, consignorUploadImage } from "../app/http/controllers/consignor";

const investorRouter = Router();

investorRouter.get("/", consignorMatchingAll);
investorRouter.get("/:matchingId", consignorMatchingDetails);
investorRouter.post("/:assetID/upload-evidence", consignorUploadImage);

export default investorRouter