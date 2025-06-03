import { auth } from "@libs/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      {
        message: "retrive data!",
        status: true,
        data: {
          user_id: 0,
          list: [],
        },
      },
      { status: 200 }
    );
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(
    {
      message: "retrive data!",
      status: true,
      data: {
        user_id: 14,
        list: [
          {
            id: 100001,
            asset_id: 10000101,
            user_id: 14,
          },
          {
            id: 100002,
            asset_id: 10000102,
            user_id: 14,
          },
          {
            id: 100003,
            asset_id: 10000103,
            user_id: 14,
          },
        ],
      },
    },
    { status: 200 }
  );
};

// const ResponseError = async (error: unknown) => {
//     return NextResponse.json(await catchError(error))
//   }
