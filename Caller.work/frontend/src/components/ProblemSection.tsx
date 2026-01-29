import { Smartphone, MessageCircle, Bot, Users, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function ProblemSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#faf9f6] via-[#f5f3ff] to-[#faf9f6] relative overflow-hidden"
    >
      {/* Floating gradient orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-64 h-64 bg-[#a78bfa]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-64 h-64 bg-[#ff6b6b]/20 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl text-[#1a1f3a] text-center mb-16"
        >
          Most AI companions wait for you. Life doesn&apos;t.
        </motion.h2>

        <div className="space-y-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex gap-4 items-start"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center"
            >
              <Smartphone className="w-6 h-6 text-[#ff6b6b]" />
            </motion.div>
            <div>
              <h3 className="text-[#1a1f3a] text-xl mb-2">&ldquo;You open the app when you remember.&rdquo;</h3>
              <p className="text-[#2d3748] leading-relaxed">
                But stress, loneliness, and big decisions don&apos;t wait for you to remember. 
                They hit you at 2am. On your commute. When you&apos;re stuck.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="flex gap-4 items-start"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 text-[#ff6b6b]" />
            </motion.div>
            <div>
              <h3 className="text-[#1a1f3a] text-xl mb-2">&ldquo;Therapy is expensive. Friends are busy.&rdquo;</h3>
              <p className="text-[#2d3748] leading-relaxed">
                1 in 4 people feel chronically lonely. Most never reach out. What if someone—or 
                something—reached out to you first?
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="flex gap-4 items-start"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center"
            >
              <Bot className="w-6 h-6 text-[#ff6b6b]" />
            </motion.div>
            <div>
              <h3 className="text-[#1a1f3a] text-xl mb-2">&ldquo;Chatbots are reactive. Relationships are proactive.&rdquo;</h3>
              <p className="text-[#2d3748] leading-relaxed">
                Real connection requires showing up. Checking in. Remembering. That&apos;s what Caller does. 
                It&apos;s the AI relationship that initiates, not waits.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all"
          >
            <Users className="w-8 h-8 text-[#a78bfa] mb-3" />
            <div className="text-2xl text-[#1a1f3a] mb-1">1 in 4</div>
            <div className="text-[#2d3748] text-sm">adults experience chronic loneliness globally</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all"
          >
            <Heart className="w-8 h-8 text-[#ff6b6b] mb-3" />
            <div className="text-2xl text-[#1a1f3a] mb-1">59%</div>
            <div className="text-[#2d3748] text-sm">report lack of emotional support</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all"
          >
            <TrendingUp className="w-8 h-8 text-[#a78bfa] mb-3" />
            <div className="text-2xl text-[#1a1f3a] mb-1">88% YoY</div>
            <div className="text-[#2d3748] text-sm">growth in AI companion adoption</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}