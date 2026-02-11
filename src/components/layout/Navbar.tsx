
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart } from 'lucide-react';
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
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary/30 transition-colors">
            <Heart className="w-6 h-6 text-primary fill-primary/10" />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight text-primary-foreground">
            Abrazos Digitales
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button variant="default" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
            Ayuda Urgente
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-primary/10 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-lg font-medium py-2 border-b border-primary/5 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="default" className="w-full mt-4 rounded-full">
            Ayuda Urgente
          </Button>
        </div>
      )}
    </nav>
  );
}
