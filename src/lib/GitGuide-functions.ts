import type {
    GitGuidePropsWithLoading,
    GitGuidePropsWithVariant,
  } from './GitGuide.types';
  import { openGitGuide } from './GitGuideer';
  
  interface GitGuideFunctions {
    default: (data: GitGuidePropsWithVariant) => GitGuidePropsWithVariant;
    success: (data: GitGuidePropsWithVariant) => GitGuidePropsWithVariant;
    error: (data: GitGuidePropsWithVariant) => GitGuidePropsWithVariant;
    warning: (data: GitGuidePropsWithVariant) => GitGuidePropsWithVariant;
    info: (data: GitGuidePropsWithVariant) => GitGuidePropsWithVariant;
    loading: (data: GitGuidePropsWithLoading) => GitGuidePropsWithLoading;
  }
  
  export const GitGuide: GitGuideFunctions = {
    default: (data: GitGuidePropsWithVariant) => {
      openGitGuide({ ...data });
      return data;
    },
    success: (data: GitGuidePropsWithVariant) => {
      openGitGuide({ ...data, variant: 'success' });
      return data;
    },
    error: (data: GitGuidePropsWithVariant) => {
      openGitGuide({ ...data, variant: 'error' });
      return data;
    },
    warning: (data: GitGuidePropsWithVariant) => {
      openGitGuide({ ...data, variant: 'warning' });
      return data;
    },
    info: (data: GitGuidePropsWithVariant) => {
      openGitGuide({ ...data, variant: 'info' });
      return data;
    },
    loading: (data: GitGuidePropsWithLoading) => {
      openGitGuide({ ...data, variant: 'loading' });
      return data;
    },
  };