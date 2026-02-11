
"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle2, ChevronRight, RefreshCw, Info, HeartHandshake, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const questions = [
  "¿Te has sentido tan solo o incomprendido que sientes que nadie puede ayudarte?",
  "¿Has deseado dormir y no despertar, o simplemente dejar de existir?",
  "¿Sientes que los problemas que tienes no tienen ninguna solución posible?",
  "¿Has pensado en algún plan o método para hacerte daño recientemente?",
  "¿Sientes que ya no disfrutas de absolutamente nada de lo que antes te gustaba?",
  "¿Te sientes atrapado en tus pensamientos y no encuentras una salida?"
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
    <section id="test" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-40 md:w-80 h-40 md:h-80 bg-primary/5 rounded-full blur-[60px] md:blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-40 md:w-80 h-40 md:h-80 bg-accent/20 rounded-full blur-[60px] md:blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <Card className="overflow-hidden border-none shadow-[0_64px_128px_rgba(0,0,0,0.08)] bg-white rounded-3xl md:rounded-[4rem] animate-fade-up">
          {!showResult ? (
            <div className="grid md:grid-cols-2">
              <div className="bg-primary/5 p-8 md:p-16 flex flex-col justify-between">
                <div>
                  <div className="bg-white w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl shadow-sm flex items-center justify-center text-primary mb-6 md:mb-8 animate-float">
                    <BrainCircuit className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4 md:mb-6 text-foreground leading-tight">
                    Tu Bienestar <br className="hidden md:block" />Importa
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed mb-8 md:mb-10">
                    Tómate un momento para reflexionar. Esta herramienta ayuda a identificar señales que merecen atención profesional.
                  </p>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-between text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    <span>Progreso del Test</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 md:h-3 bg-white rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-20 flex flex-col justify-center items-center text-center space-y-8 md:space-y-12">
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.3em]">Pregunta {step + 1}</p>
                  <h3 className="text-xl md:text-3xl font-headline font-bold leading-tight animate-scale-in">
                    "{questions[step]}"
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-sm">
                  <Button 
                    onClick={() => handleAnswer(true)}
                    size="lg" 
                    className="rounded-2xl md:rounded-[2rem] h-16 md:h-20 text-lg md:text-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all bg-primary text-white"
                  >
                    Sí
                  </Button>
                  <Button 
                    onClick={() => handleAnswer(false)}
                    variant="outline" 
                    size="lg" 
                    className="rounded-2xl md:rounded-[2rem] h-16 md:h-20 text-lg md:text-xl font-bold border-primary/20 hover:bg-secondary transition-all active:scale-95"
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <CardContent className="py-12 md:py-24 px-6 md:px-10 space-y-8 md:space-y-12 text-center animate-scale-in">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-inner animate-float">
                  <HeartHandshake className="w-16 h-16 md:w-24 md:h-24 text-primary" />
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-6xl font-headline font-bold text-foreground">Gracias por tu honestidad</h3>
                <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed">
                  {positiveCount > 2 
                    ? "Tus respuestas sugieren que estás pasando por un momento de alta vulnerabilidad emocional. Lo más importante ahora es que no intentes llevar esto solo."
                    : "Parece que tienes algunos desafíos, pero reconocerlos ya es un gran paso. Mantente alerta y busca apoyo si estos sentimientos aumentan."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center max-w-2xl mx-auto pt-4 md:pt-6">
                <Button onClick={reset} variant="ghost" className="rounded-xl md:rounded-2xl h-14 md:h-16 px-6 md:px-8 text-base md:text-lg font-bold hover:bg-primary/5 text-foreground">
                  <RefreshCw className="w-5 h-5 mr-3" />
                  Repetir Evaluación
                </Button>
                <Button className="rounded-xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-primary/30 h-14 md:h-16 px-8 md:px-12 text-base md:text-lg font-bold bg-primary text-white border-none transition-all hover:scale-105" asChild>
                  <Link href="#recursos">
                    Ver Ayuda Profesional
                    <ChevronRight className="w-6 h-6 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 md:mt-12 bg-secondary/30 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] max-w-2xl mx-auto border border-primary/10 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                <p className="text-xs md:text-sm text-muted-foreground italic">
                  <strong>Aviso Legal Importante:</strong> Esta herramienta es un cuestionario de cribado informativo, no sustituye una evaluación clínica, diagnóstico médico o tratamiento profesional. Si estás en peligro inmediato, llama al 911 o 717 003 717.
                </p>
              </div>

              {positiveCount > 2 && (
                <div className="mt-8 md:mt-12 animate-fade-up">
                  <Alert variant="destructive" className="text-left border-destructive/20 bg-destructive/5 p-6 md:p-10 rounded-2xl md:rounded-[3rem] max-w-3xl mx-auto border-2">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
                      <div className="w-12 h-12 bg-destructive rounded-2xl flex items-center justify-center shrink-0 animate-pulse">
                         <ShieldAlert className="w-7 h-7 text-white" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <AlertTitle className="font-bold text-xl md:text-2xl mb-1 text-destructive">Prioridad de Ayuda Humana</AlertTitle>
                        <AlertDescription className="text-base md:text-lg font-medium leading-relaxed opacity-80 text-foreground">
                          Recomendamos encarecidamente hablar con un profesional hoy mismo. Llama al 717 003 717. No estás solo.
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
