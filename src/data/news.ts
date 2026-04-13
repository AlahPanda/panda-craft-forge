export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  image?: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'mac-native-1-4-2',
    title: 'Mac Native 1.4.2 — Performance Leap',
    excerpt: 'Major performance improvements for Apple Silicon users with optimized rendering and reduced memory footprint.',
    body: `We're thrilled to announce Mac Native 1.4.2! This update brings a massive performance leap for all Apple Silicon Macs.\n\n**What's New:**\n- 30% faster chunk loading on M1/M2/M3 chips\n- Reduced memory footprint by optimizing mod configurations\n- Updated Sodium and Lithium to latest versions\n- Fixed lighting glitches on macOS Sonoma\n\n**Known Issues:**\n- Some older Intel Macs may experience shader compilation delays\n\nUpdate through Modrinth or re-download the pack. Happy mining! ⛏️`,
    category: 'Release',
    date: '2026-04-10',
    featured: true,
  },
  {
    id: 'crafttoons-beta',
    title: 'CraftToons+ Enters Open Beta',
    excerpt: 'The cartoon-styled modpack is now available for testing. We need your feedback!',
    body: `CraftToons+ is officially in open beta! After months of development and shader tweaking, we're ready for community feedback.\n\n**Beta Features:**\n- Custom cartoon shader with cel-shading\n- 50+ retextured blocks with vibrant colors\n- Custom UI overlays\n- Animated textures for water and lava\n\n**How to Test:**\nDownload links will be available on Modrinth and CurseForge soon. For now, join our Discord for early access.\n\nYour feedback shapes the final release! 🎨`,
    category: 'Beta',
    date: '2026-04-05',
  },
  {
    id: 'astralrinth-dimension',
    title: 'Astralrinth 2.1 — New Dimension: The Void Nebula',
    excerpt: 'Explore an entirely new cosmic dimension with unique biomes, mobs, and resources.',
    body: `Astralrinth 2.1 introduces The Void Nebula — a hauntingly beautiful new dimension filled with cosmic wonders.\n\n**New Content:**\n- The Void Nebula dimension with 5 unique biomes\n- 8 new cosmic mobs including the Nebula Wanderer\n- Void Crystal crafting system\n- New rocket tier for interdimensional travel\n- Custom ambient soundtrack\n\n**Download:**\nAvailable now on Mediafire. Existing worlds are compatible — the new dimension generates alongside your current save.\n\nTo the stars! 🚀`,
    category: 'Release',
    date: '2026-03-28',
  },
  {
    id: 'site-launch',
    title: 'AlahPanda Labs Website Goes Live!',
    excerpt: 'Our new home on the web is here. Browse modpacks, read updates, and download with ease.',
    body: `Welcome to the new AlahPanda Labs website! This is the central hub for all our Minecraft modpacks.\n\n**Features:**\n- Browse all modpacks with detailed info\n- Step-by-step installation guides\n- Direct download links (no sketchy redirects)\n- Lab Updates for the latest news\n\nThis site is a passion project — built by one developer, one MacBook, and a lot of coffee. Enjoy! ☕🐼`,
    category: 'Announcement',
    date: '2026-03-20',
  },
];

export function getNewsById(id: string): NewsArticle | undefined {
  return newsArticles.find(a => a.id === id);
}
