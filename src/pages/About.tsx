import { motion } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-6xl mb-4 block">🐼</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground">
            {t.about.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-6 sm:p-10 space-y-6"
        >
          {[t.about.body1, t.about.body2, t.about.body3, t.about.body4].map((text, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {text}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
