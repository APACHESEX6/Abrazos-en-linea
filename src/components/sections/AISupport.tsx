"use client"

import React, { useState, useRef, useEffect } from 'react';
import { aiResponderForResources } from '@/ai/flows/ai-responder-for-resources';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Loader2, User, Bot, HelpCircle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    
    setIsLoading(true);
    try {
      const result = await aiResponderForResources({ query: userMsg });
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: result.response,
        resource: result.resourceSuggestion
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-support" className="py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4 animate-reveal">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2.5 rounded-full text-primary font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            Apoyo IA Inteligente
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold">Conversa con <span className="italic text-primary">Esperanza</span></h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
            A veces es más fácil escribir que hablar. Nuestra IA está aquí para escucharte sin juicios, las 24 horas del día.
          </p>
        </div>

        <Card className="border-none shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-secondary/10 backdrop-blur-sm animate-reveal">
          <CardContent className="p-0">
            <div className="flex flex-col h-[650px]">
              {/* Header area inside chat */}
              <div className="p-6 bg-white border-b border-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Asistente de Abrazos Digitales</h4>
                    <p className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> En línea ahora
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                   <div className="bg-primary/5 px-3 py-1.5 rounded-full text-[10px] font-bold text-primary">Empatía Activada</div>
                </div>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-gradient-to-b from-white/50 to-transparent">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                    <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-primary/5">
                      <HelpCircle className="w-16 h-16 text-primary/30" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-lg text-foreground">¿Cómo te sientes hoy?</p>
                      <p className="text-sm max-w-xs mx-auto">Escribe lo que pase por tu mente. Estoy aquí para acompañarte.</p>
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex animate-in fade-in slide-in-from-bottom-2 duration-500", msg.type === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] sm:max-w-[75%] p-6 rounded-[2rem] shadow-sm flex gap-4",
                      msg.type === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-white text-foreground rounded-tl-none border border-primary/5"
                    )}>
                      {msg.type === 'bot' && <Bot className="w-5 h-5 shrink-0 mt-1 text-primary" />}
                      <div className="space-y-4">
                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">{msg.text}</p>
                        {msg.resource && (
                          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 shadow-inner">
                            <p className="text-[10px] font-bold text-primary mb-2 flex items-center gap-1 uppercase tracking-wider">
                              <Heart className="w-3 h-3 fill-primary" /> Recurso de Apoyo:
                            </p>
                            <p className="text-xs font-semibold leading-relaxed">{msg.resource}</p>
                          </div>
                        )}
                      </div>
                      {msg.type === 'user' && <User className="w-5 h-5 shrink-0 mt-1" />}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start animate-in fade-in duration-300">
                    <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-primary/5 shadow-sm flex items-center gap-4">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic">Abrazos Digitales está pensando...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-8 bg-white/80 backdrop-blur-md border-t border-primary/5">
                <div className="relative group max-w-4xl mx-auto">
                  <Textarea 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Escribe aquí tus pensamientos o cómo te sientes..."
                    className="pr-16 min-h-[100px] border-primary/10 bg-secondary/5 focus:bg-white focus:border-primary focus:ring-primary/10 rounded-[2rem] resize-none text-base p-6 transition-all duration-300 shadow-inner"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !query.trim()}
                    className="absolute bottom-6 right-6 w-12 h-12 rounded-2xl shadow-xl shadow-primary/30 hover:scale-110 transition-transform bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                   <p className="text-[10px] text-muted-foreground font-bold italic text-center">
                    *Esta IA es una herramienta de apoyo, no sustituye la ayuda profesional.
                  </p>
                  <div className="h-px bg-primary/10 flex-1" />
                  <p className="text-[10px] font-bold text-destructive animate-pulse">SI ESTÁS EN PELIGRO, LLAMA AL 911</p>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
