import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { newsArticles } from '@/data/news';
import { useI18n } from '@/contexts/I18nContext';
import { GlowCard } from '@/components/GlowCard';
import { ArrowRight } from 'lucide-react';

export default function News() {
  const { t } = useI18n();
  const featured = newsArticles.find(a => a.featured);
  const rest = newsArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground">{t.news.title}</h1>
          <p className="mt-3 text-muted-foreground text-lg">{t.news.subtitle}</p>
        </motion.div>

        {/* Featured */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <Link to={`/news/${featured.id}`}>
              <GlowCard className="p-8 hover:border-primary/20 transition-smooth">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {t.news.featured}
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-4">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mt-3 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5">{featured.category}</span>
                  <span>{featured.date}</span>
                </div>
              </GlowCard>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link to={`/news/${article.id}`}>
                <GlowCard className="p-6 h-full hover:border-primary/20 transition-smooth">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/5 text-muted-foreground border border-white/5">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{article.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold">
                    {t.news.readMore} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
