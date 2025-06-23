import { CustomError } from "../../../types/exception";
import { CustomHandler } from "../../../types/http";
import { safeNumber, serializeBigInt } from "../../../utils/data";
import prisma from "../../../utils/prisma";

export const getMatchingByAssetID: CustomHandler<{ assetID: string }> = async (
  req,
  res
) => {
  const result = await prisma.matchings.findFirst({
    where: {
      asset_id: safeNumber(req.params.assetID),
    },
    include: {
      asset_bid_offer: true,
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
        },
      },
    },
  });

  if (!result) {
    throw new CustomError("Matching not found", 404);
  }

  res.status(200).json({
    status: true,
    message: "Matching found",
    code: 200,
    data: serializeBigInt(result),
  });
};

export const updateAssetByID: CustomHandler<{ assetID: string }> = async (
  req,
  res
) => {
  const asset = await prisma.asset.findUnique({
    where: {
      id: safeNumber(req.params.assetID),
    }
  });
  if (!asset) {
    throw new CustomError("Asset not found", 404);
  }
  const updatedAsset = await prisma.asset.update({
    where: {
      id: safeNumber(asset.id),
    },
    data: {
      // province_id            BigInt
      // district_id            BigInt?
      // asset_type_id          BigInt
      // owner_id               BigInt
      // aria_size_rai          BigInt
      // aria_size_ngan         BigInt
      // aria_size_square_wa    Decimal                  @db.Decimal(18, 2)
      // aria_size_square_metre Decimal                  @default(0) @db.Decimal(18, 2)
      // collateral             BigInt?
      // consignment_price      BigInt?
      // land_title_deed_number String                   @db.VarChar(128)
      // land_title_deed_image  String
      // land_plot_number       String                   @db.VarChar(128)
      // description            String?
      // location               String?                  @db.VarChar(128)
      // location_x             String?                  @db.VarChar(128)
      // location_y             String?                  @db.VarChar(128)
      // is_multiple_holder     Boolean?                 @default(false)
      // published_at           DateTime?                @db.Timestamptz(6)
      // ended_at               DateTime?                @db.Timestamptz(6)
      // status                 BigInt?
      // is_published           Boolean?
      // is_recommended         Boolean?                 @default(false)
      // view_count             BigInt                   @default(0)
      // bid_count              BigInt                   @default(0)
      // recommended_at         DateTime?                @db.Timestamptz(6)
    }
  })
};
