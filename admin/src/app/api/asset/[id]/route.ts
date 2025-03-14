import { log, logError } from "@component/dev/Helpers";
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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const token = session.user?.accessToken ?? "";

    const {
      data: { data: response_asset },
    } = await axios.get(api.external(`/v1/admin/asset/${id}`), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const {
      data: { data: response_tag },
    } = await axios.get(api.external(`/v1/admin/tag`), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const model = {
      assetMain: {
        id: response_asset.id,
        status: response_asset.status,
        is_published: response_asset.is_published,
      },
      images:
        response_asset.asset_images.map((item: any) => ({
          id: item.id,
          name: item.image,
          is_display: item.is_display,
        })) || [],
      tags:
        response_tag.map((item: any) => ({
          id: item.id,
          name: item.name,
          is_check: response_asset?.asset_tag.find(
            (astagitem: any) => astagitem.tag.id == item.id
          )
            ? true
            : false,
        })) || [],
      asset_appraisal: response_asset?.asset_appraisal || null,
      asset_auction: response_asset?.asset_auction || null,
    };

    return NextResponse.json(model, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data: null,
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { error: "unknow error", data: null },
        { status: 500 }
      );
    }
  }
};
