import { Property } from 'csstype';

import { Time, coerceToTime } from '../types';

export interface AnimationConfig {
  animationDuration: Property.AnimationDuration<Time>;
  animationTimingFunction: Property.AnimationTimingFunction;
  animationDelay?: Property.AnimationDelay<Time>;
  animationIterationCount?: Property.AnimationIterationCount;
  animationDirection?: Property.AnimationDirection;
  animationFillMode?: Property.AnimationFillMode;
  animationPlayState?: Property.AnimationPlayState;
}

const config: AnimationConfig = {
  animationDuration: '300ms',
  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export function animationConfigDefaults(newConfig: Partial<AnimationConfig>) {
  Object.assign(config, newConfig);
}

class Animation {
  constructor(
    private readonly keyframes: string[],
    private readonly configuration: AnimationConfig = { ...config },
    private readonly otherAnimations: Animation[] = [],
  ) {}

  public duration(
    duration: Property.AnimationDuration<Time> | number,
  ): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationDuration: coerceToTime(duration),
      },
      this.otherAnimations,
    );
  }

  public timingFunction(
    timingFunction: Property.AnimationTimingFunction,
  ): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationTimingFunction: timingFunction,
      },
      this.otherAnimations,
    );
  }

  public delay(delay: Property.AnimationDelay<Time> | number): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationDelay: coerceToTime(delay),
      },
      this.otherAnimations,
    );
  }

  public iterationCount(
    iterationCount: Property.AnimationIterationCount,
  ): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationIterationCount: iterationCount,
      },
      this.otherAnimations,
    );
  }

  public direction(direction: Property.AnimationDirection): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationDirection: direction,
      },
      this.otherAnimations,
    );
  }

  public fillMode(fillMode: Property.AnimationFillMode): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationFillMode: fillMode,
      },
      this.otherAnimations,
    );
  }

  public playState(playState: Property.AnimationPlayState): Animation {
    return new Animation(
      this.keyframes,
      {
        ...this.configuration,
        animationPlayState: playState,
      },
      this.otherAnimations,
    );
  }

  public and(...animations: Animation[]): Animation {
    return new Animation(this.keyframes, this.configuration, [
      ...this.otherAnimations,
      ...animations,
    ]);
  }

  public toString(): string {
    const cfg = [
      this.configuration.animationDuration,
      this.configuration.animationTimingFunction,
      this.configuration.animationDelay,
      this.configuration.animationIterationCount,
      this.configuration.animationDirection,
      this.configuration.animationFillMode,
      this.configuration.animationPlayState,
    ]
      .filter(Boolean)
      .join(' ');

    const self = this.keyframes
      .map((keyframe) => `${cfg} ${keyframe}`)
      .join(', ');

    const other = this.otherAnimations.map((animation) => animation.toString());

    return [self].concat(other).join(', ');
  }
}

export function animation(...keyframes: string[]): Animation {
  return new Animation(keyframes);
}
