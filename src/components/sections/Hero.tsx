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
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Luces de fondo (Orbs) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,121,255,0.08),transparent_70%)]" />
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-soft" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <div className="space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/20 shadow-sm animate-fade-in">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-bold text-primary tracking-wide">Espacio 100% Confidencial</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.05] tracking-tight text-foreground">
            Tu historia <br />
            aún tiene <br />
            <span className="text-gradient italic">muchas páginas</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-medium">
            No tienes que cargar con todo tú solo. <span className="text-primary font-bold">Abrazos en línea</span> es un refugio diseñado por expertos para acompañarte en los días grises.
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
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
            <p className="text-sm font-semibold italic flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Únete a otros jóvenes buscando esperanza y apoyo profesional
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms] hidden lg:block h-full">
          <div className="relative z-10 h-full flex items-center justify-center">
            {/* Imagen Principal con Estilo Profesional */}
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] bg-white p-4 border border-primary/5 animate-float">
              <div className="rounded-[3rem] overflow-hidden w-[550px] h-[450px] relative">
                {heroImg && (
                  <Image 
                    src={heroImg.imageUrl}
                    alt={heroImg.description}
                    fill
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                    data-ai-hint={heroImg.imageHint}
                    priority
                  />
                )}
              </div>
            </div>

            {/* Burbujas Flotantes */}
            <div className="absolute top-12 -left-12 glass-card p-6 rounded-[2.5rem] animate-float [animation-delay:1s] z-20 flex items-center gap-4 shadow-2xl border border-white/40">
              <div className="bg-primary/20 p-3 rounded-2xl">
                <Heart className="w-6 h-6 text-primary fill-primary/40" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Apoyo Activo</p>
                <p className="font-bold text-lg text-foreground">Estamos contigo</p>
              </div>
            </div>

            <div className="absolute bottom-12 -right-8 glass-card p-6 rounded-[2.5rem] animate-float [animation-delay:2.5s] z-20 flex items-center gap-4 shadow-2xl border border-white/40">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                 <p className="font-bold text-lg text-foreground">Espacio Seguro</p>
                 <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Privacidad total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
