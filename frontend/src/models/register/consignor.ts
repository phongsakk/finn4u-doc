import { any, z } from "zod";

export type regis_personal = {
  UserID: number;
  Phone: string;
  Email: string;
  Ref: string;
  info: any;
};
// export type TypeformRegisterCon = {
//   user_prefix_id: String;
//   firstname: String;
//   lastname: String;
//   phone_number: String;
//   online_range: String;
//   career_id: "1";
//   salary: String;
//   address: String;
//   street: String;
//   province_id: String;
//   district_id: String;
//   sub_district_id: String;
//   email: String;
//   password: String;
//   confirm_password: String;
// };
export const formRegisterCon = {
  user_prefix_id: "1",
  firstname: "",
  lastname: "",
  phone_number: "",
  online_range: "",
  career_id: "1",
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

export const ConsignorSchema = z
  .object({
    user_prefix_id: z.string().min(1, "required - คำนำหน้า"),
    firstname: z.string().min(1, "required - ชื่อ"),
    lastname: z.string().min(1, "required - นามสกุล"),
    phone_number: z.string().min(10, "required - เบอร์โทรศัพท์").max(10),
    online_range: z.string().min(1, "required - เวลาที่สะดวกให้ติดต่อกลับ"),
    career_id: z.number().min(1, "required - อาชีพ"),
    salary: z.string().min(1, "required - รายได้ต่อเดือน"),
    address: z.string().min(1, "required - ที่อยู่ปัจจุบัน"),
    street: z.string().min(1, "required - ถนน"),
    province_id: z.string().min(1, "required - จังหวัด"),
    district_id: z.string().min(1, "required - อำเภอ/เขต"),
    sub_district_id: z.string().min(1, "required - ตำบล/แขวง"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
