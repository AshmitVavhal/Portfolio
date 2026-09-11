"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Database, ShieldCheck, Code } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: <Brain className="w-5 h-5 text-purple-light" />,
      title: "AI/ML Engineering",
      subtitle: "Primary Domain",
      desc: "Developing intelligent models utilizing Machine Learning, Computer Vision (OpenCV, MediaPipe), NLP, and Generative AI (Gemini API).",
    },
    {
      icon: <Database className="w-5 h-5 text-purple-light" />,
      title: "MERN Stack Development",
      subtitle: "Primary Domain",
      desc: "Architecting high-performance, robust, and scalable client-server applications with MongoDB, Express, React, and Node.js.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-light" />,
      title: "Software Engineering",
      subtitle: "Core Foundation",
      desc: "Solid grasp of Computer Engineering principles, data structures, algorithms, object-oriented design, and database normalization.",
    },
    {
      icon: <Code className="w-5 h-5 text-purple-light" />,
      title: "Full Stack Development",
      subtitle: "Supporting Skill",
      desc: "Additional capability to connect external services, build responsive frontends, and implement CI/CD cloud deployment strategies.",
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-primary/10 rounded-full glow-orb" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            01. Introduction
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            About Me
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-slate-600 space-y-6 text-base sm:text-lg leading-relaxed text-left"
          >
            <p>
              I am a <strong className="text-slate-900">Computer Engineering student</strong> with a strong focus on <strong className="text-purple-light font-semibold">Artificial Intelligence</strong>, <strong className="text-purple-light font-semibold">Machine Learning</strong>, and <strong className="text-purple-light font-semibold">MERN Stack Development</strong>. I enjoy building intelligent systems that combine AI capabilities with scalable web technologies to solve practical real-world challenges.
            </p>
            <p>
              My interests span machine learning, computer vision, generative AI, full-stack development, and software engineering. I am passionate about transforming innovative ideas into impactful products through modern technologies and continuous learning.
            </p>
            <p>
              Positioning myself as an <strong className="text-slate-900">AI + Software Engineer</strong>, I leverage my engineering background to design complete workflows: from setting up training pipelines and model endpoints to wrapping them in clean, responsive web application interfaces.
            </p>

            {/* Core Domains Highlights */}
            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="p-4.5 rounded-xl bg-purple-primary/5 border border-purple-primary/20 text-left">
                <div className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider">AI/ML</div>
                <div className="text-[10px] text-purple-light font-mono mt-1">Computer Vision & LLMs</div>
              </div>
              <div className="p-4.5 rounded-xl bg-purple-primary/5 border border-purple-primary/20 text-left">
                <div className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider">MERN Stack</div>
                <div className="text-[10px] text-purple-light font-mono mt-1">Scalable Web Apps</div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glassmorphism-card p-6 rounded-2xl flex flex-col text-left h-full border border-purple-primary/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-primary/10 flex items-center justify-center border border-purple-primary/20">
                    {card.icon}
                  </div>
                  <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    card.subtitle.includes("Primary") 
                      ? "bg-purple-primary/15 text-purple-light border border-purple-primary/25" 
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {card.subtitle}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
