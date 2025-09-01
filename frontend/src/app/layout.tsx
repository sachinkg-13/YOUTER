import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "../components/ui/toaster"
import { ThemeProvider } from "../components/theme-provider"
import Providers from "../components/providers/Providers"
import ToastProvider from "../components/ui/ToastProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YOUTER - Share Your World",
  description: "The perfect blend of video sharing and social interaction",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            <ToastProvider />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
