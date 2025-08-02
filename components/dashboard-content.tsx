"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Clock, CheckCircle, XCircle, Plus, Eye } from "lucide-react"
import { useState } from "react"
import { useNotifications } from "@/contexts/NotificationContext"
import { useVerifications } from "@/contexts/VerificationsContext"

export function DashboardContent() {
  const { verifications } = useVerifications();
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: "",
    documentType: "Cédula",
    status: "Pending",
    submittedBy: "Admin"
  })
  const { addNotification } = useNotifications()

  const handleAddVerification = (e) => {
    e.preventDefault()
    const newVerification = {
      id: `VER-${(verifications.length + 1).toString().padStart(3, "0")}`,
      name: form.name,
      documentType: form.documentType,
      status: form.status,
      date: new Date().toISOString().slice(0, 10),
      submittedBy: form.submittedBy
    }
    // setVerifications([newVerification, ...verifications]) // This line is removed as per the edit hint
    setShowModal(false)
    setForm({ name: "", documentType: "Cédula", status: "Pending", submittedBy: "Admin" })
    addNotification({
      title: "Nueva verificación",
      message: `Se creó la verificación para ${form.name}`,
      type: "success"
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-background text-foreground">
      {/* Encabezado del dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of verification activities</p>
        </div>
        {/* Botón de New Verification eliminado, ahora solo en la barra lateral */}
      </div>

      {/* Modal para nueva verificación (puedes eliminarlo si solo quieres navegación desde el sidebar) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleAddVerification} className="bg-card p-8 rounded-2xl shadow-2xl flex flex-col gap-5 min-w-[340px] max-w-[95vw] w-full sm:w-[380px] border border-border">
            <h2 className="text-2xl font-bold mb-2 text-center text-primary">Nueva Verificación</h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Nombre completo</label>
              <input
                className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Nombre completo"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Tipo de documento</label>
              <select
                className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={form.documentType}
                onChange={e => setForm(f => ({ ...f, documentType: e.target.value }))}
              >
                <option value="Cédula">Cédula</option>
                <option value="RIF">RIF</option>
                <option value="Factura">Factura</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Estado</label>
              <select
                className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Enviado por</label>
              <input
                className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Admin, Agent 1, etc."
                value={form.submittedBy}
                onChange={e => setForm(f => ({ ...f, submittedBy: e.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <Button type="button" variant="outline" className="rounded-lg" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="rounded-lg">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold">{verifications.length}</span>
            <span className="text-sm text-muted-foreground">Total Verifications</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-8">
            <Clock className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold">{verifications.filter(v => v.status === "Pending").length}</span>
            <span className="text-sm text-muted-foreground">Pending</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-8">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold">{verifications.filter(v => v.status === "Approved").length}</span>
            <span className="text-sm text-muted-foreground">Approved</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-8">
            <XCircle className="w-8 h-8 text-red-600" />
            <span className="text-3xl font-bold">{verifications.filter(v => v.status === "Rejected").length}</span>
            <span className="text-sm text-muted-foreground">Rejected</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de verificaciones recientes */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Verifications</h2>
        <div className="relative mb-4">
          <Input 
            placeholder="Search verifications..." 
            className="w-[300px] pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">ID</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Full Name</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Document Type</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Submitted By</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map(v => (
                <tr key={v.id} className="border-b border-border">
                  <td className="py-3 px-4 text-sm">{v.id}</td>
                  <td className="py-3 px-4 text-sm">{v.name}</td>
                  <td className="py-3 px-4 text-sm">{v.documentType}</td>
                  <td className="py-3 px-4">
                    <Badge variant={v.status === "Pending" ? "warning" : v.status === "Approved" ? "success" : "destructive"}>{v.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">{v.date}</td>
                  <td className="py-3 px-4 text-sm">{v.submittedBy}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}