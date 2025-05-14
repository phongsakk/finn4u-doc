"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useModal } from "@components/context/ModalContext";

export default function ModalController() {
  const searchParams = useSearchParams();
  const modalType = searchParams.get("modal") || "";
  const { openModal } = useModal();

  useEffect(() => {
    if (modalType === "login") {
      openModal("login"); // Show the login modal
    }
  }, [modalType, openModal]);

  return null; // Invisible controller
}
