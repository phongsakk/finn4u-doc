import { log } from "@components/helpers";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";

export const UploadFile = async (objectFile: File, path_upload = "") => {
  try {
    const fileExtension = objectFile.name.split(".").pop()?.toLowerCase();

    const allowedExtensions = ["jpg", "png", "pdf"];

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      //File is valid
    } else {
      return "";
      //Invalid file type. Only JPG, PNG, and PDF are allowed.
    }

    const arrayBuffer = await objectFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${dayjs().format("YYYYMMDDHHmmss")}-${objectFile.name}`;
    const filepath = path.join(
      process.cwd(),
      "public/uploads",
      path_upload,
      filename
    );

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    // Write file to disk
    fs.writeFileSync(filepath, buffer);

    return filename;
  } catch (error) {
    return "";
  }
};

// Update function signature
export const UploadFiles = async (objectFiles: File[], path_upload = "") => {
  if (!objectFiles || objectFiles.length === 0) return [];

  const fileList = await Promise.all(
    objectFiles.map((file) => UploadFile(file, path_upload))
  );
  return fileList;
};
