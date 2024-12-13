import { useEffect, useState } from 'react';
import type {
  GitGuidePropsWithVariant,
  GitGuideerProperties,
} from './GitGuide.types';

import '../styles/GitGuide-context.css';

import GitGuideComponent from './GitGuide';
import { classNames, generateRandomId } from './utils';

// Ensure openGitGuideGlobal is initialized correctly
let openGitGuideGlobal: (data: GitGuidePropsWithVariant) => void;

export const GitGuideer = ({
  maxGitGuides = 4,
  position = 'bottom-right',
  theme = 'system',
  GitGuideFont,
}: GitGuideerProperties) => {
  const [GitGuides, setGitGuides] = useState<GitGuidePropsWithVariant[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define the openGitGuide function
  const openGitGuide = (data: GitGuidePropsWithVariant) => {
    const newGitGuide = {
      ...data,
      id: generateRandomId(),
    };
    setGitGuides((prevGitGuides) => {
      if (prevGitGuides.length >= maxGitGuides) {
        if (
          position === 'top-left' ||
          position === 'top-right' ||
          position === 'top-center'
        ) {
          return [newGitGuide, ...prevGitGuides.slice(0, prevGitGuides.length - 1)];
        } else {
          return [...prevGitGuides.slice(1), newGitGuide];
        }
      } else {
        if (
          position === 'top-left' ||
          position === 'top-right' ||
          position === 'top-center'
        ) {
          return [newGitGuide, ...prevGitGuides];
        } else {
          return [...prevGitGuides, newGitGuide];
        }
      }
    });
  };

  // Define the closeGitGuide function
  const closeGitGuide = (id: number) => {
    setGitGuides((prevGitGuides) => prevGitGuides.filter((GitGuide) => GitGuide.id !== id));
  };

  // Assign openGitGuide to the global variable
  openGitGuideGlobal = openGitGuide;

  // Render the component
  return (
    isMounted &&
    GitGuides.length > 0 && (
      <section
        aria-label="GitGuide Notifications"
        role="region"
        aria-live="polite"
        className={classNames(
          't_GitGuides',
          position === 'top-left' ? 't_top-left' : '',
          position === 'top-right' ? 't_top-right' : '',
          position === 'top-center' ? 't_top-center' : '',
          position === 'bottom-left' ? 't_bottom-left' : '',
          position === 'bottom-right' ? 't_bottom-right' : '',
          position === 'bottom-center' ? 't_bottom-center' : '',
          GitGuideFont ? GitGuideFont : 't_default_font',
        )}
      >
        {GitGuides.map((GitGuide) => (
          <GitGuideComponent
            key={GitGuide.id}
            theme={theme}
            GitGuidePosition={position}
            onClose={() => closeGitGuide(GitGuide.id!)}
            {...GitGuide}
          />
        ))}
      </section>
    )
  );
};

// Export the openGitGuide function:
export const openGitGuide = (data: GitGuidePropsWithVariant): void => {
  if (openGitGuideGlobal) {
    openGitGuideGlobal(data);
  } else {
    console.error(
      '🔔 <GitGuideer /> component is not mounted. Check GitGuide..dev/GitGuideer for more information.',
    );
  }
};