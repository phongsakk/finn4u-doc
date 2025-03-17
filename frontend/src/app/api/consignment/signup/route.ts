import { log } from "@components/helpers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  log("body: ", body);
};
