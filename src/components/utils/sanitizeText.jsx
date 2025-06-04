export const sanitizeText = (text) => {
  // Return empty string if text is falsy or not a string
  if (!text || typeof text !== "string") {
    return "";
  }

  // Handle empty/whitespace-only strings
  if (text.trim().length === 0) {
    return "";
  }

  // Replace redundant whitespace (except line breaks)
  return text.replace(/[^\S\r\n]+/g, " ");
};