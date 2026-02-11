"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-secondary/50 via-secondary/20 to-white">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8 animate-reveal">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10 text-xs md:text-sm font-semibold text-primary shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            Espacio Confidencial y Gratuito
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold leading-[1.1] text-foreground tracking-tight">
            No estás solo, estamos para <span className="text-primary relative inline-block">
              abrazarte
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
              </svg>
            </span>.
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-lg leading-relaxed font-medium">
            Un refugio seguro diseñado para jóvenes. Aquí encontrarás la luz, 
            el apoyo y las herramientas que necesitas para seguir adelante.
          </p>
          <div className="flex flex-wrap gap-5 pt-4">
            <Button size="lg" className="rounded-full shadow-xl shadow-primary/20 h-14 px-10 group bg-primary hover:bg-primary/90 text-primary-foreground border-none">
              Explorar Recursos
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-10 border-primary/20 bg-white/50 hover:bg-white hover:border-primary transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Ver Historias
            </Button>
          </div>
        </div>

        <div className="relative animate-reveal [animation-delay:200ms]">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] animate-float">
            {heroImg && (
              <Image 
                src={heroImg.imageUrl}
                alt={heroImg.description}
                width={700}
                height={500}
                className="w-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                data-ai-hint={heroImg.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
          </div>
          {/* Accent icons */}
          <div className="absolute -top-6 -left-6 bg-white p-4 rounded-3xl shadow-xl animate-float [animation-delay:1s] z-20">
            <Heart className="w-8 h-8 text-primary fill-primary/10" />
          </div>
          <div className="absolute -bottom-8 -right-4 bg-white px-6 py-4 rounded-3xl shadow-xl animate-float [animation-delay:2s] z-20 hidden md:block">
            <p className="text-sm font-bold text-foreground">Tu vida importa ❤️</p>
          </div>
        </div>
      </div>
    </section>
  );
}
