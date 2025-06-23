export const safeNumber = (value: any, defaultValue = 0): number => {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return parseInt(value.toString());
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

export const serializeBigInt = (obj: any): any => {
  if (obj && typeof obj === "object") {
    const keys = Object.keys(obj);
    for (const key of keys) {
      const val = obj[key];
      if (typeof val === "bigint") {
        if (val < Math.pow(2, 52)) {
          obj[key] = parseInt(obj[key].toString());
        } else {
          obj[key] = obj[key].toString();
        }
      } else if (typeof obj[key] === "object") {
        obj[key] = serializeBigInt(obj[key]);
      }
    }
  }
  return obj;
};
