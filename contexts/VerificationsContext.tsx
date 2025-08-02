"use client";
import React, { createContext, useContext, useState } from "react";

export interface Verification {
  id: string;
  name: string;
  documentType: string;
  idNumber: string;
  status: string;
  date: string;
  submittedBy: string;
}

const initialVerifications: Verification[] = [
  {
    id: "VER-001",
    name: "Maria Gonzalez",
    documentType: "Cédula",
    idNumber: "12345678",
    status: "Pending",
    date: "2024-01-15",
    submittedBy: "Admin"
  },
  {
    id: "VER-002",
    name: "Carlos Rodriguez",
    documentType: "RIF",
    idNumber: "J-12345678-9",
    status: "Approved",
    date: "2024-01-14",
    submittedBy: "Agent 1"
  },
  {
    id: "VER-003",
    name: "Ana Martinez",
    documentType: "Factura",
    idNumber: "F-000123",
    status: "Rejected",
    date: "2024-01-14",
    submittedBy: "Agent 2"
  }
];

interface VerificationsContextType {
  verifications: Verification[];
  addVerification: (verification: Omit<Verification, "id" | "date">) => void;
  removeVerification: (id: string) => void;
}

const VerificationsContext = createContext<VerificationsContextType | undefined>(undefined);

export function VerificationsProvider({ children }: { children: React.ReactNode }) {
  const [verifications, setVerifications] = useState<Verification[]>(initialVerifications);

  function addVerification(verification: Omit<Verification, "id" | "date">) {
    const newVerification: Verification = {
      ...verification,
      id: `VER-${(verifications.length + 1).toString().padStart(3, "0")}`,
      date: new Date().toISOString().slice(0, 10),
    };
    setVerifications([newVerification, ...verifications]);
  }

  function removeVerification(id: string) {
    setVerifications(verifications => verifications.filter(v => v.id !== id));
  }

  return (
    <VerificationsContext.Provider value={{ verifications, addVerification, removeVerification }}>
      {children}
    </VerificationsContext.Provider>
  );
}

export function useVerifications() {
  const ctx = useContext(VerificationsContext);
  if (!ctx) throw new Error("useVerifications debe usarse dentro de VerificationsProvider");
  return ctx;
}