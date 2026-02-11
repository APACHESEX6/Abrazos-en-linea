"use client"

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Quote, Users2 } from 'lucide-react';

const questions = [
  {
    q: "¿Es normal sentir que nadie me entiende?",
    a: "Totalmente. Durante la adolescencia, muchos jóvenes experimentan una sensación de desconexión. Sin embargo, no estás solo. Hay muchos profesionales y grupos que han pasado por lo mismo y pueden ofrecerte una perspectiva diferente."
  },
  {
    q: "¿Cómo puedo ayudar a un amigo que está hablando de suicidio?",
    a: "Escucha activamente sin juzgar. Valida sus sentimientos y acompáñalo a hablar con un adulto de confianza. Nunca guardes el secreto; su vida es lo más importante."
  },
  {
    q: "¿La terapia realmente funciona?",
    a: "Sí. La terapia te brinda herramientas prácticas para manejar tus emociones y pensamientos. Es un proceso de aprendizaje sobre ti mismo que fortalece tu resiliencia."
  },
  {
    q: "¿Qué debo hacer en un momento de crisis extrema?",
    a: "Contacta inmediatamente a una línea de emergencia. No te quedes solo. Intenta técnicas de respiración consciente mientras llega la ayuda."
  }
];

export function ExpertQA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 space-y-6">
            <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-2xl">
              <Users2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold text-foreground">Consultas con Expertos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resolvemos tus dudas más comunes con el apoyo de psicólogos especializados en juventud.
            </p>
          </div>
          
          <div className="md:w-2/3 w-full">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {questions.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-primary/10 rounded-2xl px-6 bg-secondary/5 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline font-headline text-lg text-left py-6 text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    <div className="flex gap-3">
                      <Quote className="w-5 h-5 text-primary shrink-0 rotate-180" />
                      {item.a}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}