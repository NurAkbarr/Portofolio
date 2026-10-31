"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Folder, Mail, Globe } from "lucide-react"; // Tambahkan Mail
import { Locale } from "@/lib/dictionary";

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  
  const isClickScrolling = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-20% 0px -50% 0px", 
      threshold: 0.1,
    });

    // PERBAIKAN 1: Tambahkan "contact" ke dalam array untuk deteksi scroll
    const sections = ["home", "about", "experience", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLanguageToggle = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    const currentHash = window.location.hash;
    window.location.href = `/${nextLocale}${currentHash}`;
  };

  const handleNavLinkClick = (id: string) => {
    setActiveSection(id);
    isClickScrolling.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  // PERBAIKAN 2: Tambahkan objek menu Kontak di baris terakhir
  const menuItems = [
    { id: "home", name: locale === "id" ? "Beranda" : "Home", path: "#home", icon: Home, color: "bg-brand-blue" },
    { id: "about", name: locale === "id" ? "Tentang" : "About", path: "#about", icon: User, color: "bg-brand-pink" },
    { id: "experience", name: locale === "id" ? "Pengalaman" : "Experience", path: "#experience", icon: Briefcase, color: "bg-brand-purple" },
    { id: "projects", name: locale === "id" ? "Proyek" : "Projects", path: "#projects", icon: Folder, color: "bg-brand-amber" },
    { id: "contact", name: locale === "id" ? "Kontak" : "Contact", path: "#contact", icon: Mail, color: "bg-brand-text" },
  ];

  return (
    <header className="fixed bottom-4 md:top-4 md:bottom-auto inset-x-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav className="flex items-center gap-1 md:gap-2 bg-white/80 backdrop-blur-md border-2 border-brand-text/10 px-2 md:px-4 py-2 rounded-full shadow-lg">
        
        {/* Logo */}
        <a 
          href="#home" 
          onClick={() => handleNavLinkClick("home")}
          className="font-black text-lg md:text-xl tracking-tighter px-2 text-brand-text hover:scale-105 transition-transform"
        >
          NA<span className="text-brand-pink">.</span>
        </a>

        <div className="h-5 md:h-6 w-[1px] bg-brand-text/10 mx-1" />

        {/* Menu Navigasi */}
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <a 
              key={item.id} 
              href={item.path} 
              onClick={() => handleNavLinkClick(item.id)} 
              className="relative px-3 md:px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors text-brand-text"
              title={item.name}
            >
              {isActive && (
                <motion.span 
                  layoutId="activeNav" 
                  className={`absolute inset-0 rounded-full ${item.color} -z-10`} 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} 
                />
              )}
              <Icon className={`w-4 h-4 md:w-4 md:h-4 ${isActive ? "text-white" : "text-brand-text"}`} />
              
              <span className={`hidden lg:block ${isActive ? "text-white" : "hover:text-brand-purple transition-colors"}`}>
                {item.name}
              </span>
            </a>
          );
        })}

        <div className="h-5 md:h-6 w-[1px] bg-brand-text/10 mx-1" />

        {/* Language Switcher */}
        <button 
          onClick={handleLanguageToggle}
          className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 border border-brand-text/10 rounded-full text-xs font-black bg-brand-text/5 hover:bg-brand-text/10 text-brand-text transition-all active:scale-95"
        >
          <Globe className="w-3.5 h-3.5 text-brand-text/70" />
          <span>{locale.toUpperCase()}</span>
        </button>
      </nav>
    </header>
  );
}