"use client"

import React, { useState, useRef, useEffect } from 'react';
import { aiResponderForResources } from '@/ai/flows/ai-responder-for-resources';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Loader2, User, Bot, HelpCircle, Heart, MessageSquare, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUGGESTIONS = [
  "Me siento muy solo hoy",
  "No tengo ganas de hacer nada",
  "¿Cómo puedo pedir ayuda?",
  "Necesito consejos de respiración"
];

export function AISupport() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: result.response,
        resource: result.resourceSuggestion
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "Lo siento, tuve un problema de conexión. Pero recuerda: no estás solo y siempre hay alguien para escucharte." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-support" className="py-32 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2.5 rounded-full text-primary font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              Soporte Inteligente
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
              Habla con <span className="text-gradient italic">Esperanza</span>
            </h2>
            <p className="text-muted-foreground text-xl font-medium leading-relaxed">
              Nuestra IA está entrenada para escucharte, validarte y guiarte hacia recursos útiles las 24 horas del día. Es un lugar seguro donde empezar.
            </p>
            
            <div className="space-y-4 pt-6">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">¿No sabes qué decir? Prueba con:</p>
              <div className="flex flex-wrap gap-3">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(null as any, s)}
                    className="bg-white border border-primary/10 px-4 py-2.5 rounded-2xl text-sm font-semibold text-foreground/80 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/50 p-6 rounded-[2.5rem] border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4 text-destructive">
                <History className="w-5 h-5" />
                <p className="font-bold">Privacidad Total</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tus conversaciones son privadas y no se guardan en tu perfil. Este es tu espacio de descarga personal.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Card className="border-none shadow-[0_48px_128px_-32px_rgba(168,121,255,0.15)] rounded-[3.5rem] overflow-hidden glass-card animate-fade-up [animation-delay:200ms]">
              <CardContent className="p-0">
                <div className="flex flex-col h-[700px]">
                  {/* Chat Header */}
                  <div className="p-8 bg-white/50 border-b border-primary/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Asistente de Esperanza</h4>
                        <p className="text-xs text-green-500 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Activo ahora
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth">
                    {messages.length === 0 && !isLoading && (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-8 opacity-60">
                        <div className="p-10 bg-white rounded-[3.5rem] shadow-sm border border-primary/5 animate-float">
                          <MessageSquare className="w-20 h-20 text-primary/30" />
                        </div>
                        <div className="space-y-3">
                          <p className="font-bold text-2xl text-foreground">Tu espacio para ser tú</p>
                          <p className="text-muted-foreground text-lg max-w-sm mx-auto">Comparte cómo te sientes o pide consejos para manejar este momento.</p>
                        </div>
                      </div>
                    )}

                    {messages.map((msg, i) => (
                      <div key={i} className={cn("flex animate-scale-in", msg.type === 'user' ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[85%] sm:max-w-[80%] p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-4 relative",
                          msg.type === 'user' 
                            ? "bg-primary text-white rounded-tr-none shadow-primary/10" 
                            : "bg-white text-foreground rounded-tl-none border border-primary/10"
                        )}>
                          <div className="flex gap-4">
                            {msg.type === 'bot' && <Bot className="w-6 h-6 shrink-0 mt-1 text-primary" />}
                            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line font-medium">
                              {msg.text}
                            </p>
                            {msg.type === 'user' && <User className="w-6 h-6 shrink-0 mt-1 text-white/70" />}
                          </div>

                          {msg.resource && (
                            <div className="mt-4 bg-primary/10 p-6 rounded-3xl border border-primary/20 shadow-inner group">
                              <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                                  <Heart className="w-3.5 h-3.5 fill-primary" /> Sugerencia de Apoyo
                                </p>
                              </div>
                              <p className="text-sm font-bold leading-relaxed text-primary-foreground/90">{msg.resource}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-white p-8 rounded-[2.5rem] rounded-tl-none border border-primary/10 shadow-sm flex items-center gap-6">
                          <div className="flex gap-1.5">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          </div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic">Esperanza está escribiendo...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-10 bg-white/50 backdrop-blur-xl border-t border-primary/5">
                    <div className="relative group max-w-4xl mx-auto">
                      <Textarea 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Comparte tus pensamientos..."
                        className="pr-20 min-h-[120px] border-primary/10 bg-secondary/20 focus:bg-white focus:border-primary focus:ring-primary/10 rounded-[2.5rem] resize-none text-lg p-8 transition-all duration-500 shadow-inner"
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
                        className="absolute bottom-8 right-8 w-14 h-14 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-white"
                      >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Send className="w-6 h-6" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto px-4">
                       <p className="text-[10px] text-muted-foreground font-bold italic">
                        * IA de apoyo emocional. No sustituye diagnóstico médico.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full animate-ping" />
                        <p className="text-[10px] font-black text-destructive tracking-widest uppercase">Peligro Inmediato: Llama al 911</p>
                      </div>
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