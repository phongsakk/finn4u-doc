import { PrismaClient } from "../../../../generated/prisma";
import { CustomHandler } from "../../../types/http";
import { ServerStatus } from "../../../types/response";
import { safeString } from "../../../utils/data";

export const health: CustomHandler<{}, ServerStatus> = async (_req, res) => {
  let status: ServerStatus = {
    db: "ok",
    version: safeString(process.env.npm_package_version, "-"),
  };
  try {
    const client = new PrismaClient();
    await client.$connect();
    await client.$disconnect();
  } catch (err) {
    status.db = "error";
  }
  res.status(200).json({
    message: "OK - API is running",
    status: true,
    code: 200,
    data: status,
  });
};
