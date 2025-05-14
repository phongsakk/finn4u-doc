"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Suspense,
} from "react";

type ModalType = "login" | "register" | null;

type ModalContextType = {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      <Suspense>{children}</Suspense>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
