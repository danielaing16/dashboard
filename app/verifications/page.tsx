"use client";
import { useVerifications } from "@/contexts/VerificationsContext";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trash2, Eye, ArrowLeft } from "lucide-react"; // <--- agrega ArrowLeft aquí
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // <--- agrega useRouter aquí
import { useNotifications } from "@/contexts/NotificationContext";

const estados = ["All", "Pending", "Approved", "Rejected"];
const tipos = ["All", "Cédula", "RIF", "Factura"];

export default function VerificationsPage() {
  const { addNotification } = useNotifications();
  const { verifications, removeVerification } = useVerifications();
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("All");
  const [tipo, setTipo] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); // <--- agrega esto aquí

  const filtered = verifications.filter(v => {
    const matchEstado = estado === "All" || v.status === estado;
    const matchTipo = tipo === "All" || v.documentType === tipo;
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.idNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase());
    return matchEstado && matchTipo && matchSearch;
  });
  <div className="mb-8">
  <h2 className="font-bold mb-2">Prueba de Notificaciones</h2>
  <div className="flex flex-col gap-2">
    <Button onClick={() => addNotification({ title: "Éxito", message: "Notificación de éxito", type: "success" })}>Probar éxito</Button>
    <Button onClick={() => addNotification({ title: "Advertencia", message: "Notificación de advertencia", type: "warning" })}>Probar warning</Button>
    <Button onClick={() => addNotification({ title: "Error", message: "Notificación de error", type: "error" })}>Probar error</Button>
    <Button onClick={() => addNotification({ title: "Info", message: "Notificación informativa", type: "info" })}>Probar info</Button>
  </div>
</div>


  function handleView(v) {
    setSelected(v);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelected(null);
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Botón de regresar */}
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2" /> Regresar
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-primary">Verificaciones</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <Input
          placeholder="Buscar por nombre, ID o número de documento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-96"
        />
        <select
          className="border border-border rounded-lg px-3 py-2 bg-background text-foreground"
          value={estado}
          onChange={e => setEstado(e.target.value)}
        >
          {estados.map(e => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <select
          className="border border-border rounded-lg px-3 py-2 bg-background text-foreground"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          {tipos.map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">ID</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Nombre</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Tipo</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Número</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Estado</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Fecha</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Enviado por</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-muted-foreground">No se encontraron verificaciones.</td>
              </tr>
            )}
            {filtered.map(v => (
              <tr key={v.id} className="border-b border-border">
                <td className="py-3 px-4 text-sm">{v.id}</td>
                <td className="py-3 px-4 text-sm">{v.name}</td>
                <td className="py-3 px-4 text-sm">{v.documentType}</td>
                <td className="py-3 px-4 text-sm">{v.idNumber}</td>
                <td className="py-3 px-4">
                  <Badge variant={v.status === "Pending" ? "warning" : v.status === "Approved" ? "success" : "destructive"}>{v.status}</Badge>
                </td>
                <td className="py-3 px-4 text-sm">{v.date}</td>
                <td className="py-3 px-4 text-sm">{v.submittedBy}</td>
                <td className="py-3 px-4 text-sm flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleView(v)} title="Ver detalles">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => removeVerification(v.id)} title="Eliminar">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de detalles */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-2xl shadow-2xl min-w-[320px] max-w-[95vw] w-full sm:w-[400px] border border-border">
            <h2 className="text-xl font-bold mb-4 text-primary">Detalles de Verificación</h2>
            <div className="space-y-2">
              <div><span className="font-medium">ID:</span> {selected.id}</div>
              <div><span className="font-medium">Nombre:</span> {selected.name}</div>
              <div><span className="font-medium">Tipo:</span> {selected.documentType}</div>
              <div><span className="font-medium">Número:</span> {selected.idNumber}</div>
              <div><span className="font-medium">Estado:</span> <Badge variant={selected.status === "Pending" ? "warning" : selected.status === "Approved" ? "success" : "destructive"}>{selected.status}</Badge></div>
              <div><span className="font-medium">Fecha:</span> {selected.date}</div>
              <div><span className="font-medium">Enviado por:</span> {selected.submittedBy}</div>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={handleCloseModal}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}