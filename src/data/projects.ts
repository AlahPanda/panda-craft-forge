export type DownloadPlatform = 'modrinth' | 'curseforge' | 'mediafire';
export type DownloadStatus = 'active' | 'soon';
export type RequirementStatus = 'check' | 'warning';

export interface ProjectRequirement {
  label: string;
  value: string;
  icon: string;
  status: RequirementStatus;
}

export interface ProjectDownload {
  platform: DownloadPlatform;
  url: string;
  status: DownloadStatus;
  hasAdfly: boolean;
}

export interface ProjectInstruction {
  step: number;
  text: string;
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  tags: string[];
  version: string;
  rating: number;
  forks: number;
  downloadCount: number;
  mcVersion: string;
  requirements: ProjectRequirement[];
  instructions: ProjectInstruction[];
  downloads: ProjectDownload[];
}

export const projects: Project[] = [
  {
    slug: 'mac-native',
    name: 'Mac Native',
    subtitle: 'Optimized for Apple Silicon',
    description: 'A performance-focused modpack built specifically for macOS with Apple Silicon optimization. Enjoy Minecraft at its best on your Mac with native ARM performance.',
    icon: '🍎',
    tags: ['Performance', 'Apple Silicon', 'Optimization'],
    version: '1.4.2',
    rating: 4.8,
    forks: 12,
    downloadCount: 2340,
    mcVersion: '1.20.4',
    requirements: [
      { label: 'OS', value: 'macOS 13+', icon: '💻', status: 'check' },
      { label: 'RAM', value: '4 GB+', icon: '🧠', status: 'check' },
      { label: 'Chip', value: 'Apple M1+', icon: '⚡', status: 'check' },
      { label: 'Loader', value: 'Fabric', icon: '🧵', status: 'check' },
    ],
    instructions: [
      { step: 1, text: 'Download and install the Modrinth App or Prism Launcher.' },
      { step: 2, text: 'Search for "Mac Native" in the modpack browser or import the file.' },
      { step: 3, text: 'Allocate at least 4 GB of RAM in the launcher settings.' },
      { step: 4, text: 'Ensure you have Java 17+ (ARM build) installed.' },
      { step: 5, text: 'Launch and enjoy optimized performance on your Mac!' },
    ],
    downloads: [
      { platform: 'modrinth', url: 'https://modrinth.com/modpack/mac-native', status: 'active', hasAdfly: false },
      { platform: 'curseforge', url: '#', status: 'soon', hasAdfly: false },
    ],
  },
  {
    slug: 'crafttoons-plus',
    name: 'CraftToons+',
    subtitle: 'Cartoon-Styled Minecraft',
    description: 'Transform your Minecraft experience with vibrant cartoon aesthetics, custom shaders, and handpicked visual mods that make every block pop with personality.',
    icon: '🎨',
    tags: ['Visual', 'Shaders', 'Aesthetic'],
    version: '0.9.0-beta',
    rating: 4.5,
    forks: 8,
    downloadCount: 1120,
    mcVersion: '1.20.4',
    requirements: [
      { label: 'OS', value: 'Any', icon: '💻', status: 'check' },
      { label: 'RAM', value: '6 GB+', icon: '🧠', status: 'warning' },
      { label: 'GPU', value: 'Dedicated Recommended', icon: '🎮', status: 'warning' },
      { label: 'Loader', value: 'Fabric', icon: '🧵', status: 'check' },
    ],
    instructions: [
      { step: 1, text: 'Download and install Prism Launcher or MultiMC.' },
      { step: 2, text: 'Import the CraftToons+ modpack file.' },
      { step: 3, text: 'Allocate at least 6 GB of RAM for optimal shader performance.' },
      { step: 4, text: 'Enable the included shader pack from Video Settings > Shader Packs.' },
      { step: 5, text: 'Adjust shader quality based on your GPU capability.' },
    ],
    downloads: [
      { platform: 'modrinth', url: '#', status: 'soon', hasAdfly: false },
      { platform: 'curseforge', url: '#', status: 'soon', hasAdfly: false },
    ],
  },
  {
    slug: 'astralrinth',
    name: 'Astralrinth',
    subtitle: 'Explore the Cosmos',
    description: 'A space exploration modpack featuring custom dimensions, galactic biomes, and interstellar adventure. Build your rocket and explore the unknown universe.',
    icon: '🚀',
    tags: ['Adventure', 'Space', 'Exploration'],
    version: '2.1.0',
    rating: 4.9,
    forks: 25,
    downloadCount: 4500,
    mcVersion: '1.20.1',
    requirements: [
      { label: 'OS', value: 'Any', icon: '💻', status: 'check' },
      { label: 'RAM', value: '8 GB+', icon: '🧠', status: 'warning' },
      { label: 'Storage', value: '2 GB+', icon: '💾', status: 'check' },
      { label: 'Loader', value: 'Forge', icon: '🔨', status: 'check' },
    ],
    instructions: [
      { step: 1, text: 'Download the modpack from the Mediafire link below.' },
      { step: 2, text: 'Install CurseForge App or Prism Launcher.' },
      { step: 3, text: 'Import the downloaded .zip file into your launcher.' },
      { step: 4, text: 'Allocate at least 8 GB of RAM for the best experience.' },
      { step: 5, text: 'Launch the modpack and start your space journey!' },
    ],
    downloads: [
      { platform: 'mediafire', url: 'https://www.mediafire.com/file/example/astralrinth', status: 'active', hasAdfly: true },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
