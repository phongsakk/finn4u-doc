"use client";
import { ReactNode, useState, createContext, useContext } from "react";

type PropertyTpye = {
  reload: boolean;
};

type ConTpye = {
  id: number;
  show: boolean;
  reload: boolean;
};

type TagType = {
  data: any[];
  reload: boolean;
};

type TagModalType = {
  show: boolean;
};

type ContextType = {
  Property: PropertyTpye;
  ReloadProperty: (re: boolean) => void;
  Con: ConTpye;
  OpenCon: (num: number) => void;
  CloseCon: () => void;
  SetReloadCon: (re: boolean) => void;
  TagCon: TagType;
  TagConForm: (data: any[]) => void;
  SetReTagCon: (re: boolean) => void;
  TagModal: TagModalType;
  OpenTagModal: () => void;
  CloseTagModal: () => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [Property, setProperty] = useState({ reload: true });
  const [Con, setCon] = useState<ConTpye>({ id: 0, show: false, reload: true });
  const [TagCon, setTagCon] = useState<TagType>({
    data: [],
    reload: false,
  });
  const [TagModal, setTagModal] = useState<TagModalType>({ show: false });

  const ReloadProperty = (re: boolean) => {
    setProperty({ reload: re });
  };

  const OpenCon = (num: number) => {
    setCon({ id: num, show: true, reload: true });
  };
  const CloseCon = () => {
    setCon((prev) => ({
      ...prev,
      id: 0,
      show: false,
    }));
  };

  const SetReloadCon = (re: boolean) => {
    setCon((prev) => ({
      ...prev,
      reload: re,
    }));
  };

  const TagConForm = (data: any[]) => {
    setTagCon((prev) => ({
      ...prev,
      data: data || [],
    }));
  };

  const SetReTagCon = (re: boolean) => {
    setTagCon((prev) => ({
      ...prev,
      reload: re,
    }));
  };

  const OpenTagModal = () => {
    setTagModal({ show: true });
  };

  const CloseTagModal = () => {
    setTagModal({ show: false });
  };

  return (
    <Context.Provider
      value={{
        Property,
        ReloadProperty,
        Con,
        OpenCon,
        CloseCon,
        SetReloadCon,
        TagCon,
        TagConForm,
        SetReTagCon,
        TagModal,
        OpenTagModal,
        CloseTagModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useProvider must be used within LoaderProvider");
  return context;
};
