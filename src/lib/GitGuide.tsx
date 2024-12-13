import { useEffect, useState, type FC } from 'react';
import type {
  Position,
  GitGuidePropsWithLoading,
  Variant,
} from './GitGuide.types';
import './GitGuide-component.css';


import { Error, Info, Loading, Success, Warning } from '@/icons.lib';
import { useTimeout } from './hooks/useTimeout';
import { classNames, prefersReducedMotion } from '@/utils-lib'
const icons: Record<Variant, FC<React.SVGProps<SVGSVGElement>>> = {
  success: Success,
  error: Error,
  warning: Warning,
  info: Info,
  loading: Loading,
};

const iconsColors: Record<Variant, string> = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#eab308',
  info: '#3b82f6',
  loading: 'currentColor',
};

interface GitGuideComponentProps extends GitGuidePropsWithLoading {
  GitGuidePosition: Position;
  onClose: () => void;
}

const GitGuide = (props: GitGuideComponentProps) => {
  const [status, setStatus] = useState<Variant>(props.variant || 'info');
  const [iconColor, setIconColor] = useState<string>(iconsColors[status]);
  const [GitGuideText, setGitGuideText] = useState<string>(props.text);
  const IconComponent = icons[status];
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const delayDuration = props.delayDuration || 4000;

  const { pauseTimer, resumeTimer } = useTimeout(() => {
    handleCloseGitGuide();
  }, delayDuration);

  const handleCloseGitGuide = () => {
    setIsExiting(true);
    const animationDisabled = prefersReducedMotion();
    if (!animationDisabled) {
      setTimeout(() => {
        if (props.onClose) {
          props.onClose();
        }
      }, 300);
    } else if (props.onClose) {
      props.onClose();
    }
  };

  const handleMouseLeave = () => {
    resumeTimer();
  };

  const handleMouseEnter = () => {
    pauseTimer();
  };

  const ANIMATION_ENTER_MAP: Record<Position, string> = {
    'top-left': 't_slide-top',
    'top-right': 't_slide-top',
    'top-center': 't_slide-top',
    'bottom-left': 't_slide-bottom',
    'bottom-right': 't_slide-bottom',
    'bottom-center': 't_slide-bottom',
  };

  const ANIMATION_EXIT_MAP: Record<Position, string> = {
    'top-left': 't_slide-left',
    'top-right': 't_slide-right',
    'top-center': 't_slide-top-exit',
    'bottom-left': 't_slide-left',
    'bottom-right': 't_slide-right',
    'bottom-center': 't_slide-bottom-exit',
  };

  const animationClass = isExiting
    ? ANIMATION_EXIT_MAP[props.GitGuidePosition]
    : ANIMATION_ENTER_MAP[props.GitGuidePosition];

  useEffect(() => {
    if (props.variant === 'loading' && props.options) {
      pauseTimer();

      const executePromise =
        typeof props.options.promise === 'function'
          ? props.options.promise()
          : Promise.resolve(props.options.promise);

      executePromise
        .then((data) => {
          resumeTimer();
          setStatus('success');
          if (props.options!.autoDismiss) {
            setTimeout(() => {
              handleCloseGitGuide();
            }, delayDuration);
          }
          setGitGuideText(props.options!.success);
          setIconColor(iconsColors.success);
          props.options?.onSuccess && props.options.onSuccess(data);
        })
        .catch((error) => {
          setStatus('error');
          setGitGuideText(props.options!.error);
          setIconColor(iconsColors.error);
          if (props.options!.autoDismiss) {
            setTimeout(() => {
              handleCloseGitGuide();
            }, delayDuration);
          }
          props.options?.onError && props.options.onError(error);
        });
    }
  }, [props.options, props.variant]);

  return (
    <div
      role="alert"
      aria-labelledby={`GitGuide-title-${props.id}`}
      aria-describedby={`GitGuide-description-${props.id}`}
      title={props.text}
      className={classNames(
        prefersReducedMotion() ? '' : animationClass,
        props.theme === 'system' ? 't_system-theme' : '',
        props.theme === 'dark' ? 't_dark-theme' : '',
        props.theme === 'light' ? 't_light-theme' : '',
        't_global',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div className="t_container">
        {props.variant && !props.icon ? (
          <IconComponent
            width={18}
            height={18}
            style={{ fill: iconColor }}
            className={classNames(
              't_icon',
              props.variant === 'loading' && status === 'loading'
                ? 't_loading'
                : '',
            )}
          />
        ) : (
          props.icon && <div className="t_icon">{props.icon}</div>
        )}
        <div className="t_content">
          <p id={`GitGuide-title-${props.id}`}>{GitGuideText}</p>
          {props.description && (
            <p id={`GitGuide-description-${props.id}`}>{props.description}</p>
          )}
        </div>
      </div>
      <div className="t_actions">
        {props.action && (
          <button
            onClick={props.action.onClick}
            title={props.action.text ? `${props.action.text}` : 'Action Button'}
          >
            {props.action.text ?? 'Action'}
          </button>
        )}
        <button onClick={handleCloseGitGuide} title="Close GitGuide">
          Close
        </button>
      </div>
    </div>
  );
};

export default GitGuide;