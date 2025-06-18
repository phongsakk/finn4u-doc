"use client"

import { PromptModal } from "@models/promptmodal";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap"
import { MdOutlineDownload } from "react-icons/md";

const DownLoadForm = {
    lease_agreement: "หนังสือสัญญาเช่า",
    lease_agreement_href: "หนังสือสัญญาเช่า.pdf",
    spouse_consent_letter: "หนังสือยินยอมคู่สมรส",
    spouse_consent_letter_href: "หนังสือยินยอมคู่สมรส.pdf",
    real_estate_agent_appointment_agreement:
        "สัญญาแต่งตั้งนายหน้าขายอสังหาริมทรัพย์",
    real_estate_agent_appointment_agreement_href:
        "สัญญาแต่งตั้งนายหน้าขายอสังหาริมทรัพย์.pdf",
    purchase_and_sale_agreement: "สัญญาจะซื้อจะขาย",
    purchase_and_sale_agreement_href: "สัญญาจะซื้อจะขาย.pdf",
    property_detail_sheet: "ใบลงรายละเอียดทรัพย์",
    property_detail_sheet_href: "ใบลงรายละเอียดทรัพย์.pdf",
    power_of_attorney: "ใบมอบอำนาจ",
    power_of_attorney_href: "ใบมอบอำนาจ_ทด21.pdf",
    condo_power_of_attorney: "หนังสือมอบอำนาจอาคารชุด (อ.ช.๒๑)",
    condo_power_of_attorney_href: "แบบฟอร์มหนังสือมอบอำนาจอาคารชุด (อ.ช.๒๑).pdf",
};

function EvidenceModal({ prompt, Close }: { prompt: PromptModal, Close: () => void }) {
    const [form, setForm] = useState<any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const boot = async () => {
            try {
                setLoading(true)
                const { data: res } = await axios.get(api.internal(``));
                if (res?.statuss) {
                    setForm(res?.data)
                }
            } finally {
                setLoading(false)
            }
        }

        if (prompt.id != 0) {
            boot()
        } else {
            setForm(undefined)
        }

    }, [prompt.id])

    return (<Modal size="lg" show={prompt.show} onHide={Close} centered>
        <Modal.Body>
            <div className="text-end"><Button variant="close" onClick={Close} /></div>
            <h3 className="text-center text-success fw-bold mb-5">เอกสารสัญญา</h3>
            <div className="container">
                <EvidenceResult name={DownLoadForm.lease_agreement} href={DownLoadForm.lease_agreement_href} />
                <EvidenceResult name={DownLoadForm.spouse_consent_letter} href={DownLoadForm.spouse_consent_letter_href} />
                <EvidenceResult name={DownLoadForm.real_estate_agent_appointment_agreement} href={DownLoadForm.real_estate_agent_appointment_agreement_href} />
                <EvidenceResult name={DownLoadForm.purchase_and_sale_agreement} href={DownLoadForm.purchase_and_sale_agreement_href} />
                <EvidenceResult name={DownLoadForm.property_detail_sheet} href={DownLoadForm.property_detail_sheet_href} />
                <EvidenceResult name={DownLoadForm.power_of_attorney} href={DownLoadForm.power_of_attorney_href} />
                <EvidenceResult name={DownLoadForm.condo_power_of_attorney} href={DownLoadForm.condo_power_of_attorney_href} />
            </div>
        </Modal.Body>
    </Modal>
    )
}
export default EvidenceModal

const EvidenceResult = ({ name, href, evidencePath }: { name: string, href: string, evidencePath?: string }) => {
    return <Row className="align-items-center mb-3">
        <div className="col-6 text-end"><Link
            href={`/download/${href}`}
            className="fw-bold text-dark"
            target="_blank"
        >{name}<MdOutlineDownload size={15} />:</Link></div>
        <div className="col-3"> {evidencePath ? <Link href={evidencePath} className="btn btn-outline-primary">ดูเอกสาร</Link> : <span className="text-muted">ไม่มีเอกสาร</span>} </div>
    </Row>
}