"use client";
import axios from "axios";
import { useEffect } from "react"

function page() {
    useEffect(() => {
        const boot = () => {

            let data = JSON.stringify({
                "province_id": 1,
                "district_id": 1,
                "asset_type_id": 1,
                "aria_size_rai": 0,
                "aria_size_Ngan": 6,
                "aria_size_square_wa": 50,
                "collateral": 1,
                "consignment_price": 100,
                "land_title_deed_number": "112",
                "land_plot_number": "224",
                "ended_at": "2025-03-01T00:00:00Z"
            });


            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://103.22.183.137:8078/v1/asset',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            try {
                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (err) {
                console.error(err)
            }


        }
        boot();
    })
    return (
        <div>page</div>
    )
}
export default page;