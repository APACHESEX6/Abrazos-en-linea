
"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Eye, HandHelping, Info, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const sections = [
  {
    title: "Señales de Alerta",
    description: "Pequeños cambios que pueden significar mucho. Aprender a verlos es cuidar.",
    icon: Eye,
    items: ["Hablar sobre sentimientos de vacío", "Aislamiento de amigos y familia", "Cambios drásticos en el sueño", "Despedidas inusuales", "Pérdida de esperanza"],
    details: {
      intro: "Las señales de alerta son indicadores de que alguien puede estar en riesgo. No siempre son obvias y a menudo se presentan de forma sutil.",
      blocks: [
        {
          subtitle: "Comunicación Verbal",
          content: "Presta atención a frases como 'Ya no quiero seguir así', 'Estarían mejor sin mí' o 'No veo una salida'. También hablar sobre sentirse atrapado o ser una carga intolerable para los demás."
        },
        {
          subtitle: "Cambios de Comportamiento",
          content: "Búsqueda activa de métodos en internet, regalar pertenencias valiosas, despedidas inusuales de seres queridos o un descuido total de la higiene y apariencia personal."
        },
        {
          subtitle: "Estado Emocional",
          content: "Tristeza profunda persistente, ansiedad extrema, irritabilidad o, críticamente, una calma repentina tras un periodo de gran angustia, lo cual puede indicar que la persona ha tomado una decisión."
        }
      ]
    }
  },
  {
    title: "Factores de Riesgo",
    description: "Circunstancias que nos hacen más vulnerables. No son tu culpa.",
    icon: Info,
    items: ["Presión académica extrema", "Conflictos en el hogar", "Acoso escolar o cyberbullying", "Dificultades de identidad", "Eventos traumáticos"],
    details: {
      intro: "Los factores de riesgo son situaciones que aumentan la vulnerabilidad de una persona. Entenderlos ayuda a desestigmatizar el dolor.",
      blocks: [
        {
          subtitle: "Factores Individuales",
          content: "Trastornos de salud mental previos, intentos de autolesión anteriores, sentimientos de soledad crónica o dificultades con la identidad de género en entornos hostiles."
        },
        {
          subtitle: "Estresores Ambientales",
          content: "Acoso escolar persistente, presión académica desmedida, inestabilidad en el hogar o exposición a contenidos que idealizan conductas autolesivas en redes sociales."
        },
        {
          subtitle: "Barreras Sociales",
          content: "Dificultad para acceder a servicios de salud mental, estigma cultural sobre pedir ayuda o sentimientos de desconexión con la comunidad y el entorno escolar."
        }
      ]
    }
  },
  {
    title: "Cómo Actuar",
    description: "La valentía comienza al pedir ayuda. Nunca estás solo en esto.",
    icon: HandHelping,
    items: ["Busca un adulto de confianza", "Llama a líneas de crisis gratuitas", "Escribe tus sentimientos", "Acompaña sin juzgar", "Prioriza tu salud mental"],
    details: {
      intro: "Si sospechas que alguien está en riesgo, tu intervención puede ser el factor decisivo para salvar una vida. Aquí explicamos cómo proceder.",
      blocks: [
        {
          subtitle: "Pregunta Directamente",
          content: "No tengas miedo de preguntar: '¿Has pensado en quitarte la vida?'. Contrario al mito, preguntar no 'siembra la idea', sino que ofrece un alivio inmenso y abre un canal de comunicación seguro."
        },
        {
          subtitle: "Escucha Activa y Validación",
          content: "Permite que la persona se desahogue. Evita dar sermones o frases como 'tienes mucho por qué vivir'. Simplemente di: 'Siento mucho que te sientas así, estoy aquí para escucharte'."
        },
        {
          subtitle: "Acción Inmediata",
          content: "Si el riesgo es alto, no dejes sola a la persona. Aleja objetos peligrosos y ayuda a contactar con un servicio de emergencia profesional o acude al hospital más cercano."
        }
      ]
    }
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
              animate-reveal`
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
              <CardContent className="p-8 pt-0 flex flex-col h-full">
                <ul className="space-y-4 mb-8 flex-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 opacity-50 group-hover:opacity-100" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center text-primary font-bold text-sm cursor-pointer hover:underline gap-1 group/link w-fit">
                      Leer más <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                    <div className="bg-primary p-12 text-white">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                          <section.icon className="w-8 h-8 text-white" />
                        </div>
                        <DialogTitle className="text-4xl font-headline font-bold">{section.title}</DialogTitle>
                      </div>
                      <p className="text-xl font-medium opacity-90 leading-relaxed">
                        {section.details.intro}
                      </p>
                    </div>
                    <ScrollArea className="max-h-[60vh] p-12">
                      <div className="space-y-12">
                        {section.details.blocks.map((block, i) => (
                          <div key={i} className="space-y-4">
                            <h4 className="text-2xl font-bold text-foreground flex items-center gap-3">
                              <CheckCircle2 className="w-6 h-6 text-primary" />
                              {block.subtitle}
                            </h4>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              {block.content}
                            </p>
                          </div>
                        ))}
                        <div className="bg-secondary/50 p-8 rounded-3xl border border-primary/10">
                          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Recomendación profesional</p>
                          <p className="text-base text-muted-foreground italic">
                            Si te identificas con estas señales o conoces a alguien en esta situación, no esperes. Hablar es el primer paso hacia la recuperación.
                          </p>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
