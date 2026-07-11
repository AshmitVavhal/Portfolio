"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, FileText, Terminal as TerminalIcon, Sparkles } from "lucide-react";

export default function Hero() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  // Typing simulation inside the mock terminal
  useEffect(() => {
    const lines = [
      "loading_neural_net... SUCCESS",
      "model.compile(optimizer='adam', loss='binary_crossentropy')",
      "analyzing_dataset... [####################] 100%",
      "System initialized. Web layers: ONLINE.",
      "Ashmit's Workspace is active.",
      "Awaiting secure API requests & socket triggers...",
      "Ready to build scalable web & AI applications."
    ];

    let timer: NodeJS.Timeout;
    const loadLines = (idx: number) => {
      if (idx < lines.length) {
        setTerminalOutput((prev) => [...prev, lines[idx]]);
        timer = setTimeout(() => loadLines(idx + 1), 700);
      }
    };

    loadLines(0);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-navy-dark bg-grid-pattern"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-primary/10 glow-orb animate-pulse-slow" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full glow-orb animate-float" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-fuchsia-500/5 rounded-full glow-orb animate-float-delayed" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glassmorphism text-purple-light text-xs font-mono font-semibold w-max mb-8 border border-purple-primary/20"
        >
          <span className="w-2 h-2 rounded-full bg-purple-light animate-ping" />
          AI & Software Engineer
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Hi, I&apos;m{" "}
          <span className="text-gradient-purple block mt-1.5 sm:inline">
            Ashmit Vavhal
          </span>
        </motion.h1>

        {/* Subtitle / Taglines */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg font-semibold text-purple-light mb-6 font-mono tracking-wide max-w-3xl leading-relaxed"
        >
          Computer Engineering Student &bull; AI/ML Engineer &bull; MERN Stack Developer &bull; Full Stack Developer
        </motion.h2>

        {/* Introduction sentence */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Passionate about building intelligent AI-powered solutions and scalable full-stack applications that solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16"
        >
          <button
            onClick={handleScrollToProjects}
            className="px-8 py-4 rounded-xl bg-purple-primary hover:bg-purple-primary/95 text-white font-medium flex items-center justify-center gap-2 group transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:shadow-[0_0_30px_rgba(124,58,237,0.45)] cursor-pointer"
          >
            View Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-primary/30 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </a>

          <a
            href="https://github.com/AshmitVavhal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-primary/30 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>

        {/* Mock Developer Terminal Console Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-2xl bg-[#070517]/95 border border-purple-primary/20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left flex flex-col font-mono text-xs text-gray-300 h-64 sm:h-52 relative group"
        >
          {/* Header */}
          <div className="bg-[#0f0c29]/90 px-4 py-3 border-b border-purple-primary/10 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-[10px] text-purple-light uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>console@ashmit.dev</span>
            </div>
            <div className="w-16" />
          </div>

          {/* Body content */}
          <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-2 bg-[#05030f]/60 backdrop-blur-md">
            {terminalOutput.map((line, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="text-purple-light flex-shrink-0 select-none">&gt;</span>
                <span className={idx === terminalOutput.length - 1 ? "text-white" : "text-gray-400"}>
                  {line}
                </span>
              </div>
            ))}
            {terminalOutput.length < 7 && (
              <span className="w-2 h-4 bg-purple-light animate-pulse ml-6" />
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
