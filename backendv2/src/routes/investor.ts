import { Router } from "express";
import { consignorMatchingAll, consignorMatchingDetails, consignorUploadImage } from "../app/http/controllers/consignor";

export const investorRouter = Router();

investorRouter.get("/", consignorMatchingAll);
investorRouter.get("/:matchingId", consignorMatchingDetails);
investorRouter.post("/:matchingId/upload-evidence", consignorUploadImage);