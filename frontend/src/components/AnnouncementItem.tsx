"use client"

import Image from "next/image"
import { IconCusttom } from "./common"
import { formatNumber, ToDateThai } from "./helpers"
import dayjs from "dayjs"

export const AnnouncementItem = ({ prompt = null }: { prompt: any }) => {
    return (
        <div className="property-group  bg-white px-2 mb-3">
            <div className="row shadow">
                <div className="col-lg-7 px-0">
                    <div className="relative pe-none h-100">
                        <div className="bg-light d-flex justify-content-center align-items-center h-100">
                            <Image
                                src="/video1.png"
                                className="object-fit-cover"
                                width={100}
                                height={100}
                                style={{ height: "100%" }}
                                alt=""
                                sizes="100vm"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 p-1 p-lg-3">
                    <label className="bg-light rounded font2 p-3 border mb-4">
                        {prompt?.province?.name}
                    </label>
                    <div className="d-flex mb-4">
                        <IconCusttom src="/ic-lo1.svg" />
                        <span className="font2">
                            <span>เลขที่ฝากขาย</span>
                            <span className="px-2">
                                {String(prompt.id).padStart(5, "0")}
                            </span>
                        </span>
                    </div>
                    <div className="d-flex mb-4">
                        <IconCusttom src="/ic-lo2.svg" />
                        <span className="font2">{prompt.square_meter} ตารางวา</span>
                    </div>
                    <div className="d-flex mb-4">
                        <IconCusttom src="/mdi_location.svg" />
                        <span className="font2">{prompt?.district?.name} {prompt?.province?.name}</span>
                    </div>
                    <div className="d-flex mb-4">
                        <IconCusttom src="/ic_calendar.svg" />
                        <span className="font2">
                            {ToDateThai(dayjs(prompt?.created_at), "D MMMM BBBB")}
                        </span>
                    </div>
                    <div className="fw-bold text-end text-primary h2">
                        ฿ {formatNumber(prompt?.price)}
                    </div>
                </div>
            </div>
        </div>

    )

}