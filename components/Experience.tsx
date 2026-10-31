"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Code2, Building2 } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

interface ExperienceProps {
  dict: {
    title: string;
    accent: string;
    technologiesLabel: string; // <-- Tambahkan ini di interface
    list: ExperienceItem[];
  };
}

export default function Experience({ dict }: ExperienceProps) {
  return (
    <section id="experience" className="scroll-mt-14 py-8 md:py-12 relative">
      <div className="max-w-5xl mx-auto md:px-6 relative z-10">
        {/* Badge Judul */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
            {dict.title}{" "}
            <span className="text-brand-purple">{dict.accent}</span>.
          </h2>
        </div>

        {/* List Experience Cards */}
        <div className="flex flex-col gap-10">
          {dict.list.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-white border border-brand-text/10 rounded-[32px] p-6 md:p-10 shadow-sm hover:shadow-xl hover:border-brand-purple/20 transition-all duration-300 group overflow-hidden relative transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* --- HEADER KARTU --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-text/5 flex items-center justify-center shrink-0 border border-brand-text/10 group-hover:scale-105 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/20 transition-all duration-300 transform-gpu">
                      <Building2 className="w-7 h-7 text-brand-text/50 group-hover:text-brand-purple transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-brand-text leading-tight mb-1">
                        {item.role}
                      </h4>
                      <p className="text-base md:text-lg font-bold text-brand-purple">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm md:text-base font-bold text-brand-text/60 md:text-right bg-brand-text/[0.02] md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border md:border-none border-brand-text/5">
                    <div className="flex items-center md:justify-end gap-2">
                      <Calendar className="w-4 h-4 text-brand-text/40" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center md:justify-end gap-2">
                      <MapPin className="w-4 h-4 text-brand-text/40" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* --- BODY KARTU --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8 relative z-10">
                  {item.description.map((desc, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0 group-hover:bg-brand-purple transition-colors duration-300" />
                      <p className="text-brand-text/70 font-medium leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* --- FOOTER KARTU --- */}
                <div className="border-t border-brand-text/5 pt-6 relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-brand-text/40" />
                    <span className="text-sm font-black tracking-wide text-brand-text/60 uppercase">
                      {dict.technologiesLabel}{" "}
                      {/* <-- Teks hardcoded diubah menjadi dinamis */}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-brand-text/5 text-brand-text/80 text-sm font-bold rounded-full border border-brand-text/5 group-hover:border-brand-purple/10 group-hover:bg-brand-purple/5 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
