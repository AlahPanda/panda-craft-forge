import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, RefreshCw, Code } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

const floatTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  duration: 3,
};

export default function Landing() {
  const { t } = useI18n();

  const features = [
    { icon: Shield, title: t.landing.features.safe, desc: t.landing.features.safeDesc },
    { icon: RefreshCw, title: t.landing.features.native, desc: t.landing.features.nativeDesc },
    { icon: Code, title: t.landing.features.open, desc: t.landing.features.openDesc },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center relative overflow-hidden pt-16 pb-20 px-4">
        {/* Floating icons */}
        <motion.div
          className="absolute text-6xl select-none"
          style={{ top: '20%', left: '15%' }}
          animate={{ y: [-10, 10] }}
          transition={floatTransition}
        >
          🟫
        </motion.div>
        <motion.div
          className="absolute text-5xl select-none"
          style={{ top: '25%', right: '15%' }}
          animate={{ y: [10, -10] }}
          transition={{ ...floatTransition, delay: 0.5 }}
        >
          💻
        </motion.div>

        {/* Glow behind title */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center z-10"
        >
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-foreground text-glow">
            {t.landing.title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto">
            {t.landing.subtitle}
          </p>
          <Link
            to="/modpacks"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-smooth group"
          >
            {t.landing.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="glass rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-foreground text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
