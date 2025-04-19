import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { log, logError } from "@components/helpers";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const path_upload = (formData.get("path") as string) || "";
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    const allowedExtensions = ["jpg", "png", "pdf"];

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      log("File is valid: ", file.name);
    } else {
      logError("Invalid file type. Only JPG, PNG, and PDF are allowed.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${file.name}.jpg`;
    const filepath = path.join(
      process.cwd(),
      "public/contents",
      path_upload,
      filename
    );

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    // Write file to disk
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/contents/ ${
        path_upload != "" ? path_upload + "/" : ""
      } ${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
