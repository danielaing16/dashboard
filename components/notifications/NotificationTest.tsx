"use client"

import { Button } from "@/components/ui/button"
import { useNotifications } from "@/contexts/NotificationContext"

export function NotificationTest() {
  const { addNotification } = useNotifications()

  const testNotifications = [
    {
      title: "Éxito",
      message: "La operación se completó correctamente",
      type: "success" as const
    },
    {
      title: "Advertencia",
      message: "Hay algunos campos pendientes",
      type: "warning" as const
    },
    {
      title: "Error",
      message: "No se pudo completar la operación",
      type: "error" as const
    },
    {
      title: "Información",
      message: "Nueva actualización disponible",
      type: "info" as const
    }
  ]

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Prueba de Notificaciones</h2>
      <div className="flex flex-col gap-2">
        {testNotifications.map((notification, index) => (
          <Button
            key={index}
            onClick={() => addNotification(notification)}
            variant="outline"
          >
            Crear notificación: {notification.type}
          </Button>
        ))}
      </div>
    </div>
  )
}