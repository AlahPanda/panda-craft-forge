import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getNewsById } from '@/data/news';
import { useI18n } from '@/contexts/I18nContext';

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const article = getNewsById(id || '');

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
          <Link to="/news" className="text-primary hover:underline">Back to {t.news.title}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {t.news.title}
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-6">
            {article.title}
          </h1>

          <div className="glass rounded-xl p-6 sm:p-8">
            <div className="prose prose-invert prose-sm max-w-none">
              {article.body.split('\n').map((paragraph, i) => {
                if (!paragraph.trim()) return null;
                // Handle bold markers
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                      }
                      if (part.startsWith('- ')) {
                        return <span key={j} className="block ml-4">{part}</span>;
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
