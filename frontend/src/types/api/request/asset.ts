import dayjs from "dayjs";

export type CreateAssetRequest = {
    province_id: number;
    district_id: number;
    asset_type_id: number;
    aria_size_rai: number;
    aria_size_Ngan: number;
    aria_size_square_wa: number;
    collateral?: number;
    consignment_price?: number;
    land_title_deed_number: string;
    land_plot_number: string;
    location_x?: string;
    location_y?: string;
    ended_at: string;
}