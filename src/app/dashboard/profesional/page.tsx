"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart, LogOut, User, BookOpen, Users, BarChart2,
  Stethoscope, Building2, Mail, Loader2, FileText,
  ShieldCheck, Phone, Globe, ChevronRight, Brain
} from 'lucide-react';

const resources = [
  { title: "Guía de Evaluación del Riesgo Suicida", type: "Protocolo Clínico", icon: FileText, color: "bg-purple-50 text-purple-600", link: "https://www.who.int/publications/i/item/9789241564595" },
  { title: "Intervención en Crisis — OMS", type: "Guía Internacional", icon: Globe, color: "bg-blue-50 text-blue-600", link: "https://www.who.int/mental_health/mhgap/mhGAP_intervention_guide_02/en/" },
  { title: "Protocolo de Actuación ante Conducta Suicida", type: "Ministerio de Sanidad", icon: ShieldCheck, color: "bg-green-50 text-green-600", link: "https://www.sanidad.gob.es" },
  { title: "Recursos de Formación en Salud Mental Adolescente", type: "Formación Continua", icon: Brain, color: "bg-amber-50 text-amber-600", link: "https://papageno.es" },
];

export default function ProfesionalDashboard() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inicio' | 'recursos' | 'perfil'>('inicio');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    if (!loading && profile && profile.rol !== 'profesional') router.replace('/dashboard/estudiante');
  }, [user, profile, loading, router]);

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

  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: Heart },
    { id: 'recursos', label: 'Recursos Clínicos', icon: BookOpen },
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
              Dr(a). {profile?.nombre} 👋
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-xl text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-primary/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── INICIO ── */}
        {activeTab === 'inicio' && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
              <p className="text-primary-foreground/70 font-semibold text-sm uppercase tracking-widest mb-2">Panel del Profesional</p>
              <h1 className="text-3xl font-headline font-bold mb-1">
                Bienvenido, {profile?.nombre} {profile?.apellido}
              </h1>
              <p className="text-primary-foreground/80 font-medium">
                {profile?.especialidad && `${profile.especialidad} · `}{profile?.institucion}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { id: 'recursos', icon: BookOpen, title: 'Recursos Clínicos', desc: 'Guías y protocolos profesionales', color: 'bg-purple-50 text-purple-600' },
                { id: 'perfil', icon: User, title: 'Mi Perfil', desc: 'Ver tu información', color: 'bg-blue-50 text-blue-600' },
                { href: '/', icon: Globe, title: 'Plataforma Pública', desc: 'Ver la página principal', color: 'bg-green-50 text-green-600' },
              ].map((item, i) => (
                item.href ? (
                  <Link key={i} href={item.href} className="bg-white rounded-2xl p-5 text-left hover:-translate-y-1 transition-all shadow-sm border border-primary/5 hover:shadow-md group block">
                    <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </Link>
                ) : (
                  <button key={i} onClick={() => setActiveTab(item.id as any)} className="bg-white rounded-2xl p-5 text-left hover:-translate-y-1 transition-all shadow-sm border border-primary/5 hover:shadow-md group">
                    <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </button>
                )
              ))}
            </div>

            <Card className="border-none shadow-sm rounded-3xl">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="text-lg font-headline">Líneas de Crisis — Referencia Rápida</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Línea de la Esperanza', number: '717 003 717', href: 'tel:717003717' },
                  { label: 'Línea 024 (Suicidio)', number: '024', href: 'tel:024' },
                  { label: 'Emergencias', number: '911', href: 'tel:911' },
                ].map((line, i) => (
                  <a key={i} href={line.href} className="flex items-center gap-3 bg-secondary/30 p-4 rounded-2xl hover:bg-primary/5 transition-colors group">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">{line.label}</p>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{line.number}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── RECURSOS CLÍNICOS ── */}
        {activeTab === 'recursos' && (
          <div className="animate-fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-headline font-bold">Recursos Clínicos</h2>
              <p className="text-muted-foreground mt-1">Guías, protocolos y materiales de formación profesional.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {resources.map((r, i) => (
                <a key={i} href={r.link} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-3xl p-6 hover:-translate-y-1 transition-all shadow-sm border border-primary/5 hover:shadow-md group block"
                >
                  <div className={`${r.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <r.icon className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{r.type}</p>
                  <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{r.title}</h3>
                  <div className="flex items-center gap-1 mt-4 text-primary text-sm font-bold">
                    Acceder al recurso <ChevronRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── PERFIL ── */}
        {activeTab === 'perfil' && (
          <div className="max-w-2xl mx-auto animate-fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-headline font-bold">Mi Perfil Profesional</h2>
            </div>
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary to-primary/70 p-8 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-headline text-white">
                  {profile?.nombre} {profile?.apellido}
                </CardTitle>
                <p className="text-primary-foreground/70 font-medium">{profile?.email}</p>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                {[
                  { icon: Stethoscope, label: 'Especialidad', value: profile?.especialidad },
                  { icon: Building2, label: 'Institución', value: profile?.institucion },
                  { icon: Mail, label: 'Correo', value: profile?.email },
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
