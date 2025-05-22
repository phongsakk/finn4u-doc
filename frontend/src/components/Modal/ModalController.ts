"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLoaderContext } from "@components/context/LoaderContext";

export default function ModalController() {
  const searchParams = useSearchParams();
  const modalType = searchParams.get("modal") || "";
  const { openModal } = useLoaderContext();

  useEffect(() => {
    if (modalType === "login") {
      openModal("login"); // Show the login modal
    }
  }, [modalType, openModal]);

  return null; // Invisible controller
}
