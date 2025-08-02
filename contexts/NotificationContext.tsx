"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "warning" | "error" | "info"
  read: boolean
  timestamp: Date
  relatedTo?: string // ID de la verificación relacionada
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  getNotificationsByVerification: (verificationId: string) => Notification[]
}

const NotificationsContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Contador de notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length

  // Agregar nueva notificación
  const addNotification = useCallback((notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).slice(2),
      read: false,
      timestamp: new Date(),
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  // Marcar notificación como leída
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }, [])

  // Marcar todas como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }, [])

  // Eliminar una notificación
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    )
  }, [])

  // Limpiar todas las notificaciones
  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Obtener notificaciones por ID de verificación
  const getNotificationsByVerification = useCallback((verificationId: string) => {
    return notifications.filter(n => n.relatedTo === verificationId)
  }, [notifications])

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        getNotificationsByVerification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}