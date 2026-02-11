
"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Eye, HandHelping, Info } from 'lucide-react';

const sections = [
  {
    title: "Señales de Advertencia",
    description: "Presta atención a estos cambios en el comportamiento de un amigo o en ti mismo.",
    icon: Eye,
    items: ["Hablar sobre querer morir", "Sentimientos de desesperanza extrema", "Retirarse de amigos y actividades", "Cambios bruscos de humor", "Regalar pertenencias queridas"]
  },
  {
    title: "Factores de Riesgo",
    description: "Ciertas circunstancias pueden aumentar la vulnerabilidad emocional.",
    icon: Info,
    items: ["Antecedentes de depresión", "Eventos estresantes recientes", "Aislamiento social", "Conflictos familiares severos", "Acoso escolar o bullying"]
  },
  {
    title: "Cómo Buscar Ayuda",
    description: "No tienes que cargar con todo. Pedir ayuda es un acto de valentía.",
    icon: HandHelping,
    items: ["Habla con un adulto de confianza", "Llama a líneas de emergencia (911)", "Escribe a una línea de crisis", "Visita a un profesional de salud", "Acompaña a quien lo necesite"]
  }
];

export function InfoCards() {
  return (
    <section id="info" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-headline font-bold text-primary-foreground">Información que Salva Vidas</h2>
          <p className="text-lg text-muted-foreground">
            Conocer las señales y saber cómo actuar puede marcar la diferencia. 
            Educarse es el primer paso para la prevención.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow bg-secondary/10 group">
              <CardHeader className="space-y-4">
                <div className="bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
