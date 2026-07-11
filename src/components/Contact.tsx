"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, AlertCircle } from "lucide-react";

const fm = motion;

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/ashmitvavhal86@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "New Portfolio Contact Message",
          message: formState.message
        })
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-purple-light" />,
      label: "Email",
      value: "ashmitvavhal86@gmail.com",
      href: "mailto:ashmitvavhal86@gmail.com",
    },
    {
      icon: <Linkedin className="w-5 h-5 text-purple-light" />,
      label: "LinkedIn",
      value: "Ashmit Vavhal",
      href: "https://www.linkedin.com/in/ashmit-vavhal-831105287/",
    },
    {
      icon: <Github className="w-5 h-5 text-purple-light" />,
      label: "GitHub",
      value: "AshmitVavhal",
      href: "https://github.com/AshmitVavhal",
    },
    {
      icon: <FileText className="w-5 h-5 text-purple-light" />,
      label: "Resume",
      value: "Download PDF Profile",
      href: "/resume.pdf",
      download: true,
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-navy-dark overflow-hidden bg-grid-pattern">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-primary/10 rounded-full glow-orb animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-fuchsia-500/15 rounded-full glow-orb animate-float" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <motion.span // wait, we can just use fm.span from framer-motion to be consistent
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-purple-light uppercase mb-2"
          >
            07. Get In Touch
          </motion.span>
          <fm.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Contact
          </fm.h2>
          <div className="w-20 h-1 bg-purple-primary rounded-full mt-3" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Details column (Left) */}
          <fm.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="text-left space-y-6">
              <h3 className="text-2xl font-extrabold text-white">Let&apos;s build something great.</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">
                I am actively looking for software development internships and project collaborations. If you have an opportunity or just want to ask about my AI tools, drop me a message.
              </p>
            </div>

            {/* List details */}
            <div className="space-y-4 mt-8 lg:mt-0">
              {contactDetails.map((detail, idx) => (
                <a
                  key={idx}
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  download={detail.download}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-purple-primary/30 hover:bg-purple-primary/5 transition-all duration-300 group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-primary/10 flex items-center justify-center border border-purple-primary/20 group-hover:scale-105 transition-transform duration-300">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">{detail.label}</div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-light transition-colors">{detail.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </fm.div>

          {/* Form column (Right) */}
          <fm.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glassmorphism-card p-6 sm:p-10 rounded-3xl border border-purple-primary/10 h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <fm.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-primary/15 border border-purple-primary/35 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                      <CheckCircle2 className="w-8 h-8 text-purple-light" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                      Thank you for reaching out. I have received your message and will respond as soon as possible.
                    </p>
                  </fm.div>
                ) : (
                  <fm.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-mono text-gray-400">Your Name *</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] focus:border-purple-primary focus:bg-purple-primary/5 focus:ring-1 focus:ring-purple-primary text-sm text-white placeholder-gray-600 outline-none transition-all"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-mono text-gray-400">Email Address *</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] focus:border-purple-primary focus:bg-purple-primary/5 focus:ring-1 focus:ring-purple-primary text-sm text-white placeholder-gray-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-mono text-gray-400">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="Collaboration Interest / Opportunity"
                        className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] focus:border-purple-primary focus:bg-purple-primary/5 focus:ring-1 focus:ring-purple-primary text-sm text-white placeholder-gray-600 outline-none transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-gray-400">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Hi Ashmit, let's connect for an internship opportunity..."
                        className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] focus:border-purple-primary focus:bg-purple-primary/5 focus:ring-1 focus:ring-purple-primary text-sm text-white placeholder-gray-600 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Error Banner */}
                    {status === "error" && (
                      <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 flex items-center gap-2 text-xs text-red-400 font-mono">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        Please fill in all required fields.
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-4 rounded-xl bg-purple-primary hover:bg-purple-primary/95 text-white font-semibold flex items-center justify-center gap-2 group transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </fm.form>
                )}
              </AnimatePresence>

            </div>
          </fm.div>

        </div>

      </div>
    </section>
  );
}
