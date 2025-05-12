import { NextRequest } from "next/server";
import { join } from "path";
import { existsSync, createReadStream } from "fs";
import { stat } from "fs/promises";
import { logError } from "@component/dev/Helpers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filePath = join(process.cwd(), "uploads", ...path); // or just "uploads", depending where files live

  if (!existsSync(filePath)) {
    return new Response("File not found", { status: 404 });
  }

  const ext = filePath.split(".").pop() ?? "";
  const contentTypeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
  };
  const contentType = contentTypeMap[ext] || "application/octet-stream";

  const statResult = await stat(filePath);
  const fileStream = createReadStream(filePath);

  return new Response(fileStream as unknown as BodyInit, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": statResult.size.toString(),
    },
  });
}
