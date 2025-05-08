import { log } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { data: res_province } = await axios.get(
      api.external("/v1/master/province")
    );
    const { data: res_district } = await axios.get(
      api.external("/v1/master/district")
    );
    const { data: res_subdistrict } = await axios.get(
      api.external("/v1/master/sub-district")
    );

    const { data: res_prefix } = await axios.get(
      api.external("/v1/master/user-prefix")
    );
    const masterData = {
      prefix:
        res_prefix.data.map(({ id, name }: { id: number; name: string }) => ({
          id,
          name,
        })) || [],
      province:
        res_province.data.map(({ id, name }: { id: number; name: string }) => ({
          id,
          name,
        })) || [],
      district:
        res_district.data.map(
          ({
            id,
            name,
            province_id,
          }: {
            id: number;
            name: string;
            province_id: number;
          }) => ({
            id,
            pro_id: province_id,
            name,
          })
        ) || [],
      subDistrict:
        res_subdistrict.data.map(
          ({
            id,
            name,
            district_id,
          }: {
            id: number;
            name: string;
            district_id: number;
          }) => ({
            id,
            dis_id: district_id,
            name,
          })
        ) || [],
    };

    return NextResponse.json(masterData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ text: false }, { status: 500 });
  }
};
