import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none z-50 md:hidden"
        >
          <button
            onClick={scrollToWaitlist}
            className="w-full bg-[#ff6b6b] text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:bg-[#ff5555] transition-colors pointer-events-auto"
          >
            <Phone className="w-5 h-5" />
            Join the Waitlist
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
