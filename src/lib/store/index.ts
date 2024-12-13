import type { GitGuidePosition, GitGuideTheme, GitGuideVariant } from '../main.tsx';
import { create } from 'zustand';

interface DocsStore {
  GitGuidePosition: GitGuidePosition;
  GitGuideVariant: GitGuideVariant;
  GitGuideTheme: GitGuideTheme | undefined;
  setGitGuidePosition: (position: GitGuidePosition) => void;
  setGitGuideVariant: (variant: GitGuideVariant) => void;
  setGitGuideTheme: (theme: GitGuideTheme | undefined) => void;
}

export const useDocsStore = create<DocsStore>((set) => ({
  GitGuidePosition: 'bottom-right',
  GitGuideVariant: 'success',
  GitGuideTheme: undefined,
  setGitGuidePosition: (position) => set({ GitGuidePosition: position }),
  setGitGuideVariant: (variant) => set({ GitGuideVariant: variant }),
  setGitGuideTheme: (theme) => set({ GitGuideTheme: theme }),
}));