import { catchError, ResponseJson } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { data: res } = await axios.get(
      api.external(`/v1/master/user-prefix`)
    );
    return ResponseJson(
      res,
      res.data.map((item: any) => ({
        value: String(item.id),
        label: item.name,
      })) || []
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
