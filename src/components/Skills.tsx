"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Layout, Server, Database, BrainCircuit, Wrench } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 text-purple-light" />,
      skills: ["JavaScript", "Python", "Java", "SQL"],
    },
    {
      title: "Frontend Development",
      icon: <Layout className="w-5 h-5 text-purple-light" />,
      skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      title: "Backend Development",
      icon: <Server className="w-5 h-5 text-purple-light" />,
      skills: ["Node.js", "Express"],
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5 text-purple-light" />,
      skills: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      title: "AI & Machine Learning",
      icon: <BrainCircuit className="w-5 h-5 text-purple-light" />,
      skills: ["Gemini API", "OpenCV", "MediaPipe", "OCR", "NLP"],
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench className="w-5 h-5 text-purple-light" />,
      skills: ["Git", "GitHub", "Docker", "Postman", "Vercel", "VS Code"],
    },
  ];

  return (
    <section id="skills" className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-10 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full glow-orb" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            02. Core Competencies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Skills & Technologies
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const isHovered = activeCategory === category.title;
            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setActiveCategory(category.title)}
                onMouseLeave={() => setActiveCategory(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`glassmorphism-card p-6 rounded-2xl border text-left flex flex-col h-full cursor-default ${
                  isHovered ? "border-purple-primary/40 shadow-[0_10px_30px_rgba(0,178,137,0.12)]" : "border-slate-200/80"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-primary/10 flex items-center justify-center border border-purple-primary/20">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-wide">{category.title}</h3>
                </div>

                {/* Badges Container */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 hover:border-purple-primary/40 hover:bg-purple-primary/10 text-slate-700 hover:text-purple-light text-xs font-mono transition-all duration-300 shadow-sm cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Skill Slogan */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-mono text-slate-500">
            * Actively building applications using the MERN Stack, Next.js, and Gemini API.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
