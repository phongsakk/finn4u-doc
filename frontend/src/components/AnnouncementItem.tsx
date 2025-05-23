"use client"

import Image from "next/image"
import { IconCusttom } from "./common"
import { formatNumber, ToDateThai } from "./helpers"
import dayjs from "dayjs"
import { Row } from "react-bootstrap"
import ImageApi from "./ImageApi"

export const AnnouncementItem = ({ prompt = null }: { prompt: any }) => {
    return (
        <div className="property-group bg-white px-2">
            <div className="row shadow align-items-stretch">
                <div className="col-lg-7 px-0 d-flex img-fluid">
                    <div className="w-100 d-flex bg-light text-center">
                        <ImageApi
                            src={prompt?.image}
                            style={{ aspectRatio: 1.8, height: "auto" }}
                        />
                    </div>
                </div>
                <div className="col-lg-5 p-1 p-lg-3 d-flex flex-column justify-content-between">
                    <div>
                        <Row className="ms-0 mb-4">
                            <div className="bg-light col-auto rounded text-truncate font2 p-3 border">
                                {prompt?.title}
                            </div>
                        </Row>

                        <div className="d-flex mb-4">
                            <IconCusttom src="/ic-lo1.svg" />
                            <span className="font2">
                                <span>เลขที่ฝากขาย</span>
                                <span className="px-2">{String(prompt.id).padStart(5, "0")}</span>
                            </span>
                        </div>
                        <div className="d-flex mb-4">
                            <IconCusttom src="/ic-lo2.svg" />
                            <span className="font2">{prompt.square_meter} ตารางวา</span>
                        </div>
                        <div className="d-flex mb-4">
                            <IconCusttom src="/mdi_location.svg" />
                            <span className="font2">{prompt?.district_name} {prompt?.province_name}</span>
                        </div>
                        <div className="d-flex mb-4">
                            <IconCusttom src="/ic_calendar.svg" />
                            <span className="font2">
                                {ToDateThai(dayjs(prompt?.created_at), "D MMMM BBBB")}
                            </span>
                        </div>
                    </div>
                    <div className="fw-bold text-end text-primary h2">
                        ฿ {formatNumber(prompt?.price)}
                    </div>
                </div>
            </div>
        </div>


    )

}