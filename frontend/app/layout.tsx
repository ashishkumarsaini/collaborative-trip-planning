import type { Metadata } from "next";
import { Noto_Sans } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { RootProvider } from "@/lib/context";


// Configure the font
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: "Wanderscape",
  description: "Book your trip today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body
        className={`${notoSans.variable} antialiased dark`}
      >
        <RootProvider>
          <Header />
          <main className="max-w-[1250px] m-auto">
            <div className="border-l border-r border-dashed mt-mobile-header md:mt-desktop-header px-5">
              {children}
            </div>
          </main>
          <Footer />
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
