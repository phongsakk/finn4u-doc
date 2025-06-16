import { Router } from "express";
import { consignorMatchingDetails, consignorUploadImage } from "../app/http/controllers/consignor";

export const investorRouter = Router();

investorRouter.get("/:matchingId", consignorMatchingDetails);
investorRouter.post("/:matchingId/upload-evidence", consignorUploadImage);