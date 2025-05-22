"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import WebLogo from "@public/logo.png";
import { Spinner } from "react-bootstrap";
import { usePathname } from 'next/navigation';


type specialBtn = {
  name: String,
  href: String,
  status?: Boolean
}

type ModalType = "login" | "register" | null;

type ContextType = {
  pathname: string,
  session: any,
  status: any,
  specialBtn?: specialBtn,
  setSplButton: (prompt: specialBtn) => void
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [specialBtn, setSplBtn] = useState<specialBtn>();
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    setSplBtn((prev: any) => ({
      ...prev,
      status: false,
    }))
  }, [pathname]);

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

  return <Context.Provider value={{ pathname, session, status, specialBtn, setSplButton, modalType, openModal, closeModal }}>{children}</Context.Provider>;
};

export const useLoaderContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useProvider must be used within LoaderProvider");
  return context;
};
