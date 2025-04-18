export type regis_personal = {
  UserID: number;
  Phone: string;
  Email: string;
  Ref: string;
};

import { z } from "zod";

export const regisConsignor = ()=>{
  
}
export const ConsignorSchema = z.object({
  prefix_id: z.number().int().min(1),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(10).max(10),
  online_range: z.string().min(1),
  career_id: z.number().min(1),
  salary: z.string().min(1),
  address: z.string().min(1),
  street: z.string().min(1),
  province_id: z.string().min(1),
  district_id: z.string().min(1),
  sub_district_id: z.string().min(1),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});


export const formRegisterCon = {
  prefix_id: 1,
  firstname: "",
  lastname: "",
  phone_number: "",
  online_range: "",
  career_id: 1,
  salary: "",
  address: "",
  street: "",
  province_id: "",
  district_id: "",
  sub_district_id: "",
  email: "",
  password: "",
  confirm_password: "",
};
