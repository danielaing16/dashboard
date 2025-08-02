"use client";

import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { Settings, ArrowLeft, Globe, Bell, Lock, Shield, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <main className="p-8 max-w-xl mx-auto">
      {/* Botón de regresar */}
      <button
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => router.push("/")}
        aria-label="Regresar"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Regresar</span>
      </button>
      <div className="mb-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <Settings className="w-12 h-12 text-blue-600 mb-2" />
          <h1 className="text-4xl font-bold tracking-tight">Configuración</h1>
          <p className="text-gray-500 text-lg">Personaliza tu experiencia de usuario.</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        {/* Tema */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">Tema</span>
          </div>
          <ThemeToggleButton />
        </div>
        {/* Idioma */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <span className="text-lg">Idioma</span>
          </div>
          <select className="border border-border rounded px-2 py-1 bg-background text-foreground">
            <option>Español</option>
            <option>English</option>
          </select>
        </div>
        {/* Notificaciones */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="text-lg">Notificaciones</span>
          </div>
          <input type="checkbox" className="w-5 h-5 accent-blue-600" disabled />
        </div>
        {/* Cambiar contraseña */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-gray-500" />
            <span className="text-lg">Cambiar contraseña</span>
          </div>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 cursor-not-allowed" disabled>
            Cambiar
          </button>
        </div>
        {/* Privacidad */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="text-lg">Privacidad</span>
          </div>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 cursor-not-allowed" disabled>
            Ver
          </button>
        </div>
        {/* Eliminar cuenta */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span className="text-lg text-red-500">Eliminar cuenta</span>
          </div>
          <button className="px-3 py-1 rounded bg-red-100 text-red-600 cursor-not-allowed" disabled>
            Eliminar
          </button>
        </div>
      </div>
    </main>
  );
}