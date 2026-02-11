
import React from 'react';
import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-2xl font-headline font-bold text-primary-foreground">Abrazos Digitales</span>
          </Link>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Nuestra misión es brindar luz en los momentos de sombra. 
            Cada vida es una historia que merece ser contada y celebrada.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Twitter className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Facebook className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg">Navegación</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="#info" className="hover:text-primary transition-colors">Información</Link></li>
            <li><Link href="#test" className="hover:text-primary transition-colors">Evaluación</Link></li>
            <li><Link href="#historias" className="hover:text-primary transition-colors">Historias</Link></li>
            <li><Link href="#recursos" className="hover:text-primary transition-colors">Recursos</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg">Legal</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Privacidad</li>
            <li>Términos de uso</li>
            <li>Política de Cookies</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-primary/5 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Abrazos Digitales. Hecho con amor y esperanza.</p>
      </div>
    </footer>
  );
}
