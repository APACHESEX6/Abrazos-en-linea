
"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 fade-in">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full border border-primary/20 text-sm font-medium text-primary-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Un espacio seguro para ti
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-primary-foreground">
            No estás solo, estamos aquí para <span className="text-primary italic">abrazarte</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Abrazos Digitales es un refugio seguro donde encontrarás apoyo, 
            comprensión y herramientas para navegar por los momentos difíciles. 
            Tu vida es valiosa y tu futuro brilla.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="rounded-full shadow-lg h-12 px-8 group">
              Explorar Recursos
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 border-primary/40 bg-white/50">
              Ver Historias
            </Button>
          </div>
        </div>

        <div className="relative fade-in [animation-delay:200ms]">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            {heroImg && (
              <Image 
                src={heroImg.imageUrl}
                alt={heroImg.description}
                width={600}
                height={400}
                className="w-full object-cover"
                data-ai-hint={heroImg.imageHint}
              />
            )}
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/30 rounded-full blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}
