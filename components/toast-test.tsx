"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ToastTest() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Prueba de Notificaciones</h2>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "success",
            title: "Éxito",
            description: "La operación se completó correctamente",
          })
        }}
      >
        Mostrar Notificación de Éxito (Verde)
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "warning",
            title: "Advertencia",
            description: "Por favor, revisa la información ingresada",
          })
        }}
      >
        Mostrar Advertencia (Amarillo)
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "error",
            title: "Error",
            description: "No se pudo completar la operación",
          })
        }}
      >
        Mostrar Error (Rojo)
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "info",
            title: "Información",
            description: "Hay una actualización disponible",
          })
        }}
      >
        Mostrar Información (Azul)
      </Button>
    </div>
  )
}