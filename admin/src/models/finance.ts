export type financeType = {
  id?: number;
  show?: boolean;
};

export type FinanceContentType = {
  faqModal: financeType;
  CloseFAQ: () => void;
};

export const financeForm = {
  appraisal_price: "",
  land_transfer: "",
  duty: "",
  witness: "",
  land_transfer_tax: "",
  stamp:"",
  specific_business_tax:"",
  interest_rate:"",
  total:"",
  price_received:"",

  percent:"",
};

export const financeDoc = {
    test:File
}