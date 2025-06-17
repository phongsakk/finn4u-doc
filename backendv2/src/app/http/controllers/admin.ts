import { CustomError } from "../../../types/exception";
import { CustomHandler } from "../../../types/extends";
import { safeNumber } from "../../../utils/data";
import prisma from "../../../utils/prisma";

export const getMatchingByAssetID: CustomHandler<{ assetID: string }> = async (
  req,
  res
) => {
  const result = await prisma.matchings.findFirst({
    where: {
      asset_id: safeNumber(req.params.assetID),
    },
  });

  if (!result) {
    throw new CustomError("Matching not found", 404);
  }

  res.status(200).json({
    status: true,
    message: "Matching found",
    code: 200,
    data: result,
  });
};
