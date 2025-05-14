"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type FunctionModal = {
  isOpen: boolean;
  id?: number;
  openModal: (num?: number) => void;
  closeModal: () => void;
};

type ModalContextType = {
  assetGraph: FunctionModal;
  assetInfo: FunctionModal;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const createModalController = (): FunctionModal => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setModalID] = useState<number>();

  const openModal = (num?: number) => {
    setModalID(num);
    setIsOpen(true);
  };
  const closeModal = () => {
    setModalID(undefined);
    setIsOpen(false);
  };

  return { isOpen, id, openModal, closeModal };
};

export const ConsignorModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Use functions inside the component to get fresh state
  const assetGraphState = createModalController();
  const assetInfoState = createModalController();

  return (
    <ModalContext.Provider
      value={{ assetGraph: assetGraphState, assetInfo: assetInfoState }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useConsignorModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useConsignorModal must be used within ConsignorModalProvider"
    );
  }
  return context;
};
