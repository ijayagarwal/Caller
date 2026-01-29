import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { PersonaSection } from './components/PersonaSection';
import { FounderStory } from './components/FounderStory';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <PersonaSection />
      <FounderStory />
      <WaitlistSection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}