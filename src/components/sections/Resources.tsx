"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Globe, MessageCircle, MapPin, LifeBuoy, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const resources = [
  {
    title: "Teléfono de la Esperanza",
    type: "Internacional",
    contact: "717 003 717",
    link: "tel:717003717",
    description: "Servicio gratuito de escucha y orientación en situaciones de crisis emocional.",
    icon: Phone,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Fundación ANAR",
    type: "Ayuda a Niños y Adolescentes",
    contact: "900 20 20 10",
    link: "tel:900202010",
    description: "Ayuda psicológica, jurídica y social para menores en situaciones de riesgo.",
    icon: MessageCircle,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Línea 024",
    type: "Nacional (España)",
    contact: "024",
    link: "tel:024",
    description: "Línea oficial de atención a la conducta suicida. Gratuita y disponible 24/7.",
    icon: Phone,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Papageno",
    type: "Asociación Prevención",
    contact: "papageno.es",
    link: "https://papageno.es",
    description: "Plataforma de profesionales dedicada a la prevención del suicidio.",
    icon: Globe,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Localizador de Ayuda",
    type: "Herramienta",
    contact: "Ver Mapa",
    link: "#",
    description: "Encuentra el centro de salud mental público más cercano a tu ubicación actual.",
    icon: MapPin,
    color: "bg-rose-50 text-rose-600"
  },
  {
    title: "Chat de Crisis",
    type: "Digital",
    contact: "Iniciar Chat",
    link: "#ai-support",
    description: "Utiliza nuestra IA o conecta con servicios de chat de texto para jóvenes.",
    icon: MessageCircle,
    color: "bg-cyan-50 text-cyan-600"
  }
];

export function Resources() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="recursos" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-secondary/20 rounded-[4rem] p-10 md:p-20 relative overflow-hidden border border-primary/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center mb-20 space-y-8">
            <div className="flex justify-center">
              <div className="bg-white p-5 rounded-[2rem] shadow-sm animate-bounce">
                <LifeBuoy className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline font-bold text-foreground">Directorio de Recursos</h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              No importa dónde estés, siempre hay una mano tendida. Todos estos servicios son gratuitos, profesionales y anónimos.
            </p>
            
            <div className="relative max-w-md mx-auto mt-10">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Busca por país o tipo de ayuda..."
                className="pl-14 h-16 rounded-[2rem] bg-white border-primary/10 text-lg shadow-sm focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {filteredResources.map((res, idx) => (
              <Card key={idx} className="border-none shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white hover:-translate-y-3 transition-all duration-500 group overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className={`${res.color} w-16 h-16 flex items-center justify-center rounded-[1.5rem] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <res.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{res.title}</CardTitle>
                    <p className="text-xs font-black text-primary tracking-widest uppercase opacity-60">{res.type}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                  <p className="text-base text-muted-foreground leading-relaxed min-h-[4.5rem]">{res.description}</p>
                  <div className="bg-secondary/50 p-6 rounded-3xl text-center border border-primary/5 group-hover:bg-primary/5 transition-colors">
                    <p className="font-bold text-xl text-foreground/80">{res.contact}</p>
                  </div>
                  <Button variant="outline" className="w-full rounded-2xl h-14 border-primary/20 text-lg font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all active:scale-95" asChild>
                    <a href={res.link} target={res.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                      Conectar Ahora
                      <ExternalLink className="w-5 h-5 ml-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-xl font-bold text-muted-foreground italic">No encontramos recursos con ese nombre, pero puedes probar buscando "España", "Teléfono" o "Digital".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}