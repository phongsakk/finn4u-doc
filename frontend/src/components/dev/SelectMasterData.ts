import { useEffect } from "react";

export function SelectProvince({
  form,
  setForm,
  personal,
  masterData,
  setDistricts,
  setSubDistricts,
  selectProvince,
}: {
  form: any;
  setForm: (updater: (prev: any) => any) => void;
  personal: any;
  masterData: any;
  setDistricts: (value: any[]) => void;
  setSubDistricts: (value: any[]) => void;
  selectProvince: (
    provinceId: string,
    setDistricts: (data: any[]) => void,
    districts: any[]
  ) => void;
}) {
  useEffect(() => {
    if (masterData?.district) {
      selectProvince(
        form.province_id,
        setDistricts,
        masterData.district
      );

      setSubDistricts([]);

      setForm((prev) => {
        const newDistrictId = personal?.info?.district_id
          ? String(personal.info.district_id)
          : "";

        if (prev.district_id === newDistrictId && prev.sub_district_id === "") {
          return prev;
        }

        return {
          ...prev,
          district_id: newDistrictId,
          sub_district_id: "",
        };
      });
    }
  }, [form.province_id, masterData?.district]);
}


export function SelectDistrict({
  form,
  setForm,
  personal,
  masterData,
  setSubDistricts,
  selectDistrict,
}: {
  form: any;
  setForm: (updater: (prev: any) => any) => void;
  personal: any;
  masterData: any;
  setSubDistricts: (value: any[]) => void;
  selectDistrict: (
    districtId: string,
    setSubDistricts: (data: any[]) => void,
    subDistricts: any[]
  ) => void;
}) {
  useEffect(() => {
    if (masterData?.subDistrict) {
      selectDistrict(
        form.district_id,
        setSubDistricts,
        masterData.subDistrict
      );

      setForm((prev) => {
        const newSubDistrictId = personal?.info?.sub_district_id
          ? String(personal.info.sub_district_id)
          : "";

        if (prev.sub_district_id === newSubDistrictId) {
          return prev;
        }

        return {
          ...prev,
          sub_district_id: newSubDistrictId,
        };
      });
    }
  }, [form.district_id, masterData?.subDistrict]);
}
