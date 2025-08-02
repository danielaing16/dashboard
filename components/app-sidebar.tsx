"use client"

import { Home, Plus, FileText, Settings, StickyNote } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "New Verification",
    url: "/new-verification",
    icon: Plus,
  },
  {
    title: "Verifications",
    url: "/verifications",
    icon: FileText,
  },
  {
    title: "Notas",
    url: "/notas",
    icon: StickyNote,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r bg-background text-foreground min-h-screen">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 animate-in fade-in duration-500">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-foreground">VerifyID</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem 
                    key={item.title}
                    className="animate-in slide-in-from-left duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url} 
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-all duration-300 ease-in-out group relative overflow-hidden",
                          "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-sm",
                          "active:scale-[0.98] active:transition-transform active:duration-75",
                          isActive && "bg-primary text-primary-foreground shadow-md"
                        )}
                      >
                        {/* Animated background for active state */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary animate-in fade-in duration-300" />
                        )}
                        
                        {/* Hover effect background */}
                        <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-3 w-full">
                          <item.icon className={cn(
                            "w-5 h-5 transition-all duration-300 ease-in-out",
                            "group-hover:scale-110 group-hover:rotate-3",
                            isActive && "text-primary-foreground"
                          )} />
                          <span className={cn(
                            "text-sm font-medium transition-all duration-300 ease-in-out",
                            "group-hover:translate-x-1",
                            isActive && "text-primary-foreground font-semibold"
                          )}>
                            {item.title}
                          </span>
                        </div>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-l-full animate-in slide-in-from-right duration-300" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
