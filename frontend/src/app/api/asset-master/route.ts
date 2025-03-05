import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {

        const { data: { data: provinces } } = await axios.get(api.external("/v1/master/province"));
        const { data: { data: asset_types } } = await axios.get(api.external("/v1/master/asset-type"));
        return NextResponse.json({
            data: {
                province: provinces,
                asset_type: asset_types
            },
            status: true
        })

    } catch {
        return NextResponse.json({
            data: {
                province: [],
                asset_type: []
            },
            status: false
        });
    }
}