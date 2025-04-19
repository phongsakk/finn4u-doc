export const UploadFile = async (objectFile: File, path = "") => {
  try {
    const formData = new FormData();
    formData.append("file", objectFile);
    formData.append("path", path);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      return { message: `File uploaded: ${result.url}`, status: true };
    } else {
      return { message: `Upload failed: ${result.error}`, status: false };
    }
  } catch (error) {
    return { message: `Error uploading file: ${error}`, status: false };
  }
};
