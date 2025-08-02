"use client"

import { useNotifications } from "@/contexts/NotificationContext"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function NotificationList() {
  const {
    notifications,
    markAsRead,
    removeNotification,
    clearAll,
    markAllAsRead
  } = useNotifications()

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-100 hover:bg-green-100"
      case "warning":
        return "bg-yellow-50 border-yellow-100 hover:bg-yellow-100"
      case "error":
        return "bg-red-50 border-red-100 hover:bg-red-100"
      case "info":
        return "bg-blue-50 border-blue-100 hover:bg-blue-100"
      default:
        return "bg-gray-50 border-gray-100 hover:bg-gray-100"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        No hay notificaciones
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b p-3">
        <h4 className="font-semibold">Notificaciones</h4>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            <Check className="h-4 w-4 mr-1" />
            Marcar todo como leído
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Limpiar todo
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={cn(
              "p-4 border-b transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-md animate-in slide-in-from-top",
              getNotificationColor(notification.type),
              !notification.read && "font-medium animate-pulse-gentle"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-sm", getIconColor(notification.type))}>
                    {notification.title}
                  </span>
                  {!notification.read && (
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs animate-in fade-in duration-500 animate-pulse">
                      Nuevo
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {notification.timestamp.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-1">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-white/50 transition-all duration-200 hover:scale-110 hover:rotate-12"
                    onClick={(e) => {
                      e.stopPropagation()
                      markAsRead(notification.id)
                    }}
                  >
                    <Check className="h-4 w-4 transition-transform duration-200" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-white/50"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeNotification(notification.id)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}