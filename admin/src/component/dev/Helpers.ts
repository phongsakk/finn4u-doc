import dayjs from "dayjs";

export const log = (text: any, textObject?: any) => {
  if (textObject === undefined) {
    textObject = "";
  }
  console.log(
    `\x1b[32m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`,
    textObject
  );
};

export const logError = (text: any, textObject?: any) => {
  if (textObject === undefined) {
    textObject = "";
  }
  console.log(
    `\x1b[31m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`,
    textObject
  );
};

export const statusText = (status: number) => {
  const status_label_map = [
    "รอการประเมินราคา",
    "รอร่วมลงทุน",
    "รอ Matching",
    "ขายฝากแล้ว",
  ];

  return status_label_map[status];
};

export const statusColor = (status: number) => {
  const status_color_map = ["#4E5FFA", "#FF9500", "#F04141", "#30B175"];

  return status_color_map[status];
};

export const formatNumber = (
  value: number,
  style: string = "decimal",
  currency?: string
): string => {
  if(!value) return "-"
  const options: Intl.NumberFormatOptions =
    style === "currency"
      ? { style: "currency", currency: currency || "USD" }
      : style === "percent"
      ? { style: "percent" }
      : { style: "decimal" };

  return new Intl.NumberFormat("en-US", options).format(value);
};


export const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputNum: (value: string) => void
  ) => {
    const value = e.target.value;

    const regex = /^(\d+(\.\d*)?|\.\d+)$/;

    if (regex.test(value) || value === "") {
      inputNum(value);
    }
  };

  