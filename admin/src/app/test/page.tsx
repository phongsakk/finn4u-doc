"use client";
import axios from "axios";
import { useEffect, useState } from "react"

function page() {
    const [ctn, setCtn] = useState<string>("")
    useEffect(() => {
        const boot = () => {

            // let data = JSON.stringify({
            //     "province_id": 1,
            //     "district_id": 1,
            //     "asset_type_id": 1,
            //     "aria_size_rai": 0,
            //     "aria_size_Ngan": 6,
            //     "aria_size_square_wa": 50,
            //     "collateral": 1,
            //     "consignment_price": 100,
            //     "land_title_deed_number": "112",
            //     "land_plot_number": "224",
            //     "ended_at": "2025-03-01T00:00:00Z"
            // });


            let config = {
                method: 'post',
                url: 'http://localhost:8078',
                // url: 'http://103.22.183.137:8078',
                headers: {
                    'Content-Type': 'application/json'
                },
                // data: data
            };
            // let config = {
            //     method: 'post',
            //     url: 'http://103.22.183.137:8078/v1/asset',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     // data: data
            // };

            try {
                axios.post('/api/test')
                // axios.get('http://103.22.183.137:8078/v1')
                    .then((response) => {
                        setCtn(JSON.stringify(response.data));
                    })
                    .catch((error) => {
                        setCtn(JSON.stringify(error?.response.data));
                        console.error(error);
                    });
            } catch (err) {
                console.error(err)
            }


        }
        boot();
    }, [])
    return (
        <div>page

            <div>{ctn}</div>
        </div>
    )
}
export default page;