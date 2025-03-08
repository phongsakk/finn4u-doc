export type ConsignParam = {
  id: number;
  status: boolean;
};

export type Estimateprice = {
  id: number;
  status: number;
  is_published: boolean;
  images: assetImages[];
  tags: tags[];
};

export type tags = {
  id: string;
  name: string;
};
export type assetImages = {
  id: number;
  name: string;
};

export type DoAppraisal = {
  price_appraisal: number;
  collateral_price: number;
  duration: number;
  display_images?: number[];
  tags?: number[];
  is_published?: boolean;
  status: number;
  auction?: Auction;
};

type Auction = {
  from_date: Date;
  to_date: Date;
  from_time: string;
  to_time: string;
  max_tax: number;
};
