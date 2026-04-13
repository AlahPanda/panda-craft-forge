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
    subtitle: 'project.mac-native.subtitle',
    description: 'project.mac-native.description',
    icon: '🍎',
    tags: ['Performance', 'Apple Silicon', 'Optimization'],
    version: '1.4.2',
    rating: 4.8,
    forks: 12,
    downloadCount: 2340,
    mcVersion: '1.20.4',
    requirements: [
      { label: 'project.requirements_list.os', value: 'macOS 13+', icon: '💻', status: 'check' },
      { label: 'project.requirements_list.ram', value: '4 GB+', icon: '🧠', status: 'check' },
      { label: 'project.requirements_list.chip', value: 'Apple Silicon', icon: '⚡', status: 'check' },
      { label: 'project.requirements_list.loader', value: 'Fabric', icon: '🧵', status: 'check' },
    ],
    instructions: [
      { step: 1, text: 'project.mac-native.step1' },
      { step: 2, text: 'project.mac-native.step2' },
      { step: 3, text: 'project.mac-native.step3' },
      { step: 4, text: 'project.mac-native.step4' },
      { step: 5, text: 'project.mac-native.step5' },
    ],
    downloads: [
      { platform: 'modrinth', url: 'https://modrinth.com/modpack/mac-native', status: 'active', hasAdfly: false },
      { platform: 'curseforge', url: '#', status: 'soon', hasAdfly: false },
    ],
  },
  {
    slug: 'crafttoons-plus',
    name: 'CraftToons+',
    subtitle: 'project.crafttoons.subtitle',
    description: 'project.crafttoons.description',
    icon: '🎨',
    tags: ['Visual', 'Shaders', 'Aesthetic'],
    version: '0.9.0-beta',
    rating: 4.5,
    forks: 8,
    downloadCount: 1120,
    mcVersion: '1.20.4',
    requirements: [
      { label: 'project.requirements_list.os', value: 'Any', icon: '💻', status: 'check' },
      { label: 'project.requirements_list.ram', value: '6 GB+', icon: '🧠', status: 'warning' },
      { label: 'project.requirements_list.gpu', value: 'project.requirements_list.gpu_val', icon: '🎮', status: 'warning' },
      { label: 'project.requirements_list.loader', value: 'Fabric', icon: '🧵', status: 'check' },
    ],
    instructions: [
      { step: 1, text: 'project.crafttoons.step1' },
      { step: 2, text: 'project.crafttoons.step2' },
      { step: 3, text: 'project.crafttoons.step3' },
      { step: 4, text: 'project.crafttoons.step4' },
      { step: 5, text: 'project.crafttoons.step5' },
    ],
    downloads: [
      { platform: 'modrinth', url: '#', status: 'soon', hasAdfly: false },
      { platform: 'curseforge', url: '#', status: 'soon', hasAdfly: false },
    ],
  },
  {
    slug: 'astralrinth',
    name: 'Astralrinth',
    subtitle: 'project.astralrinth.subtitle',
    description: 'project.astralrinth.description',
    icon: '🚀',
    tags: ['Adventure', 'Space', 'Exploration'],
    version: '2.1.0',
    rating: 4.9,
    forks: 25,
    downloadCount: 4500,
    mcVersion: '1.20.1',
    requirements: [
      { label: 'project.requirements_list.os', value: 'Any', icon: '💻', status: 'check' },
      { label: 'project.requirements_list.ram', value: '8 GB+', icon: '🧠', status: 'warning' },
      { label: 'project.requirements_list.storage', value: '2 GB+', icon: '💾', status: 'check' },
      { label: 'project.requirements_list.loader', value: 'Forge', icon: '🔨', status: 'check' },
    ],
    instructions: [
      { step: 1, text: 'project.astralrinth.step1' },
      { step: 2, text: 'project.astralrinth.step2' },
      { step: 3, text: 'project.astralrinth.step3' },
      { step: 4, text: 'project.astralrinth.step4' },
      { step: 5, text: 'project.astralrinth.step5' },
    ],
    downloads: [
      { platform: 'mediafire', url: 'https://www.mediafire.com/file/example/astralrinth', status: 'active', hasAdfly: true },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
