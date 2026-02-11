
"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, ShieldCheck, Heart, MousePointer2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section id="inicio" className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Orbes de luz de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,121,255,0.06),transparent_70%)]" />
      <div className="absolute top-0 right-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/10 rounded-full blur-[80px] md:blur-[150px] -z-10 animate-pulse-soft" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-accent/15 rounded-full blur-[60px] md:blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="space-y-6 md:space-y-8 animate-fade-up text-center lg:text-left">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-primary/20 shadow-sm animate-fade-in mx-auto lg:mx-0">
            <span className="flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] md:text-xs font-bold text-primary tracking-wide uppercase">Espacio 100% Confidencial</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.1] tracking-tight text-foreground">
            Tu historia <br className="hidden sm:block" />
            aún tiene <br className="hidden sm:block" />
            <span className="text-gradient italic pr-2 md:pr-6 inline-block">mucho amor</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            No tienes que cargar con todo tú solo. <span className="text-primary font-bold">Abrazos en línea</span> es un refugio diseñado para acompañarte en tus días más difíciles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5 pt-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full shadow-xl shadow-primary/20 h-14 md:h-16 px-8 md:px-10 group bg-primary hover:bg-primary/90 text-white border-none text-base md:text-lg font-bold transition-all hover:scale-105" asChild>
              <Link href="#recursos">
                Explorar Ayuda
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 md:h-16 px-8 md:px-10 border-primary/20 bg-white/50 backdrop-blur-md hover:bg-white hover:border-primary transition-all text-base md:text-lg font-bold group" asChild>
              <Link href="#historias">
                <Sparkles className="w-5 h-5 mr-2 text-primary group-hover:rotate-12 transition-transform" />
                Historias
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 text-muted-foreground/60 animate-fade-in [animation-delay:400ms]">
            <p className="text-xs md:text-sm font-semibold italic flex items-center gap-3">
              <MousePointer2 className="w-4 h-4" />
              Un lugar seguro para jóvenes buscando esperanza y apoyo
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms] lg:block">
          <div className="relative z-10 h-full flex items-center justify-center">
            {/* Contenedor de Imagen Proporcional */}
            <div className="relative w-full max-w-[400px] lg:max-w-[550px] rounded-[3rem] lg:rounded-[4rem] shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] bg-white p-2 md:p-3 border border-primary/5 animate-float">
              <div className="rounded-[2.5rem] lg:rounded-[3.2rem] overflow-hidden aspect-[6/5] relative">
                {heroImg && (
                  <Image 
                    src={heroImg.imageUrl}
                    alt={heroImg.description}
                    fill
                    className="object-cover transition-transform duration-1000"
                    data-ai-hint={heroImg.imageHint}
                    priority
                  />
                )}
              </div>

              {/* Burbujas Flotantes Sobresaliendo */}
              <div className="absolute top-4 -left-6 md:top-8 md:-left-12 glass-card p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] animate-float [animation-delay:1s] z-20 flex items-center gap-3 md:gap-4 shadow-xl border border-white/40">
                <div className="bg-primary/15 p-2 md:p-3 rounded-xl md:rounded-2xl">
                  <Heart className="w-4 h-4 md:w-6 md:h-6 text-primary fill-primary/40" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Apoyo Activo</p>
                  <p className="font-bold text-sm md:text-lg text-foreground">Estamos contigo</p>
                </div>
              </div>

              <div className="absolute bottom-4 -right-4 md:bottom-12 md:-right-8 glass-card p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] animate-float [animation-delay:2.5s] z-20 flex items-center gap-3 md:gap-4 shadow-xl border border-white/40">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-green-100 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-green-600" />
                </div>
                <div>
                   <p className="font-bold text-sm md:text-lg text-foreground">Espacio Seguro</p>
                   <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-wider">Privacidad total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
