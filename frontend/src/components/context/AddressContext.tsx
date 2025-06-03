"use client";
import { FormSelectCustom } from "@components/FormCustom/FormSelectCustom";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";

type ContextType = {
  Province: React.FC<formType>;
  District: React.FC<formType>;
  SubDistrict: React.FC<formType>;
  setMaster: (master: any) => void;
  setFormEdit: (item: any) => void;
};

type formType = {
  name: string;
  value: string;
  handleForm: (e: any) => void;
  setForm: (item: any) => void;
  groupClass?: string;
  type?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  choose?: string;
  invalid?: string;
  disabled?: boolean;
  parant_id?: string;
};

const dataSet = {
  province_id: "",
  district_id: "",
  sub_district_id: "",
  handleForm: (e: any) => {},
  setForm: (item: any) => {},
};

const AddressContext = createContext<ContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [formEdit, setFormEdit] = useState(dataSet);
  const [master, setMaster] = useState<any>({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  useEffect(() => {
    if (master?.province) {
      setProvinces(master?.province);
    }
  }, [master]);

  useEffect(() => {
    if (formEdit.province_id !== "") {
      handleProvinceChange(
        {
          target: {
            name: "province_id",
            value: formEdit.province_id,
          },
        } as React.ChangeEvent<HTMLSelectElement>,
        formEdit.handleForm,
        formEdit.setForm
      );
    }
  }, [formEdit.province_id, master.district]);

  useEffect(() => {
    if (formEdit.district_id !== "") {
      handleDistrictChange(
        {
          target: {
            name: "district_id",
            value: formEdit.district_id,
          },
        } as React.ChangeEvent<HTMLSelectElement>,
        formEdit.handleForm,
        formEdit.setForm
      );
    }
  }, [formEdit.district_id, master.subDistrict]);

  useEffect(() => {
    if (formEdit.sub_district_id !== "") {
      handleSubDistrictChange(
        {
          target: {
            name: "sub_district_id",
            value: formEdit.sub_district_id,
          },
        } as React.ChangeEvent<HTMLSelectElement>,
        formEdit.handleForm,
        formEdit.setForm
      );
    }
  }, [formEdit.sub_district_id, master.subDistrict]);

  const handleProvinceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    handleForm: (eHandle: any) => void,
    setForm: (eForm: any) => void
  ) => {
    setDistricts([]);
    setSubDistricts([]);
    
    if (master?.district?.length > 0) {
      setForm((prev: any) => ({
        ...prev,
        district_id: "",
        sub_district_id: "",
        postal_code: "",
      }));

      const dis_item = master?.district
        ?.filter((x: any) => x.pro_id === Number(e.target.value))
        .map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
      setDistricts(dis_item);
    }
    handleForm(e);
  };

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    handleForm: (eHandle: any) => void,
    setForm: (eForm: any) => void
  ) => {
    setSubDistricts([]);
    if (master?.subDistrict?.length > 0) {
      setForm((prev: any) => ({
        ...prev,
        sub_district_id: "",
        postal_code: "",
      }));
      const sub_dis_item = master?.subDistrict
        ?.filter((x: any) => x.dis_id === Number(e.target.value))
        .map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
      setSubDistricts(sub_dis_item);
    }

    handleForm(e);
  };

  const handleSubDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    handleForm: (eHandle: any) => void,
    setForm: (eForm: any) => void
  ) => {
    setForm((prev: any) => ({
      ...prev,
      postal_code:
        master?.subDistrict?.filter(
          (x: any) => x.id === Number(e.target.value)
        )[0]?.postal_code || "",
    }));

    handleForm(e);
  };

  const value: ContextType = {
    Province: (Prompt: formType) => {
      return AddressInput({
        Prompt: Prompt,
        data: provinces,
        onChange: (e) =>
          handleProvinceChange(e, Prompt.handleForm, Prompt.setForm),
      });
    },
    District: (Prompt: formType) => {
      return AddressInput({
        Prompt: Prompt,
        data: districts,
        onChange: (e) =>
          handleDistrictChange(e, Prompt.handleForm, Prompt.setForm),
      });
    },
    SubDistrict: (Prompt: formType) => {
      return AddressInput({
        Prompt: Prompt,
        data: subDistricts,
        onChange: (e) =>
          handleSubDistrictChange(e, Prompt.handleForm, Prompt.setForm),
      });
    },
    setFormEdit,
    setMaster,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

const AddressInput = ({
  Prompt,
  data,
  onChange,
}: {
  Prompt: formType;
  data: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <FormSelectCustom
      groupClass={Prompt?.groupClass}
      className={Prompt?.className}
      required={Prompt?.required}
      label={Prompt?.label}
      choose={Prompt?.choose}
      invalid={Prompt?.invalid}
      disabled={Prompt?.disabled}
      id={Prompt?.id}
      name={Prompt?.name}
      onChange={onChange}
      value={Prompt?.value}
      data={data as []}
    />
  );
};
