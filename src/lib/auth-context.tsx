"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isConfigured } from './firebase';

export type UserRole = 'estudiante' | 'profesional';

export interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  // Campos del estudiante
  grado?: string;
  edad?: number;
  fechaNacimiento?: string;
  diagnostico?: string;
  medicamentos?: string;
  // Campos del profesional
  especialidad?: string;
  institucion?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  firebaseReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, profileData: Omit<UserProfile, 'uid' | 'email'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si Firebase no está configurado, simplemente marcamos como no cargando
    if (!isConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && db) {
        const docRef = doc(db, 'usuarios', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase no está configurado.');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const register = async (
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'uid' | 'email'>
  ) => {
    if (!auth || !db) throw new Error('Firebase no está configurado.');
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const newProfile: UserProfile = {
      uid: credential.user.uid,
      email,
      ...profileData,
    };
    await setDoc(doc(db, 'usuarios', credential.user.uid), newProfile);
    setProfile(newProfile);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, firebaseReady: isConfigured, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
