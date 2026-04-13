import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Download, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { useI18n } from '@/contexts/I18nContext';
import { GlowCard } from '@/components/GlowCard';

export default function Modpacks() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground">
            {t.modpacks.title}
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">{t.modpacks.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlowCard className="h-full flex flex-col">
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{project.icon}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      v{project.version}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground">{project.name}</h2>
                  <p className="text-sm text-primary/70 font-medium">{project.subtitle}</p>
                  <p className="mt-3 text-sm text-muted-foreground flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-muted-foreground border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400" /> {project.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> {project.downloadCount.toLocaleString()}
                    </span>
                    <span>MC {project.mcVersion}</span>
                  </div>

                  <Link
                    to={`/project/${project.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
                  >
                    {t.modpacks.explore} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mt-16 text-lg"
        >
          {t.modpacks.comingSoon}
        </motion.p>
      </div>
    </div>
  );
}
