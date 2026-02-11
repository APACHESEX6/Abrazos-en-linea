
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
    <section id="inicio" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Luces de fondo (Orbs) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,121,255,0.06),transparent_50%)]" />
      <div className="absolute top-0 right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-soft" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-bold text-primary tracking-wide">Espacio 100% Confidencial</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] tracking-tight text-foreground">
            Tu historia <br />
            aún tiene <br />
            <span className="text-gradient italic">muchas páginas</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
            No tienes que cargar con todo tú solo. Abrazos Digitales es un refugio diseñado por expertos para acompañarte en los días grises.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg" className="rounded-full shadow-xl shadow-primary/20 h-14 px-8 group bg-primary hover:bg-primary/90 text-white border-none text-base font-bold transition-all hover:scale-105" asChild>
              <Link href="#recursos">
                Explorar Recursos
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-primary/20 bg-white/50 backdrop-blur-md hover:bg-white hover:border-primary transition-all text-base font-bold group" asChild>
              <Link href="#historias">
                <Sparkles className="w-5 h-5 mr-2 text-primary group-hover:rotate-12 transition-transform" />
                Ver Historias
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-2 text-muted-foreground/60 animate-fade-in [animation-delay:400ms]">
            <p className="text-xs font-semibold italic flex items-center gap-2">
              <MousePointer2 className="w-3.5 h-3.5" />
              Únete a otros jóvenes buscando esperanza y apoyo profesional
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms] hidden lg:block h-full">
          <div className="relative z-10 h-full flex items-center justify-center">
            {/* Imagen Principal con Estilo Profesional */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white p-3 border border-primary/5 animate-float">
              <div className="rounded-[2rem] overflow-hidden w-[450px] h-[350px] relative">
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
            <div className="absolute top-8 -left-8 glass-card p-5 rounded-[2rem] animate-float [animation-delay:1s] z-20 flex items-center gap-3 shadow-xl border border-white/40">
              <div className="bg-primary/20 p-2.5 rounded-xl">
                <Heart className="w-5 h-5 text-primary fill-primary/40" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Apoyo Activo</p>
                <p className="font-bold text-base">Estamos contigo</p>
              </div>
            </div>

            <div className="absolute bottom-8 -right-4 glass-card p-5 rounded-[2rem] animate-float [animation-delay:2.5s] z-20 flex items-center gap-3 shadow-xl border border-white/40">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                 <p className="font-bold text-sm text-foreground">Espacio Seguro</p>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Privacidad total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
