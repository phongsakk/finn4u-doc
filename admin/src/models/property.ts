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
