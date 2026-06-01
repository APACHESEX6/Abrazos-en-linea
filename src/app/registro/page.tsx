"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Loader2, AlertCircle, GraduationCap, Stethoscope, ChevronRight, ChevronLeft } from 'lucide-react';

const GRADOS = [
  '6° Primaria', '1° Secundaria', '2° Secundaria', '3° Secundaria',
  '4° Secundaria', '5° Secundaria', '6° Secundaria',
  '1° Bachillerato', '2° Bachillerato', 'Universidad - 1er año',
  'Universidad - 2do año', 'Universidad - 3er año', 'Universidad - 4to año',
  'Universidad - 5to año', 'Otro',
];

export default function RegistroPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Campos comunes
  const [rol, setRol] = useState<UserRole>('estudiante');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Campos del estudiante
  const [grado, setGrado] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [medicamentos, setMedicamentos] = useState('');

  // Campos del profesional
  const [especialidad, setEspecialidad] = useState('');
  const [institucion, setInstitucion] = useState('');

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const profileData =
        rol === 'estudiante'
          ? {
              nombre,
              apellido,
              rol,
              grado,
              edad: parseInt(edad),
              fechaNacimiento,
              diagnostico,
              medicamentos,
            }
          : {
              nombre,
              apellido,
              rol,
              especialidad,
              institucion,
            };

      await register(email, password, profileData);
      router.push('/dashboard');
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Intenta iniciar sesión.');
      } else if (code === 'auth/invalid-email') {
        setError('El correo electrónico no es válido.');
      } else {
        setError('Error al crear la cuenta. Verifica tu conexión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/40 via-background to-accent/20 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg animate-fade-up">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 justify-center mb-8 group">
          <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all duration-500">
            <Heart className="w-6 h-6 text-white fill-white/20" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight text-foreground">
            Abrazos<span className="text-primary"> en línea</span>
          </span>
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary' : 'bg-primary/20'}`} />
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary' : 'bg-primary/20'}`} />
        </div>

        <Card className="border-none shadow-[0_32px_64px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden">
          <CardHeader className="bg-primary/5 p-8 pb-6">
            <CardTitle className="text-3xl font-headline font-bold">
              {step === 1 ? 'Crear cuenta' : 'Tu perfil'}
            </CardTitle>
            <CardDescription className="text-base font-medium mt-1">
              {step === 1
                ? 'Paso 1 de 2 — Datos de acceso'
                : `Paso 2 de 2 — Información ${rol === 'estudiante' ? 'del estudiante' : 'del profesional'}`}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-6">
            {/* PASO 1 */}
            {step === 1 && (
              <form onSubmit={handleStep1} className="space-y-5">
                {/* Rol */}
                <div className="space-y-3">
                  <Label className="font-semibold text-sm">Soy...</Label>
                  <RadioGroup
                    value={rol}
                    onValueChange={(v) => setRol(v as UserRole)}
                    className="grid grid-cols-2 gap-3"
                  >
                    <Label
                      htmlFor="rol-estudiante"
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        rol === 'estudiante'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <RadioGroupItem value="estudiante" id="rol-estudiante" className="sr-only" />
                      <GraduationCap className={`w-7 h-7 ${rol === 'estudiante' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-bold text-sm">Estudiante</span>
                    </Label>
                    <Label
                      htmlFor="rol-profesional"
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        rol === 'profesional'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <RadioGroupItem value="profesional" id="rol-profesional" className="sr-only" />
                      <Stethoscope className={`w-7 h-7 ${rol === 'profesional' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-bold text-sm">Profesional</span>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="font-semibold text-sm">Nombre</Label>
                    <Input
                      id="nombre"
                      placeholder="Ana"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="h-12 rounded-2xl border-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido" className="font-semibold text-sm">Apellido</Label>
                    <Input
                      id="apellido"
                      placeholder="García"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      className="h-12 rounded-2xl border-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-sm">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-2xl border-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold text-sm">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-2xl border-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-semibold text-sm">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-2xl border-primary/20"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-2xl text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full h-12 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Continuar
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                  <Link href="/login" className="text-primary font-bold hover:underline">
                    Inicia sesión
                  </Link>
                </p>
              </form>
            )}

            {/* PASO 2 — ESTUDIANTE */}
            {step === 2 && rol === 'estudiante' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="grado" className="font-semibold text-sm">Grado que estás cursando</Label>
                  <select
                    id="grado"
                    value={grado}
                    onChange={(e) => setGrado(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-primary/20 bg-background px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  >
                    <option value="">Selecciona tu grado</option>
                    {GRADOS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edad" className="font-semibold text-sm">Edad</Label>
                    <Input
                      id="edad"
                      type="number"
                      min="10"
                      max="30"
                      placeholder="Ej: 16"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      className="h-12 rounded-2xl border-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaNacimiento" className="font-semibold text-sm">Fecha de nacimiento</Label>
                    <Input
                      id="fechaNacimiento"
                      type="date"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      className="h-12 rounded-2xl border-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnostico" className="font-semibold text-sm">
                    ¿Tienes algún diagnóstico o condición de salud?{' '}
                    <span className="text-muted-foreground font-normal">(opcional)</span>
                  </Label>
                  <Textarea
                    id="diagnostico"
                    placeholder="Ej: Ansiedad, depresión, TDAH... o escribe 'Ninguno'"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                    className="rounded-2xl border-primary/20 resize-none min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicamentos" className="font-semibold text-sm">
                    ¿Estás tomando algún medicamento actualmente?{' '}
                    <span className="text-muted-foreground font-normal">(opcional)</span>
                  </Label>
                  <Textarea
                    id="medicamentos"
                    placeholder="Ej: Sertralina 50mg, Ritalin... o escribe 'Ninguno'"
                    value={medicamentos}
                    onChange={(e) => setMedicamentos(e.target.value)}
                    className="rounded-2xl border-primary/20 resize-none min-h-[80px]"
                  />
                </div>

                <div className="bg-primary/5 p-4 rounded-2xl text-xs text-muted-foreground leading-relaxed">
                  🔒 Esta información es <strong>completamente confidencial</strong> y solo se usa para personalizar tu experiencia. Nunca se comparte con terceros.
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-2xl text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="h-12 rounded-2xl font-bold border-primary/20"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
                  </Button>
                </div>
              </form>
            )}

            {/* PASO 2 — PROFESIONAL */}
            {step === 2 && rol === 'profesional' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="especialidad" className="font-semibold text-sm">Especialidad</Label>
                  <Input
                    id="especialidad"
                    placeholder="Ej: Psicología clínica, Psiquiatría..."
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    className="h-12 rounded-2xl border-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institucion" className="font-semibold text-sm">Institución u organización</Label>
                  <Input
                    id="institucion"
                    placeholder="Ej: Hospital General, Clínica Privada..."
                    value={institucion}
                    onChange={(e) => setInstitucion(e.target.value)}
                    className="h-12 rounded-2xl border-primary/20"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-2xl text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="h-12 rounded-2xl font-bold border-primary/20"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
