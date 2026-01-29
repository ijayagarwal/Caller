import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Quote } from 'lucide-react';

export function FounderStory() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#faf9f6] via-[#f5f3ff] to-[#faf9f6]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl text-[#1a1f3a] text-center mb-12"
        >
          Why we&apos;re building Caller
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 relative hover:shadow-2xl transition-all"
        >
          <Quote className="absolute top-8 left-8 w-12 h-12 text-[#a78bfa]/20" />
          
          <div className="relative z-10">
            <p className="text-[#2d3748] text-lg md:text-xl leading-relaxed mb-6 italic">
              I built Caller because I&apos;ve felt it—the stress no one checks 
              on, the goals I forget to revisit. What if AI didn&apos;t just answer questions, but 
              actually cared enough to call? That&apos;s what we&apos;re building. A proactive relationship 
              layer for anyone who needs it.
            </p>
            
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#a78bfa] flex items-center justify-center text-white text-xl shadow-lg"
              >
                JA
              </motion.div>
              <div>
                <div className="text-[#1a1f3a]">Jay Agarwal</div>
                <div className="text-[#2d3748]/70">Founder, Caller</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-[#2d3748]"
        >
          <p>Built by AI and mental health advocates</p>
        </motion.div>
      </div>
    </section>
  );
}