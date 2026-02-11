
"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Globe, MessageCircle, MapPin, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resources = [
  {
    title: "Línea de la Vida",
    type: "Nacional (España/LATAM)",
    contact: "01 800 911 2000",
    description: "Atención especializada 24/7 en salud mental y crisis emocional.",
    icon: Phone,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "S.O.S Adolescentes",
    type: "Web & Chat",
    contact: "www.sosadolescentes.org",
    description: "Chat en vivo con consejeros capacitados para jóvenes.",
    icon: MessageCircle,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Centros de Apoyo Local",
    type: "Presencial",
    contact: "Localizador de Centros",
    description: "Encuentra la unidad de salud mental más cercana a tu hogar.",
    icon: MapPin,
    color: "bg-purple-50 text-purple-600"
  }
];

export function Resources() {
  return (
    <section id="recursos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center mb-16 space-y-4">
            <div className="flex justify-center mb-4">
              <LifeBuoy className="w-12 h-12 text-primary animate-pulse" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Directorio de Recursos</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No importa dónde estés, siempre hay alguien dispuesto a escucharte. 
              Estos servicios son gratuitos y confidenciales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {resources.map((res, idx) => (
              <Card key={idx} className="border-none shadow-lg rounded-2xl bg-white/80 backdrop-blur hover:scale-105 transition-transform">
                <CardHeader>
                  <div className={`${res.color} w-12 h-12 flex items-center justify-center rounded-xl mb-4`}>
                    <res.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="font-headline text-xl">{res.title}</CardTitle>
                    <p className="text-xs font-bold text-primary tracking-widest uppercase">{res.type}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{res.description}</p>
                  <div className="bg-secondary/20 p-4 rounded-xl text-center">
                    <p className="font-bold text-primary-foreground">{res.contact}</p>
                  </div>
                  <Button variant="outline" className="w-full rounded-full border-primary/30 group">
                    Contactar Ahora
                    <Globe className="w-4 h-4 ml-2 opacity-40 group-hover:opacity-100" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
