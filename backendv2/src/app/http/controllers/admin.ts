import { CustomError } from "../../../types/exception";
import { CustomHandler } from "../../../types/http";
import { safeNumber } from "../../../utils/data";
import prisma from "../../../utils/prisma";

export const getMatchingByAssetID: CustomHandler<{ assetID: string }> = async (
  req,
  res
) => {
  const result = await prisma.asset_auction.findFirst({
    where: {
      asset_id: safeNumber(req.params.assetID),
    },
    include: {
      asset: {
        include: {
          owner: true,
          province: true,
          asset_type: true,
          asset_bid_offer: {
            include: {
              bidder: true,
            },
          },
        }
      },
    }
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
