"use client"
import type { Metadata } from "next";
import "./globals.css";
import { FanProvider } from "@/context/FanContext"
 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <FanProvider>{children}</FanProvider>
      </body>
    </html>
  )
}
