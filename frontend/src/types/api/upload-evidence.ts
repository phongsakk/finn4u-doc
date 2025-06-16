import { z } from "zod";

export const ConsignorUploadImageSchema = z.object({
  lease_agreement: z.string().nullable(),
  spouse_consent_letter: z.string().nullable(),
  real_estate_agent_appointment_agreement: z.string().nullable(),
  purchase_and_sale_agreement: z.string().nullable(),
  property_detail_sheet: z.string().nullable(),
  power_of_attorney: z.string().nullable(),
  condo_power_of_attorney: z.string().nullable(),
});
export type ConsignorUploadImageSchema = z.infer<
  typeof ConsignorUploadImageSchema
>;