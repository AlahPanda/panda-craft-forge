

## AlahPanda Labs — Modpack Repository Website

### Overview
A cinematic, data-driven Minecraft modpack repository with glassmorphic UI, smooth animations, and i18n support. Dark theme with cyan/blue accents on #050505 background.

### Data Layer
- **`src/data/projects.ts`** — All modpack data (Mac Native, CraftToons+, Astralrinth) with typed requirements, instructions, downloads, tags, ratings, stats
- **`src/data/news.ts`** — News articles with full body content, categories, dates, images
- **`src/data/i18n/`** — Translation JSON files for EN, PT-PT, PT-BR, ES with a React context provider

### Pages & Routes

1. **`/` — Landing Gateway**
   - Cinematic dark entry with "AlahPanda Labs" title, floating Minecraft grass block and Apple chip icons using framer-motion spring physics
   - CTA to explore modpacks

2. **`/modpacks` — Modpack Hub**
   - Grid of modpack cards with cursor-tracking radial glow effect
   - Each card shows: name, subtitle, description, tags, rating, forks, downloads, version badge
   - "Explore →" link per card
   - "More modpacks coming soon" teaser section

3. **`/project/:slug` — Project Dashboard**
   - Left sidebar navigation: Back, Requirements, Instructions, Download
   - Header: icon, title, subtitle, description, tags
   - **Requirements tab**: Horizontal cards with icon, label, value, check/warning status
   - **Instructions tab**: Numbered step-by-step list
   - **Download button** → opens glassmorphic modal with platform options (Modrinth, CurseForge, Mediafire) respecting per-project rules:
     - Mac Native: Modrinth (active), CurseForge (soon)
     - CraftToons+: Modrinth (soon), CurseForge (soon)
     - Astralrinth: Mediafire only (with optional ad redirect)

4. **`/news` — Lab Updates**
   - Featured hero article + grid of article cards with category badges, dates
   - Click opens `/news/:id` route or glassmorphic modal with full article content

5. **`/about` — The Lone Panda**
   - Lighthearted, comic tone about a solo developer, passion project, coffee-fueled MacBook sessions
   - Clarifies this is a curated repository, not a platform

### Navigation & Layout
- **TopNav**: Sticky, gains backdrop-blur + opacity on scroll. Links: LaunchPad logo, Home, News (→ "Lab Updates"), Modpacks, Discord, About
- **Mobile**: Nav converts to hamburger sidebar or horizontal scroll menu
- **Footer**: "v1.1.0-stable | AlahPanda Labs — Handcrafted with passion"
- Language switcher in nav for i18n

### Visual & Animation System
- **Glassmorphism**: `backdrop-blur-[12px]`, `border-white/10`, `bg-white/5` throughout
- **Card hover glow**: Radial gradient spotlight following cursor position
- **Framer Motion**: Spring physics for floating elements, page transitions, card expand animation on "Explore"
- **Lerp smooth scrolling**: Custom scroll handler for buttery page scrolling
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` on all CSS transitions
- **Font**: Inter/Geist ExtraBold for headings
- **Colors**: BG `#050505`, primary cyan/blue accent, z-index nav(50) modals(100)

### Terminology Updates
- "Global News" → "Lab Updates"
- "Every modpack is verified" → "Safe & Tested"
- "Auto-update" → "Platform Native"

### Responsive
- Cards stack vertically on mobile with `px-4` padding
- Sidebar collapses on mobile project pages
- All modals and content adapt to small screens

