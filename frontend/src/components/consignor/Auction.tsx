"use client";

import { AlertPrimary } from "@components/alert/SwalAlert";
import Countdown from "@components/Countdown";
import { formatNumber, handleNumberChange, ToDateThai } from "@components/helpers";
import { form } from "@nextui-org/react";
import { api } from "@utils/api/index";
import { Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface AuctionInterface {
    from_date: null
    to_date: null,
    max_tax: null
}

const FormSubmit = {
    bid_percent: ""
}

function Auction({ id, auction }: { id: string, auction: AuctionInterface }) {
    const [form, setForm] = useState(FormSubmit);
    const [submit, setSubmit] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form.bid_percent) {
            return AlertPrimary("กรุณากรอกดอกเบี้ยของคุณ", "error");
        }

        try {
            setSubmit(true);
            const { data: res_bid } = await axios.post(
                api.internal(`/api/bid/${id}`),
                {
                    offer: Number(form.bid_percent),
                }
            );

            var BidMessage = "";
            switch (res_bid.data.message) {
                case "Bid offer created successfully":
                    BidMessage = "คุณได้ทำการ Bid สำเร็จแล้ว";
                    break;
                case "auction has ended":
                    BidMessage = "หมดเวลาการประมูล";
                    break;
                case "maximum bid limit reached":
                    BidMessage = "ถึงขีดจำกัดการ Bid แล้ว";
                    break;
                case "auction has not started yet":
                    BidMessage = "ยังไม่เริ่มการประมูล";
                    break;
                default:
                    BidMessage = res_bid.data.message;
                    break;
            }

            AlertPrimary(BidMessage, res_bid.status ? "success" : "error");
        } catch (error) {
            console.error(error);
            AlertPrimary("500 - Server disconnected. Please try again.", "error");
        } finally {
            setTimeout(() => {
                setSubmit(false);
            }, 1000);
        }
    }
    return (
        <Form onSubmit={handleSubmit} className="mt-3 fw-bold">
            <h5>จะสิ้นสุดการประมูลในอีก :</h5>
            <Countdown fromDate={dayjs(auction.from_date).toDate()} toDate={dayjs(auction.to_date).toDate()} />
            <div className="row mt-3">
                <div className="col-sm-auto h5">ระยะเวลาการประมูล:</div>
                <div className=" row col-lg-6 text-secondary">
                    <div className="col-auto">
                        {ToDateThai(dayjs(
                            auction.from_date
                        )
                            ,
                            "DD/MM/BBBB HH:mm"
                        )}
                    </div>
                    <div className="col-auto px-2">-</div>
                    <div className="col-auto">
                        {ToDateThai(dayjs(
                            auction.to_date,
                        ),
                            "DD/MM/BBBB HH:mm"
                        )}
                    </div>
                </div>
                <div className="row h5 mt-3">
                    <label className="col-auto">
                        เปิดประมูลดอกเบี้ยสูงสุดที่:
                    </label>
                    <label className="col-auto">
                        {formatNumber(Number(auction.max_tax))} %
                    </label>
                </div>
                <h5 className="mt-3">ใส่ดอกเบี้ยของคุณ (%):</h5>
                <div className="row justify-content-start gap-2">
                    <div className="col-auto">
                        <Input
                            onChange={(e) => setForm({ bid_percent: e.target.value })}
                            value={form.bid_percent ?? ""}
                            name="bid-percent"
                            className="form-control front2"
                            disabled={submit}
                            placeholder="กรุณาใส่ดอกเบี้ย"
                        />
                    </div>
                    <div className="col-sm-4">
                        <Button
                            variant="success"
                            type="submit"
                            className="px-5 text-nowrap"
                            disabled={submit}
                        >
                            {!submit ? "Bid Now" : "กำลัง Bid..."}
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    )
}
export default Auction