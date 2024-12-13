import type { ReactNode } from 'react';

export type Variant = 'success' | 'error' | 'warning' | 'info' | 'loading';

export type Position =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';
export type Theme = 'light' | 'dark' | 'system';

export interface Action {
  text?: string;
  onClick: () => void | (() => Promise<void>);
}

export type GitGuideProps = {
  id?: number;
  text: string;
  description?: string;
  icon?: ReactNode;
  delayDuration?: number;
  theme?: Theme;
  action?: Action;
};

export interface LoadingType {
  promise:
    | (() => Promise<void>)
    | Promise<void>
    | (() => Promise<any>)
    | Promise<unknown>;
  success: string;
  error: string;
  autoDismiss: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export type GitGuideerProperties = {
  theme?: Theme;
  maxGitGuides?: number;
  position?: Position;
  GitGuideFont?: string;
};

export interface GitGuidePropsWithVariant extends GitGuideProps {
  variant?: Variant;
}

export interface GitGuidePropsWithLoading extends GitGuidePropsWithVariant {
  options?: LoadingType;
}