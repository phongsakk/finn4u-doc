import {Modal} from "react-bootstrap"
import alertlogo from "@public/finn4u-alert-logo.svg";
import Image from "next/image";

export type AlertType = {
	alertOpen: boolean;
	alertClose?: () => void;
	status?: string | null;
	text?: string | null;
}

function AlertStatus({alertOpen, alertClose, status, text} : AlertType) {

	let bgHeader = "";
	if (status) {
		if (status === "success") {
			bgHeader = "bg-success";
		} else if (status === "error") {
			bgHeader = "bg-danger";
		}
	}

	return (
		<>
			<Modal show={alertOpen}
				onHide={alertClose}
				centered>
				<Modal.Header className={bgHeader}
					closeButton/>
				<Modal.Body>
					<Image src={alertlogo}
						className="mb-3"
						alt=""/>
					<div className="text-center m-3">
						{text} </div>
				</Modal.Body>
			</Modal>
		</>
	)
}
export default AlertStatus
