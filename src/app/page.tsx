
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { InfoCards } from '@/components/sections/InfoCards';
import { Assessment } from '@/components/sections/Assessment';
import { AISupport } from '@/components/sections/AISupport';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { ExpertQA } from '@/components/sections/ExpertQA';
import { Resources } from '@/components/sections/Resources';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <InfoCards />
      <Assessment />
      <AISupport />
      <SuccessStories />
      <ExpertQA />
      <Resources />
      <Footer />
    </main>
  );
}
