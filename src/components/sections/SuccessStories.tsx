"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote, Sparkles } from 'lucide-react';

const stories = [
  {
    name: "Alex, 17 años",
    tag: "Recuperación",
    text: "Pensé que el dolor nunca terminaría, pero hablarlo con mi mamá y un terapeuta cambió todo. Hoy disfruto de la pintura y de mis amigos.",
    imgId: "success-1",
    color: "from-purple-500/80 to-primary/80",
  },
  {
    name: "Santi, 16 años",
    tag: "Esperanza",
    text: "Estaba en un lugar muy oscuro. Llamé a una línea de ayuda una noche difícil y me escucharon sin juzgarme. Eso fue el inicio de mi recuperación.",
    imgId: "success-2",
    color: "from-blue-500/80 to-primary/80",
  },
  {
    name: "María, 18 años",
    tag: "Resiliencia",
    text: "Gracias al apoyo de mi escuela y mis amigos, entendí que no soy una carga. La vida tiene colores que no podía ver antes.",
    imgId: "success-3",
    color: "from-rose-400/80 to-primary/80",
  },
];

export function SuccessStories() {
  return (
    <section id="historias" className="py-20 md:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 space-y-4 md:space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-bold text-xs md:text-sm">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Testimonios Reales
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground leading-tight">
            Historias de <span className="text-gradient italic">Esperanza</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed">
            Jóvenes que atravesaron sus momentos más difíciles y hoy celebran la vida. Sus historias son prueba de que sí es posible.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8" role="list" aria-label="Historias de esperanza">
          {stories.map((story, idx) => {
            const img = PlaceHolderImages.find(i => i.id === story.imgId);
            return (
              <Card
                key={idx}
                role="listitem"
                className="border-none shadow-xl overflow-hidden rounded-3xl bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group flex flex-col animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  {img ? (
                    <Image
                      src={img.imageUrl}
                      alt={`Fotografía representando la historia de ${story.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint={img.imageHint}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20" aria-hidden="true" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${story.color} opacity-70`} aria-hidden="true" />

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-2 border border-white/30">
                      {story.tag}
                    </span>
                    <p className="text-white font-bold text-lg font-headline">{story.name}</p>
                  </div>
                </div>

                {/* Quote */}
                <CardContent className="p-6 md:p-8 relative flex-1 flex flex-col justify-between">
                  <Quote className="absolute top-4 right-5 w-10 h-10 text-primary/8 -rotate-12" aria-hidden="true" />
                  <blockquote>
                    <p className="text-muted-foreground italic leading-relaxed text-base relative z-10">
                      "{story.text}"
                    </p>
                  </blockquote>
                  <div className="mt-5 pt-4 border-t border-primary/5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Historia verificada</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted-foreground/60 mt-8 md:mt-12 italic max-w-lg mx-auto">
          * Los nombres han sido cambiados para proteger la privacidad de las personas. Las historias se comparten con su consentimiento.
        </p>
      </div>
    </section>
  );
}
