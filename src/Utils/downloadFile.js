
export const downloadFile = (filePath) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  if (!filePath) {
    console.error("Invalid file path provided for download");
    return;
  }

  try {
    const link = document.createElement("a");
    link.href = `${BASE_URL}${filePath}`;
    link.download = filePath.split("/").pop(); 
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error while downloading file:", err);
  }
};
