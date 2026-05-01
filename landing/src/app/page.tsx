import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { Story } from "@/components/Story";
import { CallDemo } from "@/components/CallDemo";
import { VoiceVisual } from "@/components/VoiceVisual";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { Pricing } from "@/components/Pricing";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Story />
      <CallDemo />
      <VoiceVisual />
      <Features />
      <HowItWorks />
      <WhyUs />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
