import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nisha's Portfolio",
  description: "Jabatun Nessa Nisha - Portfolio Website",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-screen">
        <Navbar />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}

