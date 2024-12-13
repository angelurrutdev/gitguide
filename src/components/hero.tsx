import { buttonVariants } from '@/ui/button';
import { SparkleCard } from '@/ui/sparkle-card';
import { Github } from '../icons/icons';
import ExternalLink from '@/ui/external-link';

const Hero = () => {
  return (
    <SparkleCard
      className="rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
      useBottomDivider={false}
    >
      <div className="animate-in fade-in-30 slide-in-from-bottom-2 mb-4 flex flex-col space-y-1 duration-500">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">GitGuide</h1>
        <p className="font-medium text-neutral-500 dark:text-neutral-400">
        Complete and easy guide to handle your local and remote repositories
        </p>
      </div>
      <div className="animate-in fade-in-40 flex flex-col items-center space-y-2 duration-700 md:flex-row md:space-x-2 md:space-y-0">
        

        
        <ExternalLink
          href="https://github.com/angelurrutdev/GitGuide"
          className={buttonVariants({
            variant: 'outline',
            className: 'w-full md:w-40',
          })}
        >
          <Github height={14} />
          <span>View on GitHub</span>
        </ExternalLink>
      </div>
    </SparkleCard>
  );
};

export default Hero;