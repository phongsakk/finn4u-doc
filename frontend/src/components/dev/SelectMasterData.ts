import { useEffect } from "react";
import { searchDistrict, searchProvince } from "@components/helpers";

export function SelectProvince({
  form,
  setForm,
  dataSet,
  masterData,
  setDistricts,
  setSubDistricts
}: {
  form: any;
  setForm: (updater: (prev: any) => any) => void;
  dataSet: any;
  masterData: any;
  setDistricts: (value: any[]) => void;
  setSubDistricts: (value: any[]) => void;
}) {
  useEffect(() => {
    if (masterData?.district) {
      searchDistrict(
        form.province_id,
        setDistricts,
        masterData.district
      );

      setSubDistricts([]);

      setForm((prev) => {
        const newDistrictId = dataSet?.district_id
          ? String(dataSet.district_id)
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
  dataSet,
  masterData,
  setSubDistricts,
}: {
  form: any;
  setForm: (updater: (prev: any) => any) => void;
  dataSet: any;
  masterData: any;
  setSubDistricts: (value: any[]) => void;
}) {
  useEffect(() => {
    if (masterData?.subDistrict) {
      searchDistrict(
        form.district_id,
        setSubDistricts,
        masterData.subDistrict
      );

      setForm((prev) => {
        const newSubDistrictId = dataSet?.sub_district_id
          ? String(dataSet.sub_district_id)
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


// export function SelectSubDistrict({

// })