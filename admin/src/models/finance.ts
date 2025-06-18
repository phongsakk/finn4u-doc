import { formatNumber } from "@component/dev/Helpers";

export type financeType = {
  id?: number;
  show?: boolean;
};

export type FinanceContentType = {
  faqModal: financeType;
  CloseFAQ: () => void;
};

export const financeForm = {
  appraisal_price: formatNumber(140000),
  land_transfer: formatNumber(5),
  duty: formatNumber(5),
  witness: formatNumber(20),
  land_transfer_tax: formatNumber(2),
  stamp: formatNumber(0.5),
  specific_business_tax: formatNumber(3.3),
  percent: "9",
  interest_rate: "",
  total: "",
  price_received: "",
};

export const financeDoc = {
  test: File,
};
