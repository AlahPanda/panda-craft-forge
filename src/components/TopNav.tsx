import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n, localeLabels, type Locale } from '@/contexts/I18nContext';

export function TopNav() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/modpacks', label: t.nav.modpacks },
    { to: '/news', label: t.nav.news },
    { to: '/about', label: t.nav.about },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? 'glass-strong shadow-lg shadow-primary/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-foreground font-display font-extrabold text-xl">
          <img src="/logo.jpeg" alt="Logo" className="h-8 w-8 object-contain" />
          <span className="hidden sm:inline">AlahPanda<span className="text-primary"> Labs</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                location.pathname === l.to
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://discord.gg/example"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-smooth"
          >
            {t.nav.discord}
          </a>

          {/* Language */}
          <div ref={langRef} className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-smooth"
            >
              <Globe className="w-4 h-4" />
              {localeLabels[locale]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 glass rounded-lg py-1 min-w-[100px] z-[100]"
                >
                  {(Object.keys(localeLabels) as Locale[]).map(l => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm transition-smooth ${
                        locale === l ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      {localeLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    location.pathname === l.to
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2 px-4">
                {(Object.keys(localeLabels) as Locale[]).map(l => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setMobileOpen(false); }}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                      locale === l ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-white/5'
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
