"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import WebLogo from "@public/logo.png";
import { Spinner } from "react-bootstrap";
type specialBtn = {
  name: String,
  href: String,
  status?: Boolean
}

type ModelContext = {
  specialBtn?: specialBtn,
  setSplButton: (prompt: specialBtn) => void
}

const Context = createContext<ModelContext | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [specialBtn, setSplBtn] = useState<specialBtn>();

  const setSplButton = (prompt: specialBtn) => {
    setSplBtn({
      ...prompt,
      status: true,
    })
  }


  if (status === "loading") {
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
        <div className="position-absolute bottom-0 pb-3 text-primary fw-bold">
          <Spinner animation="border" role="status" variant="success" />
        </div>
      </div>
    );
  }

  return <Context.Provider value={{ specialBtn, setSplButton }}>{children}</Context.Provider>;
};

export const useSplButton = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}