import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardContent } from "@/components/dashboard-content"
import { NotificationTest } from "@/components/notifications/NotificationTest"
import { Toaster } from "@/components/ui/toaster"
import { NotificationsProvider } from "@/contexts/NotificationContext"
import { NotesProvider } from "@/contexts/NotesContext"

export default function Page() {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SidebarProvider defaultOpen={true}>
          <div className="flex">
            <AppSidebar />
            <main className="flex-1">
              <SidebarInset>
                <DashboardHeader />
                <div className="p-6">
                  <DashboardContent />
                  <NotificationTest />
                </div>
              </SidebarInset>
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </div>
    </NotesProvider>
  )
}