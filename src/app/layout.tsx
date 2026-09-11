import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans-bonsai",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-bonsai",
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
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-navy-dark text-slate-800 antialiased selection:bg-purple-primary/20 selection:text-purple-light min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

