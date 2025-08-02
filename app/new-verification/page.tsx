"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/contexts/NotificationContext";
import { useVerifications } from "@/contexts/VerificationsContext";

export default function NewVerificationPage() {
  const [form, setForm] = useState({
    name: "",
    documentType: "Cédula",
    idNumber: "",
    file: null as File | null,
  });
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { addVerification } = useVerifications();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addVerification({
      name: form.name,
      documentType: form.documentType,
      idNumber: form.idNumber,
      status: "Pending",
      submittedBy: "Frontend Tester"
    });
    addNotification({
      title: "Nueva verificación",
      message: `Se registró la verificación para ${form.name}`,
      type: "success"
    });
    setForm({ name: "", documentType: "Cédula", idNumber: "", file: null });
  }

  function handleCancel() {
    setForm({ name: "", documentType: "Cédula", idNumber: "", file: null });
    router.push("/");
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      {/* Botón de regresar */}
      <button
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => router.push("/")}
        aria-label="Regresar"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Regresar</span>
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Nueva Verificación</h1>
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-2xl flex flex-col gap-5 border border-border">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Nombre completo</label>
          <input
            className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Nombre completo"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Tipo de documento</label>
          <select
            className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={form.documentType}
            onChange={e => setForm(f => ({ ...f, documentType: e.target.value, idNumber: "" }))}
          >
            <option value="Cédula">Cédula</option>
            <option value="RIF">RIF</option>
            <option value="Factura">Factura</option>
          </select>
        </div>
        {/* Campo dinámico según tipo de documento */}
        {form.documentType === "Cédula" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Número de identificación</label>
            <input
              className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Ej: 12345678"
              required
              value={form.idNumber}
              onChange={e => setForm(f => ({ ...f, idNumber: e.target.value }))}
            />
          </div>
        )}
        {form.documentType === "RIF" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Número de RIF</label>
            <input
              className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Ej: J-12345678-9"
              required
              value={form.idNumber}
              onChange={e => setForm(f => ({ ...f, idNumber: e.target.value }))}
            />
          </div>
        )}
        {form.documentType === "Factura" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Número de factura</label>
            <input
              className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Ej: F-000123"
              required
              value={form.idNumber}
              onChange={e => setForm(f => ({ ...f, idNumber: e.target.value }))}
            />
          </div>
        )}
        {/* Input de archivo para análisis de documento */}

        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Análisis de Documento Subido</label>
          <input
            type="file"
            accept=".pdf,image/*"
            className="
              file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
              file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground 
              file:cursor-pointer file:hover:bg-primary/90 file:transition-colors
              bg-background text-foreground border border-border rounded-lg p-2
              hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20
              transition-all duration-200
              dark:file:bg-primary dark:file:text-primary-foreground
              dark:bg-background dark:text-foreground dark:border-border
            "
            onChange={e => setForm(f => ({ ...f, file: e.target.files?.[0] || null }))}
          />
          <span className="text-xs text-muted-foreground">PDF o imagen (solo visual, no se sube)</span>
        </div>
        <div className="flex gap-2 mt-2 justify-end">
          <Button type="button" variant="outline" className="rounded-lg" onClick={handleCancel}>Cancelar</Button>
          <Button type="submit" className="rounded-lg">Guardar</Button>
        </div>
      </form>
    </main>
  );
}

