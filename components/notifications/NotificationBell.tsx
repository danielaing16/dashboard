"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/contexts/NotificationContext"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { NotificationList } from "./NotificationList"

export function NotificationBell() {
  const { unreadCount } = useNotifications()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center animate-in fade-in duration-300">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <NotificationList />
      </PopoverContent>
    </Popover>
  )
}