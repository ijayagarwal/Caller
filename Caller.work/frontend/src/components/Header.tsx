import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/80 backdrop-blur-lg border-b border-[#1a1f3a]/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b6b] to-[#a78bfa] rounded-xl flex items-center justify-center shadow-lg">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl text-[#1a1f3a] tracking-tight">
            CALLER
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToWaitlist}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#ff6b6b] text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Join Waitlist
        </motion.button>
      </div>
    </motion.header>
  );
}
