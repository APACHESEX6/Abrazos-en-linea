"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login, firebaseReady } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Redirect based on role — profile loads after auth state change
      // We'll redirect to a neutral dashboard that checks role
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err?.code;
      if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password' || msg === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos.');
      } else if (msg === 'auth/too-many-requests') {
        setError('Demasiados intentos. Intenta más tarde.');
      } else {
        setError('Ocurrió un error. Verifica tu conexión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/40 via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-up">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 justify-center mb-8 group">
          <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all duration-500">
            <Heart className="w-6 h-6 text-white fill-white/20" />
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
              <div className="mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                <div>
                  <p className="font-bold mb-1">Firebase no está configurado</p>
                  <p className="text-amber-700">Agrega las credenciales de Firebase en el archivo <code className="bg-amber-100 px-1 rounded">.env</code> para activar el login.</p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-sm">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-2xl border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold text-sm">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 rounded-2xl border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-2xl text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link href="/registro" className="text-primary font-bold hover:underline">
                  Regístrate aquí
                </Link>
              </p>
              <Link href="/" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors block">
                ← Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
