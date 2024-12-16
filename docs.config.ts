import type { SVGProps } from 'react';
import { Github, Versions, Commit, Branch, Issue, Help, PullRequest, Workflow } from '@/icons';

export interface iDocsRoutes {
  category: string;
  routes: {
    title: string;
    path: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
}

export const Guide: iDocsRoutes[] = [
  {
    category: 'Git',
    routes: [
      {
        title: 'Push & Commit',
        path: '/push-commit',
        icon: Commit,
      },
      {
        title: 'Branchs',
        path: '/branchs',
        icon: Branch,
      },
      {
        title: 'Control Versions',
        path: '/versions',
        icon: Versions
      },
    ],
  },
];

export const SocialLinks: iDocsRoutes[] = [
  {
    category: 'Social Links',
    routes: [
            {
        title: 'GitHub',
        path: 'https://github.com/angelurrutdev/GitGuide',
        icon: Github,
      },
    ],
  },
];

export const SidebarRoutes: iDocsRoutes[] = [
  {
    category: 'Introduction',
    routes: [
      {
        title: 'Getting Started',
        path: '/',
      },
    ],
  },
  ...Guide,
  {
    category: 'GitHub',
    routes: [
      {
        title: 'Pull Request',
        path: '/pullrequest',
        icon: PullRequest,
      },
      {
        title: 'Issues',
        path: '/issues',
        icon: Issue,
      },
      {
        title: 'Workflows',
        path: '/workflows',
        icon: Workflow,

      },
],
  },

  {
    category: 'Project IDX',
    routes: [
      {
        title: 'To GitHub in IDX',
        path: '/project-idx',
        icon: PullRequest,
      },
      ],
  },


  {
    category: 'Help',
    routes: [
      {
        title: 'More Information',
        path: '/more-information',
        icon: Help,
      },
    ],
  },
];

export const allRoutes = [...SidebarRoutes, ...SocialLinks];