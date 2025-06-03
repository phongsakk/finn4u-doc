export interface AuctionInterface {
  fromDate?: Date | null;
  fromTime?: string | null;
  toDate?: Date | null;
  toTime?: string | null;
  maxTax?: string | null;
}

export const auctionModel: AuctionInterface = {
  fromDate: null,
  fromTime: "",
  toDate: null,
  toTime: "",
  maxTax: "",
};

export const PropertyModel = {
  price_appraisal: "",
  collateral_price: "",
  duration: "",
  display_images: [],
  new_images: [] as File[],
  tags: [],
  is_published: false,
  find_invester: false,
  status: "0",
  auction: {
    from_date: "",
    from_time: "",
    to_date: "",
    to_time: "",
    max_tax: ""
  }
}