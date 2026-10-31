"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface CertificatesProps {
  dict: {
    title: string;
    accent: string;
  };
}

// Data 4 sertifikat terbaru (2 atas, 2 bawah)
const certificates = [
  {
    id: 1,
    title: "Dicoding Indonesia",
    alt: "Sertifikat Dicoding Indonesia",
    img: "/images/certificate/dicoding.webp",
  },
  {
    id: 2,
    title: "Cisco Networking Academy",
    alt: "Sertifikat Cisco Networking Academy",
    img: "/images/certificate/cisco.webp",
  },
  {
    id: 3,
    title: "MySkill",
    alt: "Sertifikat MySkill",
    img: "/images/certificate/MySkil.webp",
  },
  {
    id: 4,
    title: "RevoU",
    alt: "Sertifikat RevoU",
    img: "/images/certificate/revou.webp",
  },
];

export default function Certificates({ dict }: CertificatesProps) {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="certificates" className="scroll-mt-14 py-8 md:py-12 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Badge Judul */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
            {dict.title} <span className="text-brand-mint">{dict.accent}</span>.
          </h2>
        </div>

        {/* Grid Galeri Sertifikat (2 Atas, 2 Bawah) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 group">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Card Sertifikat */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="group/card relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border-2 border-brand-text/10 cursor-pointer shadow-md transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-mint/20 hover:border-brand-mint group-hover:opacity-75 hover:!opacity-100 transform-gpu"
              >
                <Image
                  src={cert.img}
                  alt={cert.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                />

                {/* Overlay transparan dengan ikon zoom */}
                <div className="absolute inset-0 bg-brand-text/30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-base font-bold text-white text-center drop-shadow-md">
                    {cert.title}
                  </p>
                  <span className="text-xs font-semibold text-white/80">Klik untuk perbesar</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Lightbox Sertifikat saat diklik */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-text/10">
                <h3 className="text-lg font-black text-brand-text">
                  {selectedCert.title}
                </h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-brand-text/5 hover:bg-brand-text/10 flex items-center justify-center text-brand-text transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gambar Sertifikat Full */}
              <div className="relative aspect-[4/3] w-full bg-black/5 flex items-center justify-center p-2">
                <Image
                  src={selectedCert.img}
                  alt={selectedCert.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}