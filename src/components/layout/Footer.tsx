"use client"

import React, { useState, useEffect } from 'react';
import { Heart, Instagram, Twitter, Facebook, Phone, Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-primary/10 py-16" aria-label="Pie de página">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12 md:gap-16">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Abrazos en línea - Inicio">
            <div className="bg-primary p-2 rounded-xl shadow-md shadow-primary/20 group-hover:rotate-12 transition-all duration-500">
              <Heart className="w-5 h-5 text-white fill-white/20" aria-hidden="true" />
            </div>
            <span className="text-2xl md:text-3xl font-headline font-bold text-foreground">
              Abrazos<span className="text-primary"> en línea</span>
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm text-base md:text-lg leading-relaxed font-medium">
            Nuestra misión es brindar luz en los momentos de sombra.
            Cada vida es una historia que merece ser contada y celebrada.
          </p>

          {/* Crisis banner in footer */}
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground/80">
              Crisis:{' '}
              <a href="tel:717003717" className="text-primary font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">717 003 717</a>
              {' '}·{' '}
              <a href="tel:024" className="text-primary font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">024</a>
              {' '}·{' '}
              <a href="tel:911" className="text-primary font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">911</a>
            </p>
          </div>

          <div className="flex gap-4" role="list" aria-label="Redes sociales">
            {[
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
              { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com' },
              { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                role="listitem"
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Navegación del pie de página">
          <h4 className="font-bold text-lg text-foreground mb-5">Navegación</h4>
          <ul className="space-y-3 text-muted-foreground font-medium">
            {[
              { label: 'Información', href: '#info' },
              { label: 'Evaluación', href: '#test' },
              { label: 'Historias', href: '#historias' },
              { label: 'IA Apoyo', href: '#ai-support' },
              { label: 'Recursos', href: '#recursos' },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded text-base">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal">
          <h4 className="font-bold text-lg text-foreground mb-5">Legal</h4>
          <ul className="space-y-3 text-muted-foreground font-medium">
            <li>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary/50 shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground/70 text-xs italic leading-relaxed">
                  Esta plataforma es un recurso de apoyo informativo. No reemplaza atención clínica profesional.
                </span>
              </div>
            </li>
            <li>
              <span className="text-muted-foreground/60 text-xs">
                Información clínica revisada bajo estándares de la OMS y la OPS.
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground font-medium">
        <p>© {year ?? 2026} Abrazos en línea. Hecho con amor y esperanza.</p>
        <p className="text-xs text-muted-foreground/50">
          Desarrollado con Next.js 15 · Firebase · Vercel
        </p>
      </div>
    </footer>
  );
}
