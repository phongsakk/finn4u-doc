import { PrismaClient } from "../../../../generated/prisma";
import { CustomHandler } from "../../../types/extends";
import { z } from "zod";
import { safeNumber } from "../../../utils/data";
import { CustomError } from "../../../types/exception";
import prisma from "../../../utils/prisma";

const ConsignorUploadImageSchema = z.object({
  lease_agreement: z.string().nullable(),
  spouse_consent_letter: z.string().nullable(),
  real_estate_agent_appointment_agreement: z.string().nullable(),
  purchase_and_sale_agreement: z.string().nullable(),
  property_detail_sheet: z.string().nullable(),
  power_of_attorney: z.string().nullable(),
  condo_power_of_attorney: z.string().nullable(),
});
type ConsignorUploadImageSchema = z.infer<typeof ConsignorUploadImageSchema>;

export const consignorUploadImage: CustomHandler<{
  matchingId: string;
}> = async (req, res) => {
  const matchingId = req.params.matchingId;
  console.log(req.body);
  const consignorUploadImage = ConsignorUploadImageSchema.parse(req.body);

  const matching = await prisma.matchings.findFirst({
    where: {
      id: safeNumber(matchingId),
    },
  });
  if (!matching) {
    throw new CustomError("Matching not found", 404);
  }
  const updatedMatching = await prisma.matchings.update({
    where: {
      id: safeNumber(matchingId),
    },
    data: {
      lease_agreement: consignorUploadImage.lease_agreement,
      spouse_consent_letter: consignorUploadImage.spouse_consent_letter,
      real_estate_agent_appointment_agreement:
        consignorUploadImage.real_estate_agent_appointment_agreement,
      purchase_and_sale_agreement:
        consignorUploadImage.purchase_and_sale_agreement,
      property_detail_sheet: consignorUploadImage.property_detail_sheet,
      power_of_attorney: consignorUploadImage.power_of_attorney,
      condo_power_of_attorney: consignorUploadImage.condo_power_of_attorney,
    },
  });

  res.status(201).json({
    status: true,
    code: 201,
    message: "Evidence uploaded successfully",
    data: updatedMatching,
  });
};

export const consignorMatchingAll: CustomHandler = async (req, res) => {
  const matchings = await prisma.matchings.findMany();
  res.status(200).json({
    message: "Matching list retrieved successfully",
    status: true,
    code: 200,
    data: matchings,
  });
}

export const consignorMatchingDetails: CustomHandler = async (req, res) => {
  const matchingId = req.params.matchingId;

  const matching = await prisma.matchings.findFirst({
    where: {
      id: safeNumber(matchingId),
    },
  });
  if (!matching) {
    throw new CustomError("Matching not found", 404);
  }

  res.status(200).json({
    message: "Matching details retrieved successfully",
    status: true,
    code: 200,
    data: matching,
  });
};
