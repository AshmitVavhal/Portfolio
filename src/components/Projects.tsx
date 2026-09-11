"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Sparkles, Cpu, Eye, CheckCircle2, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  tech: string[];
  github: string;
  live: string;
  mockup: React.ReactNode;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "focusflow",
      title: "FocusFlow",
      subtitle: "AI-Powered Meeting Attention Tracker",
      desc: "A desktop application that monitors user attention during virtual meetings using computer vision and AI techniques.",
      features: [
        "Real-time face detection",
        "Eye state & tracking",
        "Attention monitoring index",
        "Meeting engagement analytics",
        "Telegram notifications integration"
      ],
      tech: ["Python", "OpenCV", "MediaPipe", "CustomTkinter"],
      github: "https://github.com/AshmitVavhal/FocusFlow",
      live: "#",
      mockup: (
        <div className="w-full h-full bg-[#0a071a] rounded-xl overflow-hidden border border-purple-primary/20 flex flex-col font-mono text-xs shadow-inner">
          {/* Header */}
          <div className="bg-[#120e2e] px-4 py-2 border-b border-purple-primary/15 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="text-[10px] text-purple-light font-bold">FocusFlow v1.0.0</div>
            <div className="w-12" />
          </div>
          {/* Content */}
          <div className="p-4 grid grid-cols-12 gap-3 flex-1">
            {/* Camera View */}
            <div className="col-span-7 bg-[#05030f] rounded-lg border border-purple-primary/10 relative overflow-hidden flex items-center justify-center min-h-[140px]">
              {/* Face wireframe overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-60 text-purple-light" viewBox="0 0 100 100">
                <circle cx="50" cy="45" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <ellipse cx="50" cy="45" rx="14" ry="18" fill="none" stroke="currentColor" strokeWidth="0.5" />
                {/* Landmarks */}
                <circle cx="50" cy="35" r="1" fill="#c084fc" />
                <circle cx="50" cy="58" r="1" fill="#c084fc" />
                <circle cx="42" cy="42" r="1.5" fill="#22c55e" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="58" cy="42" r="1.5" fill="#22c55e" stroke="currentColor" strokeWidth="0.5" />
                <path d="M42 50 Q50 54 58 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="35" x2="50" y2="58" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,1" />
                <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,1" />
              </svg>
              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/75 border border-green-500/30 text-green-400 text-[8px] flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
                CAM_ACTIVE
              </div>
              <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/75 text-white text-[8px]">
                FPS: 30.2
              </div>
            </div>
            {/* Stats View */}
            <div className="col-span-5 flex flex-col gap-2 justify-between">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05] flex flex-col gap-1.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Attention Index</div>
                <div className="text-xl font-bold text-white flex items-baseline gap-1">
                  92.4% <span className="text-[9px] text-green-400">Stable</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-primary to-purple-light w-[92%]" />
                </div>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05] text-[9px] text-gray-400 flex flex-col gap-1">
                <div className="text-white font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-light" />
                  Status Logs
                </div>
                <div>Face tracking: OK</div>
                <div>Eyes detected: OPEN</div>
                <div className="text-green-400">Telegram connection: OK</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "taskflow",
      title: "TaskFlow",
      subtitle: "AI-Powered Project Management Platform",
      desc: "An intelligent project management system designed to improve productivity, collaboration, and workflow automation.",
      features: [
        "Smart task organization",
        "Contextual AI task assistance",
        "Team real-time collaboration",
        "Interactive workflow automation",
        "Productivity dashboard & analytics"
      ],
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Redux Toolkit", "TanStack Query", "Node.js", "Express.js", "MongoDB", "Socket.io", "Google Generative AI"],
      github: "https://github.com/AshmitVavhal/TaskFlow",
      live: "https://taskflow-frontend-wpby.onrender.com",
      mockup: (
        <div className="w-full h-full bg-[#030014] rounded-xl overflow-hidden border border-purple-primary/20 flex flex-col font-sans text-xs">
          {/* Top Bar */}
          <div className="bg-[#09071f] px-3.5 py-2.5 border-b border-purple-primary/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-primary" />
              <span className="font-bold text-white tracking-wide text-[10px]">TaskFlow Workspace</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded-md text-[9px] text-purple-light">
              <Sparkles className="w-2.5 h-2.5" />
              AI Assistant
            </div>
          </div>
          {/* Content */}
          <div className="p-3 grid grid-cols-12 gap-3 flex-1 h-[calc(100%-37px)]">
            {/* Task Board columns */}
            <div className="col-span-8 grid grid-cols-2 gap-2 h-full">
              <div className="bg-[#09071f] p-2 rounded-lg border border-white/[0.03] flex flex-col gap-1.5 overflow-hidden">
                <div className="text-[9px] font-bold text-gray-400 uppercase border-b border-white/[0.04] pb-1 flex justify-between">
                  <span>Todo</span>
                  <span className="bg-white/5 px-1 rounded text-white">2</span>
                </div>
                <div className="bg-[#0c0b24] p-2 rounded border border-purple-primary/10 text-[9px] text-gray-300">
                  Refactor OAuth hook
                  <div className="mt-1 flex justify-between items-center text-[7px] text-purple-light">
                    <span>High</span>
                    <span className="font-mono">July 12</span>
                  </div>
                </div>
                <div className="bg-[#0c0b24] p-2 rounded border border-white/[0.03] text-[9px] text-gray-400">
                  Draft API specs
                </div>
              </div>
              <div className="bg-[#09071f] p-2 rounded-lg border border-white/[0.03] flex flex-col gap-1.5 overflow-hidden">
                <div className="text-[9px] font-bold text-purple-light uppercase border-b border-white/[0.04] pb-1 flex justify-between">
                  <span>Progress</span>
                  <span className="bg-purple-primary/20 px-1 rounded text-purple-light">1</span>
                </div>
                <div className="bg-[#0c0b24] p-2 rounded border border-purple-primary/20 text-[9px] text-white">
                  Hook up socket server
                  <div className="mt-1 flex justify-between items-center text-[7px]">
                    <span className="text-green-400">In Progress</span>
                    <span className="font-mono text-purple-light">Today</span>
                  </div>
                </div>
              </div>
            </div>
            {/* AI Assistant Chat view */}
            <div className="col-span-4 bg-[#0a071a] p-2 rounded-lg border border-purple-primary/15 flex flex-col justify-between h-full font-mono text-[8px]">
              <div className="text-[9px] font-bold text-purple-light border-b border-white/[0.05] pb-1 mb-1.5 flex items-center gap-1">
                💡 AI Suggestion
              </div>
              <div className="text-gray-400 flex-1 overflow-hidden leading-relaxed">
                Suggested task order: &quot;Hook up socket server&quot; depends on &quot;Refactor OAuth hook&quot;. Adjusting timeline.
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] p-1 rounded text-white flex justify-between items-center mt-1">
                <span>Accept adjustment</span>
                <span className="text-green-400">✔</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "easycode",
      title: "EasyCode",
      subtitle: "DSA Learning and Coding Platform",
      desc: "A coding practice platform that helps users improve problem-solving skills through structured challenges and interview preparation.",
      features: [
        "Coding challenges repository",
        "User progress dashboard",
        "Leaderboards & ranking",
        "Online code execution engine",
        "Interview prep roadmap modules"
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      github: "https://github.com/AshmitVavhal/EasyCode",
      live: "https://easycode-frontend.onrender.com/",
      mockup: (
        <div className="w-full h-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/[0.08] flex flex-col font-mono text-[10px] shadow-2xl">
          {/* Tab Header */}
          <div className="bg-[#2d2d2d] px-3.5 py-2.5 flex items-center justify-between border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-purple-light" />
              <span className="text-gray-300 font-sans text-xs">Solution.js</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/25 border border-green-500" />
              <span className="text-green-400 text-[8px] font-sans">Compiled</span>
            </div>
          </div>
          {/* Content code view */}
          <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#1e1e1e] leading-normal text-left">
            <div className="text-gray-400 space-y-1">
              <div><span className="text-purple-light">function</span> <span className="text-indigo-400">twoSum</span>(nums, target) &#123;</div>
              <div className="pl-4"><span className="text-purple-light">const</span> map = <span className="text-purple-light">new</span> <span className="text-yellow-400">Map</span>();</div>
              <div className="pl-4"><span className="text-purple-light">for</span> (<span className="text-purple-light">let</span> i = <span className="text-cyan-400">0</span>; i &lt; nums.length; i++) &#123;</div>
              <div className="pl-8"><span className="text-purple-light">const</span> diff = target - nums[i];</div>
              <div className="pl-8"><span className="text-purple-light">if</span> (map.<span className="text-yellow-400">has</span>(diff)) <span className="text-purple-light">return</span> [map.<span className="text-yellow-400">get</span>(diff), i];</div>
              <div className="pl-8">map.<span className="text-yellow-400">set</span>(nums[i], i);</div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </div>
            {/* Output console */}
            <div className="mt-4 p-2 bg-[#121212] border border-white/[0.04] rounded flex items-center justify-between text-[9px]">
              <span className="text-gray-400">Console: <span className="text-green-400">✔ All 3 Test Cases Passed</span></span>
              <span className="text-gray-500 font-sans">Time: 12ms</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "legalanalyzer",
      title: "LegalAI",
      subtitle: "AI-Powered Contract Intelligence System",
      desc: "A legal-tech platform that simplifies document analysis using artificial intelligence.",
      features: [
        "Automated contract summarization",
        "Risk clause identification & alerts",
        "Obligation extraction & deadlines",
        "Metadata extraction filters",
        "OCR-based document scanning"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Docker", "Gemini API", "LangChain", "Tesseract OCR"],
      github: "https://github.com/AshmitVavhal/LegalAI",
      live: "https://legalai-1-fzd3.onrender.com/",
      mockup: (
        <div className="w-full h-full bg-[#04020d] rounded-xl overflow-hidden border border-purple-primary/25 flex flex-col font-sans text-xs">
          {/* Header */}
          <div className="bg-[#0c0a22] px-3.5 py-2.5 border-b border-purple-primary/15 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-purple-light" />
              <span>Contract-Intel-AI</span>
            </div>
            <div className="text-[8px] bg-red-950/40 border border-red-500/30 px-2 py-0.5 rounded text-red-400 font-mono">
              Risk: High Alert
            </div>
          </div>
          {/* Body */}
          <div className="p-3 grid grid-cols-12 gap-3 flex-1">
            {/* Document preview */}
            <div className="col-span-6 bg-[#0a081e] p-2 rounded border border-white/[0.03] flex flex-col gap-1.5 text-[8px] justify-between h-full">
              <div className="text-[9px] font-bold text-gray-400 border-b border-white/[0.05] pb-1">ND_Agreement.pdf</div>
              <div className="text-gray-500 line-through leading-relaxed">
                4. Confidentiality Term: Recipient agrees to hold proprietary info for a period of ten (10) years from the effective date.
              </div>
              <div className="bg-[#1c0828] border border-red-500/20 p-1.5 rounded text-red-200 leading-normal">
                ❗ Under Section 4, a 10-year term exceeds typical standard nda guidelines (3-5 years).
              </div>
            </div>
            {/* AI Insights summary */}
            <div className="col-span-6 flex flex-col justify-between h-full gap-2 font-mono text-[8px]">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05] flex flex-col gap-1">
                <div className="text-[9px] text-purple-light font-bold">Obligation Detected</div>
                <div className="text-white">Return materials: 30 days</div>
                <div className="text-gray-400">Deadline: Aug 21, 2026</div>
              </div>
              <div className="p-2 rounded bg-[#0c0a22] border border-purple-primary/20 flex flex-col gap-1 text-[8px] text-purple-light">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini API Summary
                </div>
                <div className="text-gray-400 leading-relaxed font-sans">
                  The agreement restricts reciprocal sharing of intellectual properties with high liabilities on disputes.
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full glow-orb animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full glow-orb animate-float" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-20 items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            04. Technical Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Featured Projects
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        {/* Projects Alternating Layout */}
        <div className="space-y-24">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                
                {/* Project Visual Mockup Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative group p-2 rounded-2xl glassmorphism-card border border-purple-primary/15 overflow-hidden shadow-xl hover:border-purple-primary/40 transition-all duration-300">
                    {/* Shadow under mockup */}
                    <div className="absolute inset-0 bg-purple-primary/5 opacity-50 blur-lg pointer-events-none" />
                    {/* Mockup wrapper */}
                    <div className="relative z-10 w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                      {project.mockup}
                    </div>
                  </div>
                </motion.div>

                {/* Project Info Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 flex flex-col justify-center text-left ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <span className="text-xs font-mono font-bold text-purple-light tracking-wide mb-1.5 block">
                    {project.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 hover:text-purple-light transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed bg-white/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 backdrop-blur-md shadow-sm">
                    {project.desc}
                  </p>

                  {/* Bullet features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {project.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex gap-2 items-center text-xs text-slate-700 text-left">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-light flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-purple-primary/40 hover:text-purple-light text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-all duration-300 shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-lg bg-purple-primary/10 border border-purple-primary/20 hover:bg-purple-primary hover:text-white text-purple-light font-semibold text-xs flex items-center gap-1.5 transition-all duration-300 shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>

                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
