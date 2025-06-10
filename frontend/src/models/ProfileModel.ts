export const ProfileModel = {
  user_prefix_id: "",
  firstname: "",
  lastname: "",
  email: "",
  phone_number: "",
  line: "",
  birthday: "",
  license_id: "",
  image: "/",
  new_image: undefined,
};

export type ProfileType = {
  user_prefix_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  line: string;
  birthday: string;
  license_id: string;
  image: string;
  new_image: File | undefined;
};

export const ChangePassModel = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};
