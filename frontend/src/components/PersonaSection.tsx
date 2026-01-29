import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Users, Briefcase, Heart, Target } from 'lucide-react';

export function PersonaSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const personas = [
    {
      icon: Users,
      color: 'from-[#ff6b6b] to-[#ff8787]',
      title: 'The Lonely & Isolated',
      description: 'Missing connection? Caller can be your AI best friend, confidant, or virtual family member. Proactive calls mean you\'re never truly alone.',
    },
    {
      icon: Briefcase,
      color: 'from-[#a78bfa] to-[#c4b5fd]',
      title: 'The Overwhelmed Professional',
      description: 'Career stress, burnout, big decisions? Caller\'s your AI coach, sounding board, and accountability partner. Weekly check-ins keep you on track.',
    },
    {
      icon: Heart,
      color: 'from-[#ff6b6b] to-[#a78bfa]',
      title: 'The Wellness Seeker',
      description: 'Tracking health, mental wellness, or personal growth? Caller\'s voice-based health advisor and wellness coach proactively keeps you accountable.',
    },
    {
      icon: Target,
      color: 'from-[#a78bfa] to-[#ff6b6b]',
      title: 'The Goal-Oriented Achiever',
      description: 'Building a startup, learning a language, or changing habits? Caller follows up, checks progress, and keeps you motivated—without you lifting a finger.',
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-8 bg-[#faf9f6] relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl text-[#1a1f3a] text-center mb-16"
        >
          Built for real people, real needs
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((persona, index) => {
            const IconComponent = persona.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${persona.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-[#1a1f3a] text-2xl mb-4">{persona.title}</h3>
                <p className="text-[#2d3748] leading-relaxed">
                  {persona.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}