"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldAlert, Cpu, CalendarDays, Sparkles } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export default function Achievements() {
  const achievements: Achievement[] = [
    {
      icon: <Award className="w-5 h-5 text-purple-light" />,
      title: "Sports Head",
      subtitle: "Computer Engineering Department",
      description: "Appointed to lead sports initiatives, manage team selections, and represent department student activities.",
      tag: "Leadership"
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-purple-light" />,
      title: "Event Organizer",
      subtitle: "Technical & Sports Events",
      description: "Coordinated and executed multiple intra-college sports tournaments and tech symposium coding tracks.",
      tag: "Management"
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-light" />,
      title: "AI Project Architect",
      subtitle: "Multiple Deployed Solutions",
      description: "Designed, trained, and deployed multiple functional AI utilities solving computer vision and legal parsing needs.",
      tag: "Development"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-light" />,
      title: "Full Stack Specialization",
      subtitle: "MERN & Next.js Ecosystem",
      description: "Built scalable web architectures combining real-time sockets, client state caching, and cloud deployments.",
      tag: "Expertise"
    }
  ];

  return (
    <section className="relative py-24 bg-navy-dark overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-purple-primary/5 rounded-full glow-orb" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col mb-16 items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            05. Honors & Highlights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Achievements
          </motion.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glassmorphism-card p-6 rounded-2xl border border-purple-primary/10 flex flex-col justify-between h-full text-left transition-all duration-300"
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-primary/10 flex items-center justify-center border border-purple-primary/20">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-purple-light uppercase bg-purple-primary/15 border border-purple-primary/25 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-base font-extrabold text-white mb-1.5">{item.title}</h3>
                <h4 className="text-xs font-mono text-purple-light/95 mb-4">{item.subtitle}</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">{item.description}</p>
              </div>

              {/* Card Footer Indicator */}
              <div className="border-t border-white/[0.04] pt-3 flex items-center justify-between text-[9px] font-mono text-gray-500">
                <span>Verified Activity</span>
                <span>•</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
