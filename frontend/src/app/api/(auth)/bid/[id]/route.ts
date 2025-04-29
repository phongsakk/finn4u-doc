import { catchError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "No id" }, { status: 401 });
    }
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const token = session.user?.accessToken ?? "";

    // const {
    //   data: { data: res_bid },
    // } = await axios.post(api.external(`/v1/bid`), body, {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // });

    let cllk_message = "";
    let url_redirect = "";
    const test = "upload-contract" as string;
    // switch (res_bid.message) {
    switch (test) {
      case "success":
        cllk_message = "success";
        break;
      case "overlimit":
        cllk_message = "success";
        break;
      case "upload-contract":
        cllk_message = "contract";
        url_redirect =
          process.env.NEXT_PUBLIC_AUTH_URL + `/property/contract/${id}` ||
          `https://finn4u.com/property/contract/${id}`;
        break;
      default:
        cllk_message = cllk_message;
        break;
    }

    return NextResponse.json(
      {
        status: true,
        code: 200,
        data: {
          message: cllk_message,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
