"use client"
import "./globals.css";
import { FanProvider } from "@/context/FanContext"
import { SessionProvider } from "next-auth/react";
 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <html lang="pt-br">
      <body>
        <FanProvider>
            <SessionProvider>{children}</SessionProvider>
        </FanProvider>
      </body>
    </html>
  )
}
