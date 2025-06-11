export type FaqType = {
  id?: number;
  show?: boolean;
};

const faq = {};

export type FaqContentType = {
  faqModal: FaqType;
  CloseFAQ: () => void;
};

export const FaqForm  = {
  ask: "",
  answer: "",
  status: true,
}
