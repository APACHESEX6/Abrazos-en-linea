
"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, ShieldCheck, Sparkles, Heart, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-visible">
      {/* Dynamic Backgrounds (Bubbles/Orbs) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,121,255,0.1),transparent_50%)]" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-soft" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-accent/30 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 animate-fade-up">
          <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/20 shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-sm font-bold text-primary tracking-wide">Espacio 100% Confidencial</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[1.05] tracking-tight text-foreground">
            Tu historia aún tiene <br />
            <span className="text-gradient italic relative inline-block">
              muchas páginas
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-medium">
            No tienes que cargar con todo tú solo. Abrazos Digitales es un refugio diseñado por expertos para acompañarte en los días grises.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Button size="lg" className="rounded-full shadow-2xl shadow-primary/30 h-16 px-10 group bg-primary hover:bg-primary/90 text-white border-none text-lg font-bold transition-all hover:scale-105" asChild>
              <Link href="#recursos">
                Explorar Recursos
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-16 px-10 border-primary/20 bg-white/50 backdrop-blur-md hover:bg-white hover:border-primary transition-all text-lg font-bold group" asChild>
              <Link href="#historias">
                <Sparkles className="w-5 h-5 mr-2 text-primary group-hover:rotate-12 transition-transform" />
                Ver Historias
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4 text-muted-foreground/60 animate-fade-in [animation-delay:400ms]">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                  SOPORTE
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold italic flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Únete a otros jóvenes buscando esperanza
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms] lg:block">
          <div className="relative z-10 animate-float">
            <div className="rounded-[3.5rem] overflow-hidden shadow-[0_48px_96px_-16px_rgba(0,0,0,0.15)] bg-white p-4">
              <div className="rounded-[2.5rem] overflow-hidden">
                {heroImg && (
                  <Image 
                    src={heroImg.imageUrl}
                    alt={heroImg.description}
                    width={800}
                    height={600}
                    className="w-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                    data-ai-hint={heroImg.imageHint}
                    priority
                  />
                )}
              </div>
            </div>

            {/* Floating Info Bubbles */}
            <div className="absolute top-12 -left-12 glass-card p-6 rounded-[2.5rem] animate-float [animation-delay:1s] z-20 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-2xl">
                <Heart className="w-6 h-6 text-primary fill-primary/40" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Apoyo Activo</p>
                <p className="font-bold text-lg">Estamos contigo</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-[2.5rem] animate-float [animation-delay:2s] z-20 hidden md:flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                 <p className="text-sm font-bold text-foreground">Espacio Seguro</p>
                 <p className="text-xs text-muted-foreground">Privacidad garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in [animation-delay:800ms]">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Desliza para explorar</p>
      </div>
    </section>
  );
}
