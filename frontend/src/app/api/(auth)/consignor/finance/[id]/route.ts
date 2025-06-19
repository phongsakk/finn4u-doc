import {
  catchError,
  CheckAuth,
  formatNumber,
  PercentageCal,
  ToDateThai,
} from "@components/helpers";
import { FinanceForm } from "@models/finance";
import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
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

    // const { data: res } = await axios.get(
    //   api.external(`/v2`),
    //   session.headerToken
    // );

    const model = {
      date_sell: ToDateThai(dayjs(), "DD/MM/BBBB"),
      end_sell: ToDateThai(dayjs(), "DD/MM/BBBB"),
      duration: formatNumber(FinanceForm.duration),
      appraisal_price: FinanceForm.appraisal_price,
      land_transfer: formatNumber(FinanceForm.land_transfer),
      duty: formatNumber(FinanceForm.duty),
      witness: formatNumber(FinanceForm.witness),
      land_transfer_tax: formatNumber(
        PercentageCal(
          FinanceForm.appraisal_price,
          FinanceForm.land_transfer_tax
        )
      ),
      stamp: formatNumber(
        PercentageCal(FinanceForm.appraisal_price, FinanceForm.stamp)
      ),
      specific_business_tax: formatNumber(
        PercentageCal(
          FinanceForm.appraisal_price,
          FinanceForm.specific_business_tax
        )
      ),
      percent: 9,
      interest_rate: formatNumber(
        PercentageCal(FinanceForm.appraisal_price, FinanceForm.percent)
      ),
      total:
        Number(FinanceForm.land_transfer) +
        Number(FinanceForm.duty) +
        Number(FinanceForm.witness) +
        Number(
          PercentageCal(
            FinanceForm.appraisal_price,
            FinanceForm.land_transfer_tax
          )
        ) +
        Number(PercentageCal(FinanceForm.appraisal_price, FinanceForm.stamp)) +
        Number(
          PercentageCal(
            FinanceForm.appraisal_price,
            FinanceForm.specific_business_tax
          )
        ) +
        Number(PercentageCal(FinanceForm.appraisal_price, FinanceForm.percent)),
      price_received: "",
    };

    return NextResponse.json(
      {
        status: true,
        code: 200,
        data: {
          ...model,
          appraisal_price: formatNumber(model.appraisal_price),
          total: formatNumber(model.total),
          price_received: formatNumber(
            Number(model.appraisal_price) - Number(model.total)
          ),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
