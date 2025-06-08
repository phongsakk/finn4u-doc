import {
  catchError,
  log,
  logError,
  parseFormData,
} from "@component/dev/Helpers";
import { UploadFiles } from "@component/dev/uploadfile";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const session = await auth();
    const formData = await req.formData();
    const parsed = await parseFormData(formData);

    const new_images = await UploadFiles(
      formData.getAll("new_images[]") as File[],
      "property"
    );

    if (!id) {
      return NextResponse.json({ error: "No id" }, { status: 401 });
    }
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    var auction_model = null;

    if (
      formData.get("auction[from_date]") &&
      formData.get("auction[from_time]") &&
      formData.get("auction[to_date]") &&
      Number(formData.get("auction[max_tax]"))
    ) {
      auction_model = {
        from_date: formData.get("auction[from_date]"),
        from_time: formData.get("auction[from_time]"),
        to_date: formData.get("auction[to_date]"),
        to_time: formData.get("auction[to_time]"),
        max_tax: Number(formData.get("auction[max_tax]")),
      };
    }

    const tags = formData.getAll("tags[]");

    const model_apr = {
      price_appraisal: Number(parsed.price_appraisal),
      collateral_price: Number(parsed.collateral_price),
      duration: Number(parsed.duration),
      display_images: parsed.display_images
        .filter((x: any) => x.is_display === "true")
        .map((item: any) => Number(item.id)),
      new_images: new_images,
      tags: tags?.map((item: any) => Number(item)) || [],
      is_published: parsed.is_published === "true" ? true : false,
      find_invester: parsed.find_invester === "true" ? true : false,
      status: Number(parsed.status),
      auction: auction_model,
    };
    
    const token = session.user?.accessToken ?? "";
    const { data: response } = await axios.post(
      api.external(`/v1/admin/asset/${id}/appraisal`),
      model_apr,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return NextResponse.json(
      {
        status: response.status,
        code: response.code,
        message: response.message,
      },
      {
        status: response.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
