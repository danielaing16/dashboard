"use client";

import { NotificationTest } from "@/components/notifications/NotificationTest";
import { NotificationList } from "@/components/notifications/NotificationList";
import { NotificationsProvider } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestNotificationsPage() {
  const router = useRouter();

  return (
    <NotificationsProvider>
      <div className="p-8 max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" /> Regresar
        </Button>
        
        <main>
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Bell className="w-12 h-12 text-blue-600 mb-2" />
              <h1 className="text-4xl font-bold tracking-tight">Prueba de Notificaciones</h1>
              <p className="text-gray-500 text-lg">
                Prueba el sistema de notificaciones con diferentes tipos de mensajes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Panel de pruebas */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-2xl font-semibold mb-4">Panel de Pruebas</h2>
              <p className="text-gray-600 mb-4">
                Haz clic en los botones para generar diferentes tipos de notificaciones:
              </p>
              <NotificationTest />
            </div>

            {/* Lista de notificaciones */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-2xl font-semibold mb-4">Notificaciones Activas</h2>
              <p className="text-gray-600 mb-4">
                Aquí aparecerán las notificaciones que generes:
              </p>
              <NotificationList />
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Instrucciones de Prueba:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>Success:</strong> Notificación verde para operaciones exitosas</li>
              <li>• <strong>Warning:</strong> Notificación amarilla para advertencias</li>
              <li>• <strong>Error:</strong> Notificación roja para errores</li>
              <li>• <strong>Info:</strong> Notificación azul para información general</li>
            </ul>
          </div>
        </main>
      </div>
    </NotificationsProvider>
  );
}
