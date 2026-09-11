"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

interface InternshipResponsibility {
  text: string;
}

export default function Experience() {
  const responsibilities: InternshipResponsibility[] = [
    { text: "Developed, refactored, and maintained responsive React-based client interfaces and RESTful Node.js/Express.js backend services." },
    { text: "Collaborated closely with cross-functional development teams on agile sprints, system designs, and code reviews." },
    { text: "Managed version control workflows using Git/GitHub, resolving branch conflicts, and automating Vercel/cloud deployments." },
    { text: "Built responsive user interfaces using Tailwind CSS and resolved mobile layout responsiveness issues." },
    { text: "Participated in full software development lifecycle (SDLC) activities including testing, bug fixing, and client feedback integration." }
  ];

  const technologies = ["React.js", "Node.js", "Express.js", "MongoDB", "Git", "Tailwind CSS", "Vercel"];

  return (
    <section id="experience" className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-[250px] h-[250px] bg-emerald-500/10 rounded-full glow-orb animate-pulse-slow" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16 items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            03. Career Path
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Work Experience
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        {/* Experience Timeline Grid */}
        <div className="relative">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-primary/40 via-purple-primary/20 to-transparent" />

          {/* Timeline Node */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
            
            {/* Timeline Circle Marker (Desktop-Centered, Mobile-Lefted) */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FAF9F5] border-4 border-purple-primary z-20 flex items-center justify-center shadow-[0_0_15px_rgba(0,178,137,0.4)]" />

            {/* Left Column: Company & Period */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pl-12 md:pl-0 md:text-right flex flex-col md:items-end justify-center pt-1"
            >
              <div className="flex items-center gap-2 md:flex-row-reverse mb-1">
                <Briefcase className="w-5 h-5 text-purple-light flex-shrink-0" />
                <h3 className="text-xl font-bold text-slate-900">Full Stack Developer Intern</h3>
              </div>
              <span className="text-purple-light font-bold text-base mb-2 block">Ateion</span>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-slate-600 text-xs font-mono md:flex-row-reverse w-max shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                Jan 2026 – March 2026
              </div>
            </motion.div>

            {/* Right Column: Work Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pl-12 md:pl-8 text-left"
            >
              <div className="glassmorphism-card p-6 md:p-8 rounded-2xl border border-purple-primary/15">
                <h4 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200/80 pb-2">
                  Key Responsibilities
                </h4>
                
                <ul className="space-y-3.5 text-sm text-slate-600 mb-6">
                  {responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-light flex-shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Utilized tech list */}
                <div>
                  <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2.5">
                    Technologies Utilized
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-purple-primary/10 border border-purple-primary/20 text-purple-light font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
