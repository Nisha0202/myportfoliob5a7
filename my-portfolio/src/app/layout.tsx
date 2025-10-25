import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = {
  title: "Alex Chen | Frontend Developer Portfolio",
  description:
    "Explore Alex Chen's portfolio — showcasing modern web apps built with Next.js, React, and Tailwind CSS.",
  keywords: [
    "Alex Chen",
    "Frontend Developer",
    "Next.js Portfolio",
    "React Developer",
    "Web Developer",
  ],
  authors: [{ name: "Alex Chen", url: "https://alexchen.dev" }],
  creator: "Alex Chen",
  metadataBase: new URL("https://alexchen.dev"),

  openGraph: {
    title: "Alex Chen | Frontend Developer Portfolio",
    description:
      "Explore Alex Chen's portfolio showcasing modern web applications built with Next.js, React, and Tailwind CSS.",
    url: "https://alexchen.dev",
    siteName: "Alex Chen Portfolio",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Alex Chen Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Alex Chen | Frontend Developer Portfolio",
    description:
      "Explore Alex Chen's modern web projects built with Next.js, React, and Tailwind CSS.",
    images: ["/vercel.svg"],
    creator: "@alexchen",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden">
     <Navbar/>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}

