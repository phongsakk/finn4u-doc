import { catchError, CheckAuth, log, logError } from "@component/dev/Helpers";
import { assetImages, Estimateprice, tags } from "@models/asset";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "No id" }, { status: 401 });
  }
  const session = await CheckAuth();
  if (!session.status) {
    return NextResponse.json(session);
  }
  try {
    const {
      data: { data: response_asset },
    } = await axios.get(
      api.external(`/v1/admin/asset/${id}`),
      session.headerToken
    );

    const model = {
      status: true,
      code: 200,
      data: {
        price_appraisal: response_asset?.asset_appraisal?.price_appraisal || "",
        collateral_price:
          response_asset?.asset_appraisal?.collateral_price || "",
        duration: response_asset?.asset_appraisal?.duration || "",
        status: String(response_asset?.status),
        is_published: response_asset?.is_published,
        display_images:
          response_asset.asset_images.map((item: any) => ({
            id: item.id,
            name: item.image,
            is_display: item.is_display,
          })) || [],
        tags: response_asset?.asset_tag?.map((item: any) => item?.tag.id) || [],
        auction: {
          from_date: response_asset?.asset_auction?.from_date || null,
          from_time: (response_asset?.asset_auction?.from_time as string) || "",
          to_date: response_asset?.asset_auction?.to_date || null,
          to_time: (response_asset?.asset_auction?.to_time as string) || "",
          max_tax: (response_asset?.asset_auction?.max_tax as string) || "",
        },
      },
    };

    return NextResponse.json(model, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
