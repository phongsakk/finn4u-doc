import { UploadFile } from "@components/dev/uploadfile";
import {
  catchError,
  CheckAuth,
  logError,
  ResponseJson,
} from "@components/helpers";
import { api } from "@utils/api/index";
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
      api.external(`/v2`),
      session.headerToken
    );

    return ResponseJson(res);
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const lease_agreement = await UploadFile(
      formData.get("lease_agreement") as File,
      "evidence"
    );
    const spouse_consent_letter = await UploadFile(
      formData.get("spouse_consent_letter") as File,
      "evidence"
    );
    const real_estate_agent_appointment_agreement = await UploadFile(
      formData.get("real_estate_agent_appointment_agreement") as File,
      "evidence"
    );
    const purchase_and_sale_agreement = await UploadFile(
      formData.get("purchase_and_sale_agreement") as File,
      "evidence"
    );
    const property_detail_sheet = await UploadFile(
      formData.get("property_detail_sheet") as File,
      "evidence"
    );
    const power_of_attorney = await UploadFile(
      formData.get("power_of_attorney") as File,
      "evidence"
    );
    const condo_power_of_attorney = await UploadFile(
      formData.get("condo_power_of_attorney") as File,
      "evidence"
    );

    const model = {
      lease_agreement: lease_agreement ?? null,
      spouse_consent_letter: spouse_consent_letter ?? null,
      real_estate_agent_appointment_agreement:
        real_estate_agent_appointment_agreement ?? null,
      purchase_and_sale_agreement: purchase_and_sale_agreement ?? null,
      property_detail_sheet: property_detail_sheet ?? null,
      power_of_attorney: power_of_attorney ?? null,
      condo_power_of_attorney: condo_power_of_attorney ?? null,
    };

    const { data: res } = await axios.post(
      api.external(`/v2/investor/${id}/upload-evidence`),
      model,
      session.headerToken
    );
    
    return ResponseJson(res);
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
