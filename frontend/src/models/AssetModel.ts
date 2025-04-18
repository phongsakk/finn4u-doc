export type AssetModel = {
  id: number;
  aria_size: string;
  collateral: number;
  consignment_price: number;
  location_x: number;
  location_y: number;
  province_name: string;
  asset_type_name: string;
  asset_auction?: {
    from_date?: Date;
    from_time?: string;
    to_date?: Date;
    to_time?: string;
  };
};
