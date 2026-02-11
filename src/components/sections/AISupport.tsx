
"use client"

import React, { useState } from 'react';
import { aiResponderForResources } from '@/ai/flows/ai-responder-for-resources';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Loader2, User, Bot, HelpCircle } from 'lucide-react';

export function AISupport() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<null | { text: string; resource: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const result = await aiResponderForResources({ query });
      setResponse({
        text: result.response,
        resource: result.resourceSuggestion
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-support" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
            <Sparkles className="w-4 h-4" />
            Apoyo IA Inteligente
          </div>
          <h2 className="text-4xl font-headline font-bold">Conversa con nuestra IA Empática</h2>
          <p className="text-muted-foreground text-lg">
            Si no sabes por dónde empezar, cuéntanos cómo te sientes. 
            Nuestra IA está entrenada para escucharte y guiarte con amabilidad.
          </p>
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-secondary/5">
          <CardContent className="p-0">
            <div className="flex flex-col h-[600px]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!response && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                      <HelpCircle className="w-12 h-12 text-primary/40" />
                    </div>
                    <p>Escribe cualquier duda o sentimiento que quieras compartir.</p>
                  </div>
                )}

                {query && response && !isLoading && (
                  <>
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none max-w-[80%] flex gap-3">
                        <p className="text-sm">{query}</p>
                        <User className="w-4 h-4 shrink-0 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none max-w-[80%] border border-primary/10 shadow-sm space-y-4 flex gap-3">
                        <Bot className="w-4 h-4 shrink-0 mt-1 text-primary" />
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed whitespace-pre-line">{response.text}</p>
                          <div className="bg-primary/5 p-3 rounded-xl border border-primary/20">
                            <p className="text-xs font-bold text-primary mb-1 italic">Recurso Sugerido:</p>
                            <p className="text-xs">{response.resource}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isLoading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-primary/10 shadow-sm flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <p className="text-sm italic">Abrazos Digitales está pensando...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-primary/10">
                <div className="relative group">
                  <Textarea 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Escribe aquí cómo te sientes hoy..."
                    className="pr-14 min-h-[100px] border-primary/20 focus:border-primary focus:ring-primary/20 rounded-2xl resize-none"
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
                    className="absolute bottom-4 right-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-3 italic">
                  *Nota: La IA es una herramienta de apoyo, no sustituye a un profesional. Si estás en peligro, llama al 911.
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
