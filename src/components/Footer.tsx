"use client";

import React from "react";
import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-navy-dark border-t border-slate-200/80 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Logo/Name */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-mono text-sm font-bold tracking-tight text-slate-900">
            ashmit<span className="text-purple-light">.dev</span>
          </span>
          <p className="text-[10px] text-slate-500 font-mono mt-1">
            © {new Date().getFullYear()} Ashmit Vavhal. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AshmitVavhal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-purple-primary/40 hover:bg-purple-primary/10 flex items-center justify-center text-slate-600 hover:text-purple-light transition-all duration-300 shadow-sm"
            aria-label="GitHub"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ashmit-vavhal-831105287/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-purple-primary/40 hover:bg-purple-primary/10 flex items-center justify-center text-slate-600 hover:text-purple-light transition-all duration-300 shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>

          {/* Scroll back to top */}
          <button
            onClick={handleScrollToTop}
            className="w-9 h-9 rounded-xl bg-purple-primary/10 border border-purple-primary/20 hover:bg-purple-primary hover:text-white flex items-center justify-center text-purple-light transition-all duration-300 cursor-pointer shadow-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5 animate-pulse" />
          </button>
        </div>

      </div>
    </footer>
  );
}
