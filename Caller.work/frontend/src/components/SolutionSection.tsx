import { Mic, RefreshCw, Brain, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function SolutionSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-8 bg-[#1a1f3a] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#a78bfa] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b6b] rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl text-white text-center mb-16"
        >
          Voice-first. Proactive. Yours.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 bg-gradient-to-br from-[#ff6b6b] to-[#a78bfa] rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-shadow"
            >
              <Mic className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-white text-2xl mb-4">Real Conversations</h3>
            <p className="text-white/70 leading-relaxed">
              No typing. No screens. Just voice. Caller calls you—like a friend, 
              a coach, or family. Natural, warm, human-feeling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 bg-gradient-to-br from-[#a78bfa] to-[#ff6b6b] rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-shadow"
            >
              <RefreshCw className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-white text-2xl mb-4">It Reaches Out First</h3>
            <p className="text-white/70 leading-relaxed">
              Set your schedule. Caller initiates calls—weekly wellness checks, 
              daily motivation, goal follow-ups. The AI relationship that shows up.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 bg-gradient-to-br from-[#ff6b6b] to-[#a78bfa] rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-shadow"
            >
              <Brain className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-white text-2xl mb-4">It Remembers You</h3>
            <p className="text-white/70 leading-relaxed">
              Send notes, updates, or voice memos via WhatsApp. Caller remembers 
              everything and uses that context in every conversation.
            </p>
          </motion.div>
        </div>

        {/* Workflow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-1 text-center">
              <div className="text-4xl mb-3">💬</div>
              <div className="text-white mb-2">Send Context</div>
              <div className="text-white/60 text-sm">via WhatsApp</div>
            </div>

            <ArrowRight className="w-6 h-6 text-[#a78bfa] rotate-90 md:rotate-0" />

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-1 text-center">
              <div className="text-4xl mb-3">📅</div>
              <div className="text-white mb-2">Caller Schedules</div>
              <div className="text-white/60 text-sm">Proactive call</div>
            </div>

            <ArrowRight className="w-6 h-6 text-[#a78bfa] rotate-90 md:rotate-0" />

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-1 text-center">
              <div className="text-4xl mb-3">📞</div>
              <div className="text-white mb-2">Call Happens</div>
              <div className="text-white/60 text-sm">With full memory</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}