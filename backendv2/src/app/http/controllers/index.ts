import { PrismaClient } from "../../../../generated/prisma";
import { CustomHandler } from "../../../types/extends";
import { safeString } from "../../../utils/data";
type ServerStatus = { db: "ok" | "error"; version: string };
export const health: CustomHandler<{}, ServerStatus> = async (req, res) => {
  let status: ServerStatus = {
    db: "ok",
    // package.json version
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
