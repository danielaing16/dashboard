"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SidebarContextProps = {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextProps>({})

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = React.useState(defaultOpen)

  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      setOpen(value)
      setOpenProp?.(value)
    },
    [setOpenProp]
  )

  return (
    <SidebarContext.Provider
      value={{
        defaultOpen,
        open: openProp ?? open,
        onOpenChange: setOpenProp ?? handleOpenChange,
      }}
    >
      <div className={cn("grid grid-cols-[auto,1fr]", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva("relative flex flex-col gap-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      floating: "rounded-lg border shadow-lg",
      inset: "",
    },
    side: {
      left: "",
      right: "",
    },
    collapsible: {
      default: "",
      offcanvas: "lg:relative absolute inset-y-0 z-50",
    },
  },
  defaultVariants: {
    variant: "default",
    side: "left",
    collapsible: "default",
  },
})

interface SidebarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof sidebarVariants> {}

function Sidebar({
  className,
  variant,
  side = "left",
  collapsible,
  ...props
}: SidebarProps) {
  const { open } = useSidebar()

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={cn(
        sidebarVariants({ variant, side, collapsible }),
        side === "left" && collapsible === "offcanvas" && "left-0",
        side === "right" && collapsible === "offcanvas" && "right-0",
        !open && "hidden lg:flex",
        className
      )}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex-1", className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props} />
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1 px-2", className)}
      role="menu"
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("", className)} role="menuitem" {...props} />
}

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "transparent",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
)

interface SidebarMenuButtonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

function SidebarMenuButton({
  className,
  isActive,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "div"
  return (
    <Comp
      className={cn(sidebarMenuButtonVariants({ isActive, className }))}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  const { open } = useSidebar()
  return (
    <div
      data-state={open ? "open" : "closed"}
      className={cn("flex-1 overflow-auto", className)}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
}