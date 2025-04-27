export const pipe2array = <T = string>(
  value: string,
  mapFn?: (item: string) => T
) => {
  const arr = value.split("|");
  return mapFn ? arr.map(mapFn) : (arr as unknown as T[]);
};
