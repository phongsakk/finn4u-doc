"use client";
import Swal, { SweetAlertResult } from "sweetalert2";
import ReactDOM from "react-dom/client";
import alertlogo from "@/public/finn4u-alert-logo.svg";
import { Button } from "react-bootstrap";
import Image from "next/image";

type AlertType = "success" | "error" | "info";

type ModalPrimaryProps = {
  type: AlertType;
  text: string;
};

export const AlertConfirm = <T = any>(text: string, AlertType: AlertType, callback: (response: SweetAlertResult<T>) => void) => {
  return new Promise<void>((resolve) => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);
    root.render(<ModalPrimary type={AlertType} text={text} />);

    Swal.fire({
      title: '',
      html: container,
      customClass: {
        htmlContainer: "p-0 rounded"
      },
      confirmButtonText: "ตกลง",
      showCancelButton: true,
      cancelButtonText: "ไม่สนใจ"
    }).then((response) => {
      // Handle the response here
      callback(response)
      resolve()
    }).catch(error => {
      console.log(error);

    });
  });
}

export const AlertPrimary = (text: string, AlertType: AlertType) => {
  return new Promise<void>((resolve) => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);
    root.render(<ModalPrimary type={AlertType} text={text} />);

    Swal.fire({
      title: '',
      html: container,
      showConfirmButton: false,
      showCloseButton: false,
      customClass: {
        htmlContainer: "p-0 rounded"
      },
      timer: 2000, // 2 seconds
      willClose: () => {
        resolve(); // Resolves the promise when the alert closes
      }
    });
  });
};

export function ModalPrimary({ type, text }: ModalPrimaryProps) {
  const bgHeader = (type === "success" ? "bg-success text-white" : type === "error"
    ? "bg-danger text-white"
    : "bg-primary text-white") + " d-flex justify-content-end p-3";

  return (
    <>
      <div className={bgHeader}>
        <Button variant="close" onClick={() => Swal.close()} />
      </div>
      <div className="p-3">
        <Image src={alertlogo} className="mb-1" alt="Alert Icon" priority />
        <div className="text-center">{text}</div>
      </div>
    </>
  );
}
