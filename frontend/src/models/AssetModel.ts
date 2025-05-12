export type AssetModel = {
  id: number;
  aria_size: string;
  price_appraisal: number;
  collateral_price: number;
  location_x: number;
  location_y: number;
  province_name: string;
  asset_type_name: string;
  asset_image: string;
  asset_auction?: {
    from_date?: Date;
    from_time?: string;
    to_date?: Date;
    to_time?: string;
  };
  updated_at?: Date;
};
