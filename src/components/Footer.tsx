import { useI18n } from '@/contexts/I18nContext';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/5 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>{t.footer.version} | {t.footer.tagline}</p>
      </div>
    </footer>
  );
}
