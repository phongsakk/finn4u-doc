export const safeNumber = (value: any, defaultValue = 0): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && !isNaN(Number(value))) return Number(value);
  return defaultValue;
};

export const safeString = (value: any, defaultValue = ""): string => {
  try {
    if (!value) return defaultValue;
    if (typeof value === "string") return value;
    return `${value}`;
  } catch (error) {
    return defaultValue;
  }
};
