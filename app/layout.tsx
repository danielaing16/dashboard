import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

// Importa el ThemeProvider si tienes uno
import { ThemeProvider } from '@/components/theme-provider'
// Importa el botón de configuración
import ThemeToggleButton from '@/components/ui/ThemeToggleButton'
// Importa NotificationsProvider para el contexto de notificaciones
import { NotificationsProvider } from '@/contexts/NotificationContext'
import { VerificationsProvider } from '@/contexts/VerificationsContext'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <NotificationsProvider>
          <VerificationsProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {/* Botón de configuración eliminado para moverlo a Settings */}
              {children}
            </ThemeProvider>
          </VerificationsProvider>
        </NotificationsProvider>
      </body>
    </html>
  )
}