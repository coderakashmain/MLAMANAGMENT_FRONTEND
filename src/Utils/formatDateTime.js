
export function formatDateTime(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short",   
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: true,
  };

  
  return date.toLocaleString("en-US", options).replace(",", " •");
}
