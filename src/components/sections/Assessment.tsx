"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle2, ChevronRight, RefreshCw, Info, HeartHandshake, ShieldAlert } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const questions = [
  "¿Sientes una tristeza profunda que parece no irse?",
  "¿Has perdido el interés por las cosas que antes te hacían feliz?",
  "¿Sientes que el futuro es incierto o sin esperanza?",
  "¿Has pensado en que estarías mejor si no estuvieras?",
  "¿Sientes que eres una carga para los demás?",
  "¿Te sientes agotado emocionalmente de forma constante?"
];

export function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (val: boolean) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const positiveCount = answers.filter(a => a).length;
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <section id="test" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <Card className="overflow-hidden border-none shadow-[0_64px_128px_rgba(0,0,0,0.08)] bg-white rounded-[4rem] animate-fade-up">
          {!showResult ? (
            <>
              <div className="grid md:grid-cols-2">
                <div className="bg-primary/5 p-12 md:p-16 flex flex-col justify-between">
                  <div>
                    <div className="bg-white w-16 h-16 rounded-3xl shadow-sm flex items-center justify-center text-primary mb-8 animate-float">
                      <BrainCircuit className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground leading-tight">
                      Tu Bienestar <br />Importa
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-10">
                      Tómate un momento para reflexionar sobre cómo te sientes. Esta evaluación es totalmente privada y solo sirve como guía.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-[0.2em]">
                      <span>Progreso del Test</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-12 md:p-20 flex flex-col justify-center items-center text-center space-y-12">
                  <div className="space-y-4">
                    <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">Pregunta {step + 1}</p>
                    <h3 className="text-3xl md:text-4xl font-headline font-bold leading-tight animate-scale-in">
                      "{questions[step]}"
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-sm">
                    <Button 
                      onClick={() => handleAnswer(true)}
                      size="lg" 
                      className="rounded-[2rem] h-20 text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all bg-primary text-white"
                    >
                      Sí
                    </Button>
                    <Button 
                      onClick={() => handleAnswer(false)}
                      variant="outline" 
                      size="lg" 
                      className="rounded-[2rem] h-20 text-xl font-bold border-primary/20 hover:bg-secondary transition-all active:scale-95"
                    >
                      No
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground/50 italic text-sm">
                    <Info className="w-4 h-4" />
                    Solo te tomará un minuto
                  </div>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="py-24 px-10 space-y-12 text-center animate-scale-in">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-10 rounded-[3rem] shadow-inner animate-float">
                  <HeartHandshake className="w-24 h-24 text-primary" />
                </div>
              </div>
              
              <div className="space-y-6 max-w-3xl mx-auto">
                <h3 className="text-5xl md:text-6xl font-headline font-bold">Gracias por confiar</h3>
                <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                  {positiveCount > 3 
                    ? "Tus respuestas indican que estás pasando por un momento de mucha carga emocional. Es valiente reconocerlo. El siguiente paso es hablarlo."
                    : "Parece que estás afrontando tus desafíos, pero recuerda que pedir apoyo siempre es una fortaleza, no una debilidad."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto pt-6">
                <Button onClick={reset} variant="ghost" className="rounded-2xl h-16 px-8 text-lg font-bold hover:bg-primary/5">
                  <RefreshCw className="w-5 h-5 mr-3" />
                  Repetir Evaluación
                </Button>
                <Button className="rounded-[2rem] shadow-2xl shadow-primary/30 h-16 px-12 text-lg font-bold bg-primary text-white border-none transition-all hover:scale-105" asChild>
                  <Link href="#recursos">
                    Ver Centros de Ayuda
                    <ChevronRight className="w-6 h-6 ml-2" />
                  </Link>
                </Button>
              </div>

              {positiveCount > 3 && (
                <div className="mt-12 animate-fade-up">
                  <Alert variant="destructive" className="text-left border-destructive/20 bg-destructive/5 p-10 rounded-[3rem] max-w-3xl mx-auto border-2">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-destructive rounded-2xl flex items-center justify-center shrink-0 animate-pulse">
                         <ShieldAlert className="w-7 h-7 text-white" />
                      </div>
                      <div className="space-y-3">
                        <AlertTitle className="font-bold text-2xl mb-1 text-destructive">¡Tu vida es importante!</AlertTitle>
                        <AlertDescription className="text-lg font-medium leading-relaxed opacity-80">
                          Por favor, considera hablar con un profesional hoy mismo. Tienes mucho por vivir y estamos aquí para ayudarte a encontrar el camino.
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}