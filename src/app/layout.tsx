import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashmit Vavhal | AI/ML Engineer & MERN Stack Developer",
  description: "Professional portfolio of Ashmit Vavhal, a Computer Engineering student, AI/ML Engineer, and MERN Stack Developer. Building intelligent AI-powered solutions and scalable full-stack applications.",
  keywords: ["Ashmit Vavhal", "AI/ML Engineer", "MERN Stack Developer", "Full Stack Developer", "Computer Engineering Student", "Software Engineer Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-navy-dark text-gray-100 antialiased selection:bg-purple-primary/30 selection:text-purple-light min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
