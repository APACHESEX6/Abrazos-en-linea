"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Información', href: '#info' },
  { name: 'Auto-Evaluación', href: '#test' },
  { name: 'Historias', href: '#historias' },
  { name: 'Recursos', href: '#recursos' },
  { name: 'Chat AI', href: '#ai-support' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-4",
      scrolled ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/40 transition-all duration-300 group-hover:rotate-6">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary/20" />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight text-primary-foreground">
            Abrazos Digitales
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <Button variant="default" className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 font-bold bg-primary text-primary-foreground border-none">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Ayuda Urgente
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary-foreground p-2 hover:bg-primary/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-primary/10 p-6 flex flex-col gap-4 shadow-2xl md:hidden animate-in slide-in-from-top duration-500 rounded-b-3xl">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-lg font-medium py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="default" className="w-full mt-4 rounded-full py-6 text-lg font-bold">
            <ShieldAlert className="w-5 h-5 mr-2" />
            Ayuda Urgente
          </Button>
        </div>
      )}
    </nav>
  );
}
