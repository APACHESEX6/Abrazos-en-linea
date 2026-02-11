"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Eye, HandHelping, Info, ArrowRight } from 'lucide-react';

const sections = [
  {
    title: "Señales de Alerta",
    description: "Pequeños cambios que pueden significar mucho. Aprender a verlos es cuidar.",
    icon: Eye,
    items: ["Hablar sobre sentimientos de vacío", "Aislamiento de amigos y familia", "Cambios drásticos en el sueño", "Despedidas inusuales", "Pérdida de esperanza"]
  },
  {
    title: "Factores de Riesgo",
    description: "Circunstancias que nos hacen más vulnerables. No son tu culpa.",
    icon: Info,
    items: ["Presión académica extrema", "Conflictos en el hogar", "Acoso escolar o cyberbullying", "Dificultades de identidad", "Eventos traumáticos"]
  },
  {
    title: "Cómo Actuar",
    description: "La valentía comienza al pedir ayuda. Nunca estás solo en esto.",
    icon: HandHelping,
    items: ["Busca un adulto de confianza", "Llama a líneas de crisis gratuitas", "Escribe tus sentimientos", "Acompaña sin juzgar", "Prioriza tu salud mental"]
  }
];

export function InfoCards() {
  return (
    <section id="info" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6 animate-reveal">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-3xl shadow-sm">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground leading-tight">
            Conocimiento que <span className="text-primary">Salva Vidas</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Entender lo que nos pasa es el primer paso para sanar. 
            Educarse es un acto de amor propio y hacia los demás.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <Card key={idx} className={
              `border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] 
              transition-all duration-500 bg-secondary/5 group rounded-[2.5rem] overflow-hidden
              animate-reveal animate-stagger-${idx + 1}`
            }>
              <CardHeader className="space-y-6 p-8 pb-4">
                <div className="bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-primary transition-all duration-500 group-hover:rotate-12">
                  <section.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <CardTitle className="font-headline text-3xl mb-3 text-foreground">{section.title}</CardTitle>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">{section.description}</p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-4 mb-6">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 opacity-50 group-hover:opacity-100" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-primary font-bold text-sm cursor-pointer hover:underline gap-1 group/link">
                  Leer más <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
