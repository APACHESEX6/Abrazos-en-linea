"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart, LogOut, User, BookOpen, Brain, Shield,
  ChevronRight, GraduationCap, Calendar, Pill, Stethoscope,
  CheckCircle2, RefreshCw, AlertTriangle, ShieldAlert, Loader2,
  BookMarked, Lightbulb, Wind, Smile, ArrowRight
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

// ─── TEST EMOCIONAL ────────────────────────────────────────────────────────────
const emotionalQuestions = [
  "¿Te has sentido tan solo o incomprendido que sientes que nadie puede ayudarte?",
  "¿Has deseado dormir y no despertar, o simplemente dejar de existir?",
  "¿Sientes que los problemas que tienes no tienen ninguna solución posible?",
  "¿Has pensado en algún plan o método para hacerte daño recientemente?",
  "¿Sientes que ya no disfrutas de absolutamente nada de lo que antes te gustaba?",
  "¿Te sientes atrapado en tus pensamientos y no encuentras una salida?",
  "¿Has tenido pensamientos de que sería mejor no estar aquí?",
  "¿Sientes que eres una carga para las personas que te rodean?",
];

// ─── TEST DE AFRONTAMIENTO ─────────────────────────────────────────────────────
const copingQuestions = [
  { q: "Cuando tengo un problema, busco hablar con alguien de confianza.", positive: true },
  { q: "Cuando me siento mal, tiendo a aislarme y no pedir ayuda.", positive: false },
  { q: "Practico alguna actividad que me ayuda a relajarme (deporte, música, arte).", positive: true },
  { q: "Cuando algo me preocupa, intento pensar en soluciones paso a paso.", positive: true },
  { q: "Suelo guardarme los problemas para mí mismo sin contárselos a nadie.", positive: false },
  { q: "Cuando me siento abrumado, busco distraerme con actividades positivas.", positive: true },
  { q: "Creo que pedir ayuda es señal de debilidad.", positive: false },
  { q: "Soy capaz de identificar cuando necesito apoyo profesional.", positive: true },
];

