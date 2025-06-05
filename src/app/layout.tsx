import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/contexts/CartContext";
import { SessionProvider } from "@/lib/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ormee Hair | Premium Hair Extensions & Wigs",
  description: "Discover premium quality hair extensions, wigs, and hair care products at Ormee Hair. Transform your look with our luxury hair solutions.",
  keywords: "hair extensions, wigs, premium hair, human hair, clip-in extensions, tape-in extensions, lace front wigs, hair care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-background text-text-primary font-body antialiased">
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
