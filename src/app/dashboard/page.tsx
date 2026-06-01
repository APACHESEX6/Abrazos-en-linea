"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loader2, Heart } from 'lucide-react';

export default function DashboardRedirect() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (profile?.rol === 'profesional') {
      router.replace('/dashboard/profesional');
    } else {
      router.replace('/dashboard/estudiante');
    }
  }, [user, profile, loading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <div className="bg-primary p-4 rounded-3xl shadow-lg shadow-primary/20 animate-pulse">
        <Heart className="w-8 h-8 text-white fill-white/20" />
      </div>
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <p className="text-muted-foreground font-medium">Cargando tu espacio...</p>
    </div>
  );
}
