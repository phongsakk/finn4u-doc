import { CheckAuth, logError } from "@component/dev/Helpers";
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
      api.external(`/v2/admin/matching/${id}`),
      session.headerToken
    );

    const model = {
      lease_agreement: res.data?.lease_agreement,
      spouse_consent_letter: res.data?.spouse_consent_letter,
      real_estate_agent_appointment_agreement:
        res.data?.real_estate_agent_appointment_agreement,
      purchase_and_sale_agreement: res.data?.purchase_and_sale_agreement,
      property_detail_sheet: res.data?.property_detail_sheet,
      power_of_attorney: res.data?.power_of_attorney,
      condo_power_of_attorney: res.data?.condo_power_of_attorney,
    };
    
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: model,
      },
      {
        status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await error);
  }
};
