
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, ShieldAlert, Phone, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

const navItems = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Información', href: '#info' },
  { name: 'Test', href: '#test' },
  { name: 'Historias', href: '#historias' },
  { name: 'IA Apoyo', href: '#ai-support' },
  { name: 'Recursos', href: '#recursos' },
];

function CrisisModalContent() {
  return (
    <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl bg-white">
      <DialogHeader>
        <DialogTitle className="text-3xl font-headline font-bold text-destructive flex items-center gap-3">
          <ShieldAlert className="w-8 h-8" />
          Ayuda Inmediata
        </DialogTitle>
        <DialogDescription className="text-lg font-medium leading-relaxed pt-2">
          Si tú o alguien que conoces está en peligro, por favor utiliza estos recursos gratuitos y confidenciales. No estás solo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-6">
        <div className="bg-destructive/10 p-6 rounded-3xl flex items-center justify-between group hover:bg-destructive/20 transition-colors">
          <div>
            <p className="text-sm font-bold text-destructive uppercase tracking-widest">Emergencias</p>
            <p className="text-3xl font-bold">911</p>
          </div>
          <Button size="icon" className="rounded-2xl bg-destructive hover:bg-destructive/90" asChild>
            <a href="tel:911"><Phone className="w-5 h-5" /></a>
          </Button>
        </div>
        <div className="bg-primary/10 p-6 rounded-3xl flex items-center justify-between group hover:bg-primary/20 transition-colors">
          <div>
            <p className="text-sm font-bold text-primary uppercase tracking-widest">Línea de la Esperanza</p>
            <p className="text-2xl font-bold">717 003 717</p>
          </div>
          <Button size="icon" className="rounded-2xl bg-primary hover:bg-primary/90" asChild>
            <a href="tel:717003717"><Phone className="w-5 h-5" /></a>
          </Button>
        </div>
      </div>
      <div className="text-center italic text-sm text-muted-foreground">
        * Disponible las 24 horas, todos los días del año.
      </div>
    </DialogContent>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, profile, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-700 px-4 md:px-8 py-4",
      scrolled ? "bg-white/80 backdrop-blur-2xl shadow-sm translate-y-0" : "bg-transparent py-6"
    )} aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all duration-500">
            <Heart className="w-6 h-6 text-white fill-white/20" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight text-foreground">
            Abrazos<span className="text-primary"> en línea</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-1 bg-secondary/30 p-1.5 rounded-2xl backdrop-blur-sm">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-sm font-semibold px-4 py-2 rounded-xl text-foreground/70 hover:text-primary hover:bg-white transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full px-5 border-primary/20 font-bold hover:bg-primary/5 hover:border-primary transition-all"
                asChild
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Mi Panel
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="rounded-full px-5 font-bold text-muted-foreground hover:text-destructive transition-all"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full px-5 border-primary/20 font-bold hover:bg-primary/5 hover:border-primary transition-all"
                asChild
              >
                <Link href="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Ingresar
                </Link>
              </Button>
              <Button
                className="rounded-full px-6 shadow-lg shadow-primary/20 font-bold hover:scale-105 active:scale-95 transition-all"
                asChild
              >
                <Link href="/registro">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrarse
                </Link>
              </Button>
            </div>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="rounded-full px-8 shadow-xl shadow-destructive/20 hover:shadow-primary/30 hover:bg-primary text-white border-none hover:scale-105 active:scale-95 transition-all duration-300 font-bold group"
              >
                <ShieldAlert className="w-4 h-4 mr-2" />
                Ayuda Urgente
              </Button>
            </DialogTrigger>
            <CrisisModalContent />
          </Dialog>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2 hover:bg-secondary rounded-2xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 bg-white/95 backdrop-blur-3xl border border-primary/10 p-8 flex flex-col gap-4 shadow-3xl md:hidden animate-in slide-in-from-top-4 duration-500 rounded-[2.5rem] mt-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-xl font-bold py-4 px-6 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-xl font-bold py-4 px-6 rounded-2xl bg-primary/5 text-primary"
              >
                <LayoutDashboard className="w-5 h-5" /> Mi Panel
              </Link>
              <button onClick={handleLogout}
                className="flex items-center gap-3 text-xl font-bold py-4 px-6 rounded-2xl text-destructive hover:bg-destructive/5 transition-all text-left"
              >
                <LogOut className="w-5 h-5" /> Cerrar sesión
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-2xl py-6 text-base font-bold border-primary/20">
                  <LogIn className="w-4 h-4 mr-2" /> Ingresar
                </Button>
              </Link>
              <Link href="/registro" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-2xl py-6 text-base font-bold shadow-lg shadow-primary/20">
                  <UserPlus className="w-4 h-4 mr-2" /> Registrarse
                </Button>
              </Link>
            </div>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-2 rounded-2xl py-8 text-xl font-bold bg-destructive shadow-lg shadow-destructive/20">
                <ShieldAlert className="w-6 h-6 mr-2" />
                Ayuda Urgente
              </Button>
            </DialogTrigger>
            <CrisisModalContent />
          </Dialog>
        </div>
      )}
    </nav>
  );
}
