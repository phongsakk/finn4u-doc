'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import alertlogo from "@public/finn4u-alert-logo.svg";

type AlertType = 'success' | 'error' | 'info';

type AlertContextType = {
  showAlert: (message: string, type?: AlertType) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [type, setType] = useState<AlertType>('info');

  const showAlert = (message: string, alertType: AlertType = 'info') => {
    setTextContent(message);
    setType(alertType);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Optional: different headers or styles per alert type
  const bgHeader = type === 'success' ? 'bg-success text-white' :
                   type === 'error' ? 'bg-danger text-white' :
                   'bg-primary text-white';

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Modal show={open} onHide={handleClose} centered>
        <Modal.Header className={bgHeader} closeButton />
        <Modal.Body>
          <Image src={alertlogo} className="mb-3" alt="Alert Icon" />
          <div className="text-center m-3">{textContent}</div>
        </Modal.Body>
      </Modal>
    </AlertContext.Provider>
  );
};
