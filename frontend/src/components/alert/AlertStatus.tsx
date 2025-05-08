"use client";
import { Modal } from "react-bootstrap"
import alertlogo from "@public/finn4u-alert-logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export type AlertType = {
	alertOpen: boolean;
	alertClose?: () => void;
	status?: string | null;
	text?: string | null;
}

function AlertStatus(AlertModel: AlertType) {
	const [open, setOpen] = useState<boolean>(false);
	const [bgHeader, setBgHeader] = useState<string>();
	const [textConent, setTextContent] = useState<string>();
	console.log(AlertModel)
	useEffect(() => {
		if (AlertModel.alertOpen === true) {
			setOpen(AlertModel.alertOpen);
			if (AlertModel.status) {
				if (AlertModel.status === "success") {
					setBgHeader("bg-success");
				} else if (AlertModel.status === "error") {
					setBgHeader("bg-danger");
				}
			}
			setTextContent(AlertModel.text ?? "");
		}
		console.log(AlertModel.alertOpen)
	}, [AlertModel.alertOpen])

	const handleClose = () => {
		setOpen(false);
		AlertModel.alertClose?.();
	}

	return (
		<>
			<Modal show={open}
				onHide={handleClose}
				centered>
				<Modal.Header className={bgHeader}
					closeButton />
				<Modal.Body>
					<Image src={alertlogo}
						className="mb-3"
						alt="" />
					<div className="text-center m-3">
						{textConent} </div>
				</Modal.Body>
			</Modal>
		</>
	)
}
export default AlertStatus
