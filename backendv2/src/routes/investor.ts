import { Router } from "express";
import { consignorUploadImage } from "../app/http/controllers/consignor";

export const investorRouter = Router();

investorRouter.post("/:matchingId/upload-evidence", consignorUploadImage);