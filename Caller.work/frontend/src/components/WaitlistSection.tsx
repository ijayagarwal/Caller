import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';

// Tally form ID from your share link: https://tally.so/r/rj5Akl
const TALLY_FORM_ID = 'rj5Akl';

export function WaitlistSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  // Load Tally embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openTallyPopup = () => {
    // @ts-expect-error Tally is loaded from external script
    if (window.Tally) {
      // @ts-expect-error Tally is loaded from external script
      window.Tally.openPopup(TALLY_FORM_ID, {
        layout: 'modal',
        width: 500,
        autoClose: 3000,
        onSubmit: () => {
          console.log('Form submitted successfully!');
        },
      });
    } else {
      // Fallback: open in new tab if Tally script hasn't loaded
      window.open(`https://tally.so/r/${TALLY_FORM_ID}`, '_blank');
    }
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-8 bg-[#ff6b6b] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#a78bfa] rounded-full blur-3xl"
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl text-white text-center mb-6"
        >
          Be among the first to experience Caller
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/90 text-lg text-center mb-12 max-w-xl mx-auto"
        >
          Join our waitlist and get early access when we launch. Be part of the future of AI companionship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center"
        >
          {/* Premium CTA Button */}
          <motion.button
            onClick={openTallyPopup}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 50px rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-white text-[#ff6b6b] px-12 py-5 rounded-2xl font-semibold text-xl shadow-xl transition-all duration-300"
          >
            {/* Animated gradient background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#1a1f3a] via-[#a78bfa] to-[#1a1f3a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
              <Sparkles className="w-6 h-6" />
              Join the Waitlist
              <Sparkles className="w-6 h-6" />
            </span>
          </motion.button>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-white/70 text-sm"
          >
            🚀 Join 500+ people already on the list
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-4 text-white/90 text-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-300">✓</span> Early access
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-300">✓</span> Founding perks
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-300">✓</span> Shape the future
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-300">✓</span> No spam
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
