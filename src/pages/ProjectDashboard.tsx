import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle, ExternalLink, X } from 'lucide-react';
import { getProjectBySlug, type ProjectDownload } from '@/data/projects';
import { useI18n } from '@/contexts/I18nContext';

const { t, dict } = useI18n();

const platformIcons: Record<string, string> = {
  modrinth: '🟢',
  curseforge: '🔥',
  mediafire: '📁',
};

const platformNames: Record<string, string> = {
  modrinth: 'Modrinth',
  curseforge: 'CurseForge',
  mediafire: 'Mediafire',
};

type Tab = 'requirements' | 'instructions';

export default function ProjectDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const project = getProjectBySlug(slug || '');
  const [tab, setTab] = useState<Tab>('requirements');
  const [downloadOpen, setDownloadOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Project not found</h1>
          <Link to="/modpacks" className="text-primary hover:underline">{t.project.back}</Link>
        </div>
      </div>
    );
  }

  const handleDownloadClick = (dl: ProjectDownload) => {
    if (dl.status === 'soon') return;
    if (dl.hasAdfly) {
      // For Astralrinth, open with ad redirect disclaimer
      window.open(dl.url, '_blank');
    } else {
      window.open(dl.url, '_blank');
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'requirements', label: t.project.requirements },
    { key: 'instructions', label: t.project.instructions },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link
          to="/modpacks"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {t.project.back}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start gap-6 mb-10"
        >
          <span className="text-6xl">{project.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
                {project.name}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                v{project.version}
              </span>
            </div>
            <p className="text-primary/70 font-medium mt-1">{t(project.subtitle)}</p>
            <p className="text-muted-foreground mt-3 max-w-2xl">{t(project.description)}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-muted-foreground border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setDownloadOpen(true)}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth shrink-0"
          >
            {t.project.download}
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tb => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                tab === tb.key
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'requirements' && (
            <motion.div
              key="req"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {project.requirements.map(req => (
                <div key={req.label} className="glass rounded-xl p-5 flex items-center gap-4">
                  <span className="text-2xl">{req.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{t(req.label)}</p>
                    <p className="text-sm font-semibold text-foreground truncate">{req.value}</p>
                  </div>
                  {req.status === 'check' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
          {tab === 'instructions' && (
            <motion.div
              key="inst"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="glass rounded-xl p-6"
            >
              <ol className="space-y-4">
                {project.instructions.map(inst => (
                  <li key={inst.step} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                      {inst.step}
                    </span>
                    <p className="text-foreground text-sm leading-relaxed pt-1">{t(inst.text)}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download Modal */}
      <AnimatePresence>
        {downloadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setDownloadOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="relative glass-strong rounded-2xl p-6 w-full max-w-md z-[101]"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-foreground">{t.project.downloadModal}</h2>
                <button onClick={() => setDownloadOpen(false)} className="text-muted-foreground hover:text-foreground transition-smooth">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {project.downloads.map(dl => (
                  <button
                    key={dl.platform}
                    onClick={() => handleDownloadClick(dl)}
                    disabled={dl.status === 'soon'}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-smooth ${
                      dl.status === 'active'
                    ? 'glass hover:bg-muted cursor-pointer'
                        : 'bg-secondary opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-2xl">{platformIcons[dl.platform]}</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-foreground">{platformNames[dl.platform]}</p>
                      <p className="text-xs text-muted-foreground">
                        {dl.status === 'active'
                          ? dl.hasAdfly ? t.project.adRedirect : t.project.active
                          : t.project.soon}
                      </p>
                    </div>
                    {dl.status === 'active' && <ExternalLink className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
