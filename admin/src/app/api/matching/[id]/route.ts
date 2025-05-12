import {
  catchError,
  CheckAuth,
  formatNumber,
  logError,
  ToDateThai,
} from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;

    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(
      api.external(`/v1/admin/matching/${id}`),
      session.headerToken
    );

    const bidder_offer =
      res?.data?.asset?.asset_bid_offer.map((item: any) => ({
        id:item.id,
        bidder_id: item.bidder_id,
        number_consignor: item.bidder.gen_id,
        fullname: item?.bidder.Firstname + " " + item?.bidder.Lastname,
        phone_number: item?.bidder.PhoneNumber,
        tag: "ทั่วประเทศ",
        asset_type: "",
        offer: item?.offer,
      })) || [];
    // logError(1231231, bid_offer);
    const model = {
      asset: {
        id: res?.data?.asset.id,
        date_sell: ToDateThai(
          res?.data?.asset?.asset_appraisal?.created_at,
          "DD/MM/BBBB"
        ),
        gen_id: res?.data?.asset?.gen_id,
        consignor_name:
          res?.data?.asset?.owner.Firstname +
          " " +
          res?.data?.asset?.owner.Lastname,
        phone_number: res?.data?.asset?.owner.PhoneNumber,
        province_name: res?.data?.asset?.province.name,
        asset_type: res?.data?.asset?.asset_type.name,
        collateral_price: formatNumber(
          res?.data?.asset?.asset_appraisal.collateral_price
        ),
      },
      bidder_offer: bidder_offer,
    };
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: model,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};

