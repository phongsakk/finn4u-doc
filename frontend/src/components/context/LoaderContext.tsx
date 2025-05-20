"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode } from "react";
import WebLogo from "@public/logo.png";
import { Button } from "react-bootstrap";

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return (
      <div className="bg-white position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <Image
            src={WebLogo}
            className="bg-primary rounded-circle"
            width={100}
            height={100}
            style={{ height: "auto" }}
            alt="Alert Icon"
            priority
          />
        </div>
        <div className="position-absolute bottom-0 h4 pb-3 text-primary fw-bold">
          Finn4U
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
