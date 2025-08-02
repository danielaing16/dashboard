import { Search, User } from "lucide-react"
import { NotificationBell } from "@/components/notifications/NotificationBell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background text-foreground">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search..." className="pl-10 bg-muted text-foreground border-0" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
