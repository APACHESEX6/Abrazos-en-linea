"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Loader2, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { login, firebaseReady } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (attempts >= 5) {
      setError('Demasiados intentos fallidos. Espera unos minutos antes de intentarlo de nuevo.');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.push('/dashboard');
    } catch (err: any) {
      setAttempts(prev => prev + 1);
      const code = err?.code;
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos.');
      } else if (code === 'auth/too-many-requests') {
        setError('Demasiados intentos. Tu cuenta ha sido bloqueada temporalmente.');
      } else if (code === 'auth/user-disabled') {
        setError('Esta cuenta ha sido deshabilitada. Contacta al soporte.');
      } else {
        setError('Ocurrió un error inesperado. Verifica tu conexión e intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/40 via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-up">
        <Link href="/" className="flex items-center gap-3 justify-center mb-8 group" aria-label="Volver al inicio">
          <div className="w-10 h-10 relative group-hover:scale-110 transition-transform duration-300">
            <Image src="/logo.png" alt="Logo Abrazos en línea" fill className="object-contain" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight text-foreground">
            Abrazos<span className="text-primary"> en línea</span>
          </span>
        </Link>

        <Card className="border-none shadow-[0_32px_64px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden">
          <CardHeader className="bg-primary/5 p-8 pb-6">
            <CardTitle className="text-3xl font-headline font-bold">Bienvenido de vuelta</CardTitle>
            <CardDescription className="text-base font-medium mt-1">
              Ingresa a tu espacio seguro
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-6">
            {!firebaseReady && (
              <div className="mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl text-sm font-medium" role="alert">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" aria-hidden="true" />
                <div>
                  <p className="font-bold mb-1">Firebase no está configurado</p>
                  <p className="text-amber-700">Agrega las credenciales en <code className="bg-amber-100 px-1 rounded">.env</code> para activar el login.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-sm">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-2xl border-primary/20 focus:border-primary focus-visible:ring-primary/20"
                    autoComplete="email"
                    required
                    aria-describedby={error ? 'login-error' : undefined}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold text-sm">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 h-12 rounded-2xl border-primary/20 focus:border-primary focus-visible:ring-primary/20"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" aria-hidden="true" />
                      : <Eye className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {error && (
                <div id="login-error" role="alert" className="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-2xl text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !firebaseReady}
                className="w-full h-12 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-busy={loading}
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />}
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link href="/registro" className="text-primary font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                  Regístrate aquí
                </Link>
              </p>
              <Link href="/" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors block">
                ← Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground/50 mt-6 px-4">
          Si estás en crisis, llama al{' '}
          <a href="tel:717003717" className="text-primary font-bold hover:underline">717 003 717</a>
          {' '}o al{' '}
          <a href="tel:024" className="text-primary font-bold hover:underline">024</a>
        </p>
      </div>
    </div>
  );
}
