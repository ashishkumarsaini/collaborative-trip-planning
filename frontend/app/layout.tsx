import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { RootProvider } from "@/lib/context";
import { AppDrawers } from "@/components/app-drawers";

export const metadata: Metadata = {
  title: "WanderScape",
  description: "Collaborative trip planning for effortless exploration.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className="antialiased">
        <RootProvider>
          <div className="min-h-screen flex-1 overflow-x-hidden">
            <Header />
            <main className="pt-mobile-header md:pt-desktop-header">
              {children}
            </main>
            <Footer />
          </div>
          <AppDrawers />
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
