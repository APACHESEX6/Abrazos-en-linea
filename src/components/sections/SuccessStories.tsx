
"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';

const stories = [
  {
    name: "Alex, 17 años",
    text: "Pensé que el dolor nunca terminaría, pero hablarlo con mi mamá y un terapeuta cambió todo. Hoy disfruto de la pintura y de mis amigos.",
    imgId: "success-1"
  },
  {
    name: "Santi, 16 años",
    text: "Estaba en un lugar muy oscuro. Llamé a una línea de ayuda una noche difícil y me escucharon sin juzgarme. Eso fue el inicio de mi recuperación.",
    imgId: "success-2"
  },
  {
    name: "María, 18 años",
    text: "Gracias al apoyo de mi escuela y mis amigos, entendí que no soy una carga. La vida tiene colores que no podía ver antes.",
    imgId: "success-3"
  }
];

export function SuccessStories() {
  return (
    <section id="historias" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold">Historias de Esperanza</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Testimonios reales de jóvenes que superaron momentos difíciles y hoy celebran la vida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, idx) => {
            const img = PlaceHolderImages.find(i => i.id === story.imgId);
            return (
              <Card key={idx} className="border-none shadow-lg overflow-hidden rounded-3xl bg-white hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-64">
                  {img && (
                    <Image 
                      src={img.imageUrl}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold">{story.name}</p>
                  </div>
                </div>
                <CardContent className="pt-8 pb-10 px-6 relative">
                  <Quote className="absolute top-4 right-6 w-12 h-12 text-primary/10 -rotate-12" />
                  <p className="text-muted-foreground italic leading-relaxed relative z-10">
                    "{story.text}"
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
