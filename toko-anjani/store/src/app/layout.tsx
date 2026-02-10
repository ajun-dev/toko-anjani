import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toko Anjani - Belanja Online Terpercaya",
  description: "Toko Anjani adalah platform belanja online terpercaya dengan produk berkualitas dan harga terbaik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