// ─── LECTURAS PSICOEDUCATIVAS ──────────────────────────────────────────────────
const readings = [
  {
    id: 1,
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
    title: "¿Qué es la salud mental?",
    tag: "Fundamentos",
    time: "5 min",
    content: `La salud mental es mucho más que la ausencia de enfermedades. Es un estado de bienestar en el que una persona puede desarrollar sus capacidades, afrontar el estrés normal de la vida, trabajar de forma productiva y contribuir a su comunidad.

**¿Por qué importa en la adolescencia?**
La adolescencia es una etapa de grandes cambios físicos, emocionales y sociales. El cerebro sigue desarrollándose hasta los 25 años, lo que hace que los jóvenes sean especialmente sensibles a las experiencias emocionales.

**Señales de buena salud mental:**
• Capacidad para manejar emociones difíciles
• Relaciones saludables con familia y amigos
• Sentido de propósito y motivación
• Resiliencia ante los problemas

**Recuerda:** Cuidar tu salud mental es tan importante como cuidar tu salud física. No hay vergüenza en buscar ayuda.`,
  },
  {
    id: 2,
    icon: Shield,
    color: "bg-blue-50 text-blue-600",
    title: "Entendiendo la ideación suicida",
    tag: "Prevención",
    time: "7 min",
    content: `La ideación suicida se refiere a pensamientos sobre quitarse la vida. Es importante entender que tener estos pensamientos no significa que vayas a actuar sobre ellos, pero sí es una señal de que necesitas apoyo.

**Tipos de pensamientos:**
• Pasivos: "Desearía no estar aquí" o "Sería mejor si no existiera"
• Activos: Pensar en métodos o hacer planes concretos

**¿Por qué ocurre?**
Generalmente surge cuando el dolor emocional supera los recursos de afrontamiento disponibles. No es una señal de debilidad, sino de que necesitas más apoyo del que tienes ahora.

**Factores de riesgo comunes:**
• Depresión o ansiedad no tratada
• Aislamiento social
• Experiencias traumáticas
• Sentimientos de desesperanza

**Lo más importante:** Si tienes estos pensamientos, habla con alguien de confianza o llama al 717 003 717. No estás solo.`,
  },
  {
    id: 3,
    icon: Wind,
    color: "bg-green-50 text-green-600",
    title: "Técnicas de regulación emocional",
    tag: "Herramientas",
    time: "6 min",
    content: `La regulación emocional es la capacidad de manejar y responder a tus emociones de manera saludable. Aquí tienes técnicas que puedes practicar hoy mismo:

**Respiración 4-7-8:**
1. Inhala por la nariz durante 4 segundos
2. Mantén el aire durante 7 segundos
3. Exhala lentamente por la boca durante 8 segundos
4. Repite 3-4 veces

**Técnica 5-4-3-2-1 (Grounding):**
Nombra 5 cosas que puedes ver, 4 que puedes tocar, 3 que puedes escuchar, 2 que puedes oler, 1 que puedes saborear.

**Diario emocional:**
Escribe cada día cómo te sientes y qué lo provocó. Esto ayuda a identificar patrones y desencadenantes.

**Movimiento físico:**
El ejercicio libera endorfinas que mejoran el estado de ánimo. Incluso una caminata de 10 minutos puede marcar la diferencia.`,
  },
  {
    id: 4,
    icon: Smile,
    color: "bg-amber-50 text-amber-600",
    title: "Construyendo resiliencia",
    tag: "Crecimiento",
    time: "5 min",
    content: `La resiliencia es la capacidad de adaptarse y recuperarse ante las adversidades. No es algo con lo que se nace, se desarrolla con práctica.

**Pilares de la resiliencia:**

**1. Conexiones significativas**
Mantener relaciones cercanas con familia, amigos o mentores. No tienes que enfrentar los problemas solo.

**2. Autoconocimiento**
Conocer tus fortalezas y limitaciones. Saber qué te recarga energía y qué te la quita.

**3. Propósito**
Tener metas, aunque sean pequeñas. El sentido de dirección ayuda a superar los momentos difíciles.

**4. Autocuidado**
Dormir bien, comer de forma nutritiva, hacer ejercicio y dedicar tiempo a actividades que disfrutes.

**5. Pedir ayuda**
Reconocer cuándo necesitas apoyo y buscarlo activamente es una fortaleza, no una debilidad.

Recuerda: cada vez que superas un momento difícil, tu resiliencia crece.`,
  },
];

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function EstudianteDashboard() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inicio' | 'test-emocional' | 'test-afrontamiento' | 'lecturas' | 'perfil'>('inicio');

  // Test emocional state
  const [emoStep, setEmoStep] = useState(0);
  const [emoAnswers, setEmoAnswers] = useState<boolean[]>([]);
  const [emoResult, setEmoResult] = useState(false);

  // Test afrontamiento state
  const [copeStep, setCopStep] = useState(0);
  const [copeAnswers, setCopAnswers] = useState<boolean[]>([]);
  const [copeResult, setCopResult] = useState(false);

  // Lectura activa
  const [activeReading, setActiveReading] = useState<typeof readings[0] | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ── Test emocional handlers ──
  const handleEmoAnswer = (val: boolean) => {
    const next = [...emoAnswers, val];
    setEmoAnswers(next);
    if (emoStep < emotionalQuestions.length - 1) setEmoStep(emoStep + 1);
    else setEmoResult(true);
  };
  const resetEmo = () => { setEmoStep(0); setEmoAnswers([]); setEmoResult(false); };
  const emoPositive = emoAnswers.filter(Boolean).length;

  // ── Test afrontamiento handlers ──
  const handleCopAnswer = (val: boolean) => {
    const next = [...copeAnswers, val];
    setCopAnswers(next);
    if (copeStep < copingQuestions.length - 1) setCopStep(copeStep + 1);
    else setCopResult(true);
  };
  const resetCop = () => { setCopStep(0); setCopAnswers([]); setCopResult(false); };
  const copScore = copeAnswers.reduce((acc, ans, i) => {
    const q = copingQuestions[i];
    if (!q) return acc;
    return acc + ((q.positive && ans) || (!q.positive && !ans) ? 1 : 0);
  }, 0);

  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: Heart },
    { id: 'test-emocional', label: 'Test Emocional', icon: Brain },
    { id: 'test-afrontamiento', label: 'Afrontamiento', icon: Shield },
    { id: 'lecturas', label: 'Lecturas', icon: BookOpen },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl shadow-md shadow-primary/20 group-hover:rotate-12 transition-all">
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </div>
            <span className="font-headline font-bold text-lg hidden sm:block">
              Abrazos<span className="text-primary"> en línea</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground hidden sm:block">
              Hola, {profile?.nombre} 👋
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-xl text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <nav aria-label="Navegación del panel" className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-primary/10'
              }`}
            >
              <tab.icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── INICIO ── */}
        {activeTab === 'inicio' && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
              <p className="text-primary-foreground/70 font-semibold text-sm uppercase tracking-widest mb-2">Panel del Estudiante</p>
              <h1 className="text-3xl font-headline font-bold mb-1">
                Hola, {profile?.nombre} {profile?.apellido} 👋
              </h1>
              <p className="text-primary-foreground/80 font-medium">
                {profile?.grado && `${profile.grado} · `}Este es tu espacio seguro.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'test-emocional', icon: Brain, title: 'Test Emocional', desc: '8 preguntas sobre tu bienestar', color: 'bg-purple-50 text-purple-600' },
                { id: 'test-afrontamiento', icon: Shield, title: 'Test de Afrontamiento', desc: 'Evalúa tus estrategias', color: 'bg-blue-50 text-blue-600' },
                { id: 'lecturas', icon: BookOpen, title: 'Lecturas', desc: '4 artículos psicoeducativos', color: 'bg-green-50 text-green-600' },
                { id: 'perfil', icon: User, title: 'Mi Perfil', desc: 'Ver tu información', color: 'bg-amber-50 text-amber-600' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className="bg-white rounded-2xl p-5 text-left hover:-translate-y-1 transition-all shadow-sm border border-primary/5 hover:shadow-md group"
                >
                  <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-primary/5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-destructive/10 p-2 rounded-xl">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-bold text-lg">¿Necesitas ayuda ahora?</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">Si estás en crisis o tienes pensamientos de hacerte daño, no estás solo. Hay personas disponibles ahora mismo.</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:717003717" className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
                  📞 717 003 717
                </a>
                <a href="tel:024" className="bg-secondary text-foreground px-4 py-2 rounded-xl font-bold text-sm hover:bg-secondary/80 transition-colors">
                  📞 Línea 024
                </a>
                <a href="tel:911" className="bg-destructive/10 text-destructive px-4 py-2 rounded-xl font-bold text-sm hover:bg-destructive/20 transition-colors">
                  🚨 911 Emergencias
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── TEST EMOCIONAL ── */}
        {activeTab === 'test-emocional' && (
          <div className="max-w-2xl mx-auto animate-fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-headline font-bold">Test Emocional</h2>
              <p className="text-muted-foreground mt-1">Responde con honestidad. Tus respuestas son privadas.</p>
            </div>
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              {!emoResult ? (
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
                      <span>Pregunta {emoStep + 1} de {emotionalQuestions.length}</span>
                      <span>{Math.round(((emoStep + 1) / emotionalQuestions.length) * 100)}%</span>
                    </div>
                    <Progress value={((emoStep + 1) / emotionalQuestions.length) * 100} className="h-2" />
                  </div>
                  <p className="text-xl font-headline font-bold leading-snug text-center py-4">
                    "{emotionalQuestions[emoStep]}"
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => handleEmoAnswer(true)} size="lg" className="h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">Sí</Button>
                    <Button onClick={() => handleEmoAnswer(false)} variant="outline" size="lg" className="h-16 rounded-2xl text-lg font-bold border-primary/20">No</Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-8 space-y-6 text-center">
                  <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-2">Gracias por tu honestidad</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {emoPositive >= 4
                        ? "Tus respuestas indican que estás pasando por un momento de alta vulnerabilidad emocional. Es muy importante que hables con un profesional pronto."
                        : emoPositive >= 2
                        ? "Tienes algunos desafíos emocionales. Considera hablar con alguien de confianza o un profesional."
                        : "Parece que tu estado emocional es relativamente estable. Sigue cuidándote."}
                    </p>
                  </div>
                  {emoPositive >= 4 && (
                    <Alert variant="destructive" className="text-left rounded-2xl">
                      <ShieldAlert className="w-5 h-5" />
                      <AlertTitle>Busca apoyo profesional</AlertTitle>
                      <AlertDescription>
                        Llama ahora al <strong>717 003 717</strong> o al <strong>024</strong>. No tienes que enfrentar esto solo.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="flex gap-3 justify-center">
                    <Button onClick={resetEmo} variant="outline" className="rounded-2xl">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Repetir
                    </Button>
                    <Button onClick={() => setActiveTab('lecturas')} className="rounded-2xl">
                      Ver Lecturas
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    ⚠️ Este test es orientativo y no reemplaza una evaluación clínica profesional.
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {/* ── TEST DE AFRONTAMIENTO ── */}
        {activeTab === 'test-afrontamiento' && (
          <div className="max-w-2xl mx-auto animate-fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-headline font-bold">Test de Afrontamiento</h2>
              <p className="text-muted-foreground mt-1">Evalúa cómo manejas las situaciones difíciles.</p>
            </div>
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              {!copeResult ? (
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
                      <span>Pregunta {copeStep + 1} de {copingQuestions.length}</span>
                      <span>{Math.round(((copeStep + 1) / copingQuestions.length) * 100)}%</span>
                    </div>
                    <Progress value={((copeStep + 1) / copingQuestions.length) * 100} className="h-2" />
                  </div>
                  <p className="text-xl font-headline font-bold leading-snug text-center py-4">
                    "{copingQuestions[copeStep]?.q}"
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => handleCopAnswer(true)} size="lg" className="h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">Sí</Button>
                    <Button onClick={() => handleCopAnswer(false)} variant="outline" size="lg" className="h-16 rounded-2xl text-lg font-bold border-primary/20">No</Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-8 space-y-6 text-center">
                  <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-1">
                      Puntuación: {copScore}/{copingQuestions.length}
                    </h3>
                    <div className="my-4">
                      <Progress value={(copScore / copingQuestions.length) * 100} className="h-3 rounded-full" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {copScore >= 6
                        ? "¡Excelente! Tienes estrategias de afrontamiento muy saludables. Sigue así y comparte lo que sabes con otros."
                        : copScore >= 4
                        ? "Tienes algunas estrategias positivas, pero hay áreas donde puedes mejorar. Las lecturas psicoeducativas pueden ayudarte."
                        : "Parece que necesitas desarrollar más herramientas de afrontamiento. Te recomendamos leer nuestros artículos y considerar apoyo profesional."}
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-2xl p-4 text-left space-y-2">
                    <p className="font-bold text-sm">Áreas a fortalecer:</p>
                    {copingQuestions.map((q, i) => {
                      const answered = copeAnswers[i];
                      const correct = (q.positive && answered) || (!q.positive && !answered);
                      if (!correct) return (
                        <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          {q.q}
                        </p>
                      );
                      return null;
                    })}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={resetCop} variant="outline" className="rounded-2xl">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Repetir
                    </Button>
                    <Button onClick={() => setActiveTab('lecturas')} className="rounded-2xl">
                      Ver Lecturas
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {/* ── LECTURAS ── */}
        {activeTab === 'lecturas' && (
          <div className="animate-fade-up">
            {!activeReading ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-headline font-bold">Lecturas Psicoeducativas</h2>
                  <p className="text-muted-foreground mt-1">Aprende sobre salud mental e ideación suicida.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {readings.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setActiveReading(r)}
                      className="bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-sm border border-primary/5 hover:shadow-md group"
                    >
                      <div className={`${r.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <r.icon className="w-7 h-7" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{r.tag}</span>
                        <span className="text-xs text-muted-foreground">· {r.time} de lectura</span>
                      </div>
                      <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{r.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.content.split('\n')[0]}</p>
                      <div className="flex items-center gap-1 mt-4 text-primary text-sm font-bold">
                        Leer artículo <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={() => setActiveReading(null)}
                  className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  ← Volver a lecturas
                </button>
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-primary/5 p-8">
                    <div className={`${activeReading.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                      <activeReading.icon className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{activeReading.tag}</span>
                      <span className="text-xs text-muted-foreground">· {activeReading.time} de lectura</span>
                    </div>
                    <CardTitle className="text-2xl font-headline">{activeReading.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed space-y-3">
                      {activeReading.content.split('\n').map((line, i) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={i} className="font-bold text-foreground">{line.replace(/\*\*/g, '')}</p>;
                        }
                        if (line.startsWith('•')) {
                          return <p key={i} className="pl-4 text-muted-foreground">{line}</p>;
                        }
                        if (line.trim() === '') return <br key={i} />;
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                    <div className="mt-8 bg-primary/5 rounded-2xl p-4 flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Si este artículo resonó contigo, considera hablar con un profesional de salud mental para profundizar en estos temas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* ── PERFIL ── */}
        {activeTab === 'perfil' && (
          <div className="max-w-2xl mx-auto animate-fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-headline font-bold">Mi Perfil</h2>
              <p className="text-muted-foreground mt-1">Tu información personal y de salud.</p>
            </div>
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary to-primary/70 p-8 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-headline text-white">
                  {profile?.nombre} {profile?.apellido}
                </CardTitle>
                <p className="text-primary-foreground/70 font-medium">{profile?.email}</p>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                {[
                  { icon: GraduationCap, label: 'Grado', value: profile?.grado },
                  { icon: Calendar, label: 'Edad', value: profile?.edad ? `${profile.edad} años` : undefined },
                  { icon: Calendar, label: 'Fecha de nacimiento', value: profile?.fechaNacimiento },
                  { icon: Stethoscope, label: 'Diagnóstico / Condición', value: profile?.diagnostico || 'No especificado' },
                  { icon: Pill, label: 'Medicamentos actuales', value: profile?.medicamentos || 'No especificado' },
                ].map((item, i) => item.value && (
                  <div key={i} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="font-semibold text-foreground mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-primary/10">
                  <p className="text-xs text-muted-foreground text-center italic">
                    🔒 Tu información es completamente confidencial y está protegida.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
