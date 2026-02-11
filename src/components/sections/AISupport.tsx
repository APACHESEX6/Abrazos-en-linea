
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { aiResponderForResources } from '@/ai/flows/ai-responder-for-resources';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Loader2, User, Bot, HelpCircle, Heart, MessageSquare, History, AlertCircle, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const SUGGESTIONS = [
  "Me siento muy solo hoy",
  "No tengo ganas de nada",
  "¿Cómo pido ayuda?",
  "Necesito respirar"
];

export function AISupport() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', text: string, resource?: string }>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery || query;
    if (!finalQuery.trim() || isLoading) return;

    setQuery('');
    setMessages(prev => [...prev, { type: 'user', text: finalQuery }]);
    
    setIsLoading(true);
    try {
      const result = await aiResponderForResources({ query: finalQuery });
      
      if (result.isCrisis) {
        setShowCrisisAlert(true);
      }

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: result.response,
        resource: result.resourceSuggestion
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "Lo siento, tuve un problema. Pero recuerda: no estás solo y siempre hay alguien para escucharte. Llama al 717 003 717." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-support" className="py-20 md:py-32 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {showCrisisAlert && (
          <div className="mb-8 md:mb-12 animate-fade-up">
            <Alert variant="destructive" className="bg-destructive text-white border-none rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
              <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-white" />
              <AlertTitle className="text-xl md:text-2xl font-bold ml-0 md:ml-4 mt-2 md:mt-0">Necesitas ayuda profesional inmediata</AlertTitle>
              <AlertDescription className="text-base md:text-lg ml-0 md:ml-4 mt-2 font-medium">
                Detectamos que podrías estar en riesgo. Por favor, llama ahora mismo a la Línea de la Esperanza: <span className="underline font-black">717 003 717</span> o al 911.
              </AlertDescription>
              <Button variant="outline" className="mt-4 md:mt-6 ml-0 md:ml-4 bg-white text-destructive border-none font-bold rounded-xl md:rounded-2xl" onClick={() => setShowCrisisAlert(false)}>
                Entendido
              </Button>
            </Alert>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-6 md:space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 md:px-6 md:py-2.5 rounded-full text-primary font-bold text-xs md:text-sm">
              <Sparkles className="w-4 h-4" />
              Soporte Inteligente
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
              Habla con <span className="text-gradient italic">Esperanza</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Un lugar seguro para empezar a hablar. Nuestra IA está diseñada bajo parámetros de empatía y validación emocional.
            </p>
            
            <div className="space-y-3 md:space-y-4 pt-4 md:pt-6">
              <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">Sugerencias rápidas:</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(null as any, s)}
                    className="bg-white border border-primary/10 px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold text-foreground/80 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/50 p-6 rounded-2xl md:rounded-[2.5rem] border border-white/20 backdrop-blur-sm hidden lg:block">
              <div className="flex items-center gap-4 mb-4 text-primary">
                <AlertCircle className="w-5 h-5" />
                <p className="font-bold">Límites de la IA</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Esta IA no sustituye a un terapeuta humano. Es una herramienta de primera escucha y orientación hacia recursos profesionales.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Card className="border-none shadow-2xl rounded-3xl md:rounded-[3.5rem] overflow-hidden glass-card animate-fade-up [animation-delay:200ms]">
              <CardContent className="p-0">
                <div className="flex flex-col h-[600px] md:h-[700px]">
                  <div className="p-6 md:p-8 bg-white/50 border-b border-primary/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Bot className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base md:text-lg">Asistente de Esperanza</h4>
                        <p className="text-[10px] text-green-500 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Activo ahora
                        </p>
                      </div>
                    </div>
                  </div>

                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-10 scroll-smooth">
                    {messages.length === 0 && !isLoading && (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 md:space-y-8 opacity-60">
                        <div className="p-8 md:p-10 bg-white rounded-3xl md:rounded-[3.5rem] shadow-sm border border-primary/5 animate-float">
                          <MessageSquare className="w-12 h-12 md:w-20 md:h-20 text-primary/30" />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                          <p className="font-bold text-xl md:text-2xl text-foreground">Tu espacio para ser tú</p>
                          <p className="text-muted-foreground text-base md:text-lg max-w-xs md:max-w-sm mx-auto">Todo lo que compartas aquí es anónimo y privado.</p>
                        </div>
                      </div>
                    )}

                    {messages.map((msg, i) => (
                      <div key={i} className={cn("flex animate-scale-in", msg.type === 'user' ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[90%] sm:max-w-[80%] p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-sm flex flex-col gap-3 md:gap-4 relative",
                          msg.type === 'user' 
                            ? "bg-primary text-white rounded-tr-none shadow-primary/10" 
                            : "bg-white text-foreground rounded-tl-none border border-primary/10"
                        )}>
                          <div className="flex gap-3 md:gap-4">
                            {msg.type === 'bot' && <Bot className="w-5 h-5 shrink-0 mt-1 text-primary" />}
                            <p className="text-sm md:text-lg leading-relaxed whitespace-pre-line font-medium">
                              {msg.text}
                            </p>
                            {msg.type === 'user' && <User className="w-5 h-5 shrink-0 mt-1 text-white/70" />}
                          </div>

                          {msg.resource && (
                            <div className="mt-2 md:mt-4 bg-primary/10 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-primary/20 shadow-inner group">
                              <p className="text-[10px] md:text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-widest mb-2">
                                <Heart className="w-3 h-3 md:w-3.5 md:h-3.5 fill-primary" /> Recurso Sugerido
                              </p>
                              <p className="text-xs md:text-sm font-bold leading-relaxed text-primary-foreground/90">{msg.resource}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] rounded-tl-none border border-primary/10 shadow-sm flex items-center gap-4 md:gap-6">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-bounce" />
                          </div>
                          <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest italic">Esperanza está escribiendo...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 md:p-10 bg-white/50 backdrop-blur-xl border-t border-primary/5">
                    <div className="relative group max-w-4xl mx-auto">
                      <Textarea 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Escribe cómo te sientes..."
                        className="pr-16 md:pr-20 min-h-[100px] md:min-h-[120px] border-primary/10 bg-secondary/20 focus:bg-white focus:border-primary focus:ring-primary/10 rounded-2xl md:rounded-[2.5rem] resize-none text-base md:text-lg p-5 md:p-8 transition-all duration-500 shadow-inner"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e as any);
                          }
                        }}
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        disabled={isLoading || !query.trim()}
                        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-white"
                      >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4 md:w-6 md:h-6" /> : <Send className="w-4 h-4 md:w-6 md:h-6" />}
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
