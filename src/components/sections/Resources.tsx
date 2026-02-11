
"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Globe, MessageCircle, MapPin, LifeBuoy, Search, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const resources = [
  {
    title: "Teléfono de la Esperanza",
    type: "Internacional",
    contact: "717 003 717",
    link: "tel:717003717",
    description: "Servicio gratuito de escucha y orientación en situaciones de crisis emocional y prevención del suicidio.",
    icon: Phone,
    color: "bg-blue-50 text-blue-600",
    tags: ["españa", "crisis", "llamada"]
  },
  {
    title: "Fundación ANAR",
    type: "Ayuda a Niños y Adolescentes",
    contact: "900 20 20 10",
    link: "tel:900202010",
    description: "Ayuda psicológica, jurídica y social para menores en situaciones de riesgo en España.",
    icon: MessageCircle,
    color: "bg-green-50 text-green-600",
    tags: ["niños", "jóvenes", "violencia"]
  },
  {
    title: "Línea 024",
    type: "Nacional (España)",
    contact: "024",
    link: "tel:024",
    description: "Línea oficial del Ministerio de Sanidad de atención a la conducta suicida. Gratuita y 24/7.",
    icon: Phone,
    color: "bg-purple-50 text-purple-600",
    tags: ["gobierno", "salud", "suicidio"]
  },
  {
    title: "Papageno",
    type: "Asociación Prevención",
    contact: "papageno.es",
    link: "https://papageno.es",
    description: "Plataforma de profesionales dedicada a la prevención del suicidio y apoyo a supervivientes.",
    icon: Globe,
    color: "bg-amber-50 text-amber-600",
    tags: ["web", "profesionales", "educación"]
  },
  {
    title: "Localizador de Ayuda",
    type: "Herramienta",
    contact: "Ver Mapa Público",
    link: "https://www.sanidad.gob.es/organizacion/sns/planCalidadSNS/pdf/guia_centros_salud_mental.pdf",
    description: "Encuentra el centro de salud mental público más cercano a tu ubicación para atención médica.",
    icon: MapPin,
    color: "bg-rose-50 text-rose-600",
    tags: ["mapa", "presencial", "hospital"]
  },
  {
    title: "Chat de Crisis ANAR",
    type: "Digital",
    contact: "Chat Online",
    link: "https://www.anar.org/chat-anar/",
    description: "Servicio de chat anónimo y confidencial para jóvenes que prefieren escribir en lugar de hablar.",
    icon: MessageCircle,
    color: "bg-cyan-50 text-cyan-600",
    tags: ["chat", "texto", "anónimo"]
  }
];

export function Resources() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return resources;

    return resources.filter(res => 
      res.title.toLowerCase().includes(term) ||
      res.type.toLowerCase().includes(term) ||
      res.description.toLowerCase().includes(term) ||
      res.tags.some(tag => tag.includes(term))
    );
  }, [searchTerm]);

  return (
    <section id="recursos" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-secondary/20 rounded-3xl md:rounded-[4rem] p-6 md:p-24 relative overflow-hidden border border-primary/5">
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
            <div className="flex justify-center">
              <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] shadow-sm animate-bounce">
                <LifeBuoy className="w-10 h-10 md:w-14 md:h-14 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold text-foreground">Directorio de Ayuda</h2>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed">
              En <span className="text-primary font-bold">Abrazos en línea</span> creemos que siempre hay una salida. 
              Busca recursos gratuitos, profesionales y anónimos cerca de ti.
            </p>
            
            <div className="relative max-w-xl mx-auto mt-8 md:mt-12 group">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary w-5 h-5 md:w-6 md:h-6 transition-colors" />
              <Input 
                placeholder="Busca por país, chat, teléfono..."
                className="pl-12 md:pl-16 pr-12 md:pr-14 h-14 md:h-20 rounded-2xl md:rounded-[2.5rem] bg-white border-primary/10 text-base md:text-xl shadow-xl focus:ring-primary/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 relative z-10">
            {filteredResources.map((res, idx) => (
              <Card key={idx} className="border-none shadow-xl rounded-3xl bg-white hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-500 group overflow-hidden flex flex-col">
                <CardHeader className="p-6 md:p-10 pb-4">
                  <div className={`${res.color} w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl md:rounded-[1.8rem] mb-6 md:mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <res.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <CardTitle className="font-headline text-2xl md:text-3xl group-hover:text-primary transition-colors">{res.title}</CardTitle>
                    <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase opacity-60">{res.type}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6 md:p-10 pt-0 space-y-6 md:space-y-10 flex-1 flex flex-col">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed flex-1">{res.description}</p>
                  <div className="bg-secondary/50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center border border-primary/5 group-hover:bg-primary/5 transition-colors">
                    <p className="font-bold text-xl md:text-2xl text-foreground/80">{res.contact}</p>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl md:rounded-[1.5rem] h-14 md:h-16 border-primary/20 text-base md:text-xl font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all active:scale-95 shadow-sm" asChild>
                    <a href={res.link} target={res.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                      Conectar Ahora
                      <ExternalLink className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20 md:py-32 animate-fade-in space-y-6">
              <div className="bg-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground opacity-30" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-muted-foreground italic max-w-lg mx-auto leading-relaxed px-4">
                No encontramos resultados para "{searchTerm}". <br className="hidden md:block" />
                Prueba con palabras como "chat", "españa" o "teléfono".
              </p>
              <Button variant="ghost" className="text-primary font-bold" onClick={() => setSearchTerm("")}>
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
