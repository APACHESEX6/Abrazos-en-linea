"use client"

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users2, BadgeCheck } from 'lucide-react';

const questions = [
  {
    q: "¿Es normal sentir que nadie me entiende?",
    a: "Totalmente. Durante la adolescencia, muchos jóvenes experimentan una sensación de desconexión. El cerebro adolescente está literalmente en proceso de desarrollo, lo que hace que las emociones se sientan más intensas. No estás solo — hay profesionales y comunidades de apoyo preparados para escucharte.",
  },
  {
    q: "¿Cómo puedo ayudar a un amigo que está hablando de suicidio?",
    a: "Escucha activamente y sin juzgar. Valida sus sentimientos con frases como 'entiendo que estás pasando por algo muy difícil'. Pregúntale directamente si tiene pensamientos de hacerse daño — esto no pone ideas, al contrario, abre una puerta de alivio. Acompáñalo a hablar con un adulto de confianza o un profesional. Nunca guardes el secreto si su vida está en riesgo.",
  },
  {
    q: "¿La terapia realmente funciona para los jóvenes?",
    a: "Sí, y la evidencia científica es contundente. La terapia cognitivo-conductual (TCC) tiene tasas de efectividad superiores al 70% en adolescentes con depresión y ansiedad. El proceso te da herramientas prácticas para entender tus emociones, cambiar patrones de pensamiento y construir resiliencia. Lo más importante es encontrar un terapeuta con quien te sientas seguro.",
  },
  {
    q: "¿Qué debo hacer si estoy en un momento de crisis extrema ahora mismo?",
    a: "Primero: no estás solo. Llama al 717 003 717 o al 024 ahora mismo — son gratuitos y confidenciales. Si estás en peligro inmediato, llama al 911. Si puedes, busca a alguien de confianza que esté contigo. Intenta la respiración 4-7-8: inhala 4 segundos, sostén 7, exhala 8. La crisis es temporal, aunque no lo parezca en este momento.",
  },
  {
    q: "¿Pedir ayuda me hace débil o 'loco'?",
    a: "Para nada. Pedir ayuda es uno de los actos más valientes e inteligentes que existe. Los problemas de salud mental son condiciones médicas como cualquier otra — nadie cuestionaría a alguien por ir al médico con una fractura. El estigma existe, pero se combate con información. Cuidar tu salud mental es cuidar todo tu ser.",
  },
  {
    q: "¿Cómo sé si lo que siento es tristeza normal o algo más serio?",
    a: "La tristeza normal dura días y está relacionada con una causa identificable. Cuando la tristeza se extiende más de dos semanas, interfiere con actividades del día a día, viene con pérdida de interés en cosas que antes amabas, o incluye pensamientos de hacerte daño, es importante buscar una evaluación profesional. No tienes que esperar a 'estar peor' para pedir ayuda.",
  },
];

export function ExpertQA() {
  return (
    <section id="expertos" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px] -z-10" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-10 md:gap-16">
          <div className="lg:w-2/5 space-y-5 md:space-y-6 lg:sticky lg:top-28">
            <div className="bg-primary/10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl md:rounded-3xl shadow-sm">
              <Users2 className="w-7 h-7 md:w-8 md:h-8 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground leading-tight">
              Preguntas <br className="hidden md:block" />
              con <span className="text-primary italic">Expertos</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium text-base md:text-lg">
              Resolvemos las dudas más comunes con el respaldo de psicólogos especializados en salud mental juvenil.
            </p>
            <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground/80">
                Contenido revisado por profesionales de salud mental
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:w-3/5 w-full">
            <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4" aria-label="Preguntas frecuentes sobre salud mental">
              {questions.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-primary/10 rounded-2xl px-5 md:px-6 bg-secondary/5 hover:bg-white hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline font-headline text-base md:text-lg text-left py-5 md:py-6 text-foreground font-bold leading-snug">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 md:pb-6 text-sm md:text-base font-medium">
                    <div className="border-l-2 border-primary/30 pl-4">
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
