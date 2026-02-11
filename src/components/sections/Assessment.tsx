"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle2, ChevronRight, RefreshCw, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const questions = [
  "¿Sientes una tristeza profunda o vacío que parece no irse?",
  "¿Has dejado de disfrutar actividades que antes amabas mucho?",
  "¿Sientes que el futuro no tiene nada bueno para ofrecerte?",
  "¿Has pensado que el mundo estaría mejor sin ti?",
  "¿Sientes que eres una carga pesada para tus seres queridos?",
  "¿Has notado cambios drásticos en tus ganas de comer o dormir?"
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
  const progress = (step / questions.length) * 100;

  return (
    <section id="test" className="py-32 bg-gradient-to-b from-white to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <Card className="overflow-hidden border-none shadow-[0_32px_128px_rgba(0,0,0,0.08)] bg-white rounded-[3rem] animate-reveal">
          {!showResult ? (
            <>
              <CardHeader className="bg-primary/5 pb-10 pt-12 px-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-[2rem] shadow-sm text-primary">
                    <BrainCircuit className="w-10 h-10" />
                  </div>
                </div>
                <CardTitle className="font-headline text-4xl mb-3">Escucha a tu Interior</CardTitle>
                <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
                   <Info className="w-4 h-4 text-primary" />
                   <p className="text-sm">Evaluación orientativa confidencial.</p>
                </div>
                
                <div className="mt-10 max-w-md mx-auto space-y-3">
                  <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
                    <span>Pregunta {step + 1} de {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2.5 bg-primary/10 overflow-hidden rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="py-20 px-10">
                <div className="space-y-12 transition-all duration-500">
                  <h3 className="text-3xl md:text-4xl font-headline font-bold text-center leading-tight max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
                    "{questions[step]}"
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                    <Button 
                      onClick={() => handleAnswer(true)}
                      size="lg" 
                      className="rounded-2xl h-16 flex-1 text-lg font-bold shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all duration-300"
                    >
                      Sí, lo siento
                    </Button>
                    <Button 
                      onClick={() => handleAnswer(false)}
                      variant="outline" 
                      size="lg" 
                      className="rounded-2xl h-16 flex-1 text-lg font-bold border-primary/20 hover:bg-secondary/5 transition-all duration-300"
                    >
                      No, ahora no
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="py-24 px-10 space-y-10 text-center animate-in zoom-in-95 duration-700">
              <div className="flex justify-center">
                <div className="bg-primary/20 p-8 rounded-[2.5rem] shadow-sm">
                  <CheckCircle2 className="w-20 h-20 text-primary" />
                </div>
              </div>
              <div className="space-y-6 max-w-2xl mx-auto">
                <h3 className="text-4xl md:text-5xl font-headline font-bold">Hemos terminado</h3>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  {positiveCount > 2 
                    ? "Gracias por tu honestidad. Tus respuestas sugieren que estás pasando por un momento muy difícil. No tienes que hacerlo solo."
                    : "Parece que estás manejando tus emociones, pero recuerda que siempre es válido buscar un hombro donde apoyarse si lo necesitas."}
                </p>
              </div>

              {positiveCount > 2 && (
                <Alert variant="destructive" className="text-left border-destructive/20 bg-destructive/5 p-8 rounded-[2rem] max-w-2xl mx-auto">
                  <AlertTitle className="font-bold text-lg mb-2 flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-ping" />
                    ¡Tu bienestar es prioridad!
                  </AlertTitle>
                  <AlertDescription className="text-base font-medium">
                    Por favor, considera hablar con un profesional o un adulto de confianza ahora mismo. Tu vida es increíblemente valiosa para nosotros y para el mundo.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                <Button onClick={reset} variant="ghost" className="rounded-2xl h-14 font-bold hover:bg-primary/5">
                  <RefreshCw className="w-5 h-5 mr-3" />
                  Repetir Evaluación
                </Button>
                <Button className="rounded-2xl shadow-2xl shadow-primary/20 h-14 px-10 font-bold bg-primary text-primary-foreground" asChild>
                  <a href="#recursos">
                    Ver Canales de Ayuda
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}
