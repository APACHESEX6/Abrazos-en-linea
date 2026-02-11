
"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const questions = [
  "¿Te has sentido triste o vacío la mayor parte del día recientemente?",
  "¿Has perdido el interés en las cosas que antes disfrutabas mucho?",
  "¿Sientes que no tienes esperanza sobre el futuro?",
  "¿Has tenido pensamientos sobre lastimarte o sobre que el mundo estaría mejor sin ti?",
  "¿Sientes que eres una carga para los demás?",
  "¿Has tenido dificultades para dormir o dormir demasiado?"
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
    <section id="test" className="py-24 bg-secondary/10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <Card className="overflow-hidden border-none shadow-xl bg-white rounded-3xl">
          {!showResult ? (
            <>
              <CardHeader className="bg-primary/5 pb-8 pt-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-3xl">Auto-Evaluación de Bienestar</CardTitle>
                </div>
                <p className="text-muted-foreground italic">Este es un test orientativo, no sustituye un diagnóstico profesional.</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-medium text-primary">
                    <span>Progreso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-primary/10" />
                </div>
              </CardHeader>
              <CardContent className="py-12 px-8">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-2xl font-medium text-center leading-snug">
                    {questions[step]}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                    <Button 
                      onClick={() => handleAnswer(true)}
                      size="lg" 
                      className="rounded-full hover:scale-105 transition-transform"
                    >
                      Sí
                    </Button>
                    <Button 
                      onClick={() => handleAnswer(false)}
                      variant="outline" 
                      size="lg" 
                      className="rounded-full hover:scale-105 transition-transform"
                    >
                      No
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="py-16 px-8 space-y-8 text-center animate-in zoom-in duration-500">
              <div className="flex justify-center">
                <div className="bg-primary/20 p-6 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-headline font-bold">Evaluación Completada</h3>
                <p className="text-lg text-muted-foreground">
                  {positiveCount > 2 
                    ? "Hemos notado que estás pasando por un momento difícil. Es muy importante que hables con alguien ahora mismo."
                    : "Parece que estás manejando bien tus emociones, pero recuerda que siempre está bien pedir apoyo si lo necesitas."}
                </p>
              </div>

              {positiveCount > 2 && (
                <Alert variant="destructive" className="text-left border-destructive/50 bg-destructive/5">
                  <AlertTitle className="font-bold flex items-center gap-2">
                    ¡Te escuchamos!
                  </AlertTitle>
                  <AlertDescription>
                    No estás solo. Por favor, considera usar nuestra línea de recursos abajo o hablar con un profesional inmediatamente. Tu vida es importante para nosotros.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button onClick={reset} variant="ghost" className="rounded-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Repetir Test
                </Button>
                <Button className="rounded-full shadow-lg px-8" asChild>
                  <a href="#recursos">
                    Ver Recursos de Ayuda
                    <ChevronRight className="w-4 h-4 ml-2" />
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
