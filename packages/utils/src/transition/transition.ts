/**
 * @file Defines a class for creating CSS transitions. This class allows for
 * multiple properties to be transitioned with a single duration and easing
 * function. This class is chainable, allowing for easy customization of
 * transitions. The build() method returns a string that can be used in a CSS
 * transition property.
 * @author rowan-gud
 */

import { PropertiesHyphen as Properties, Property } from 'csstype';

import { cubicBezier } from '../functions';
import { Time, coerceToTime } from '../types';

export interface TransitionConfig {
  transitionDuration: Property.TransitionDuration<Time>;
  transitionTimingFunction: Property.TransitionTimingFunction;
  transitionDelay?: Property.TransitionDelay<Time>;
}

const defaultConfig: TransitionConfig = {
  transitionDuration: '300ms',
  transitionTimingFunction: cubicBezier(0.4, 0, 0.2, 1),
};

/**
 * Set the default transition configuration
 *
 * @param newConfig - The new default configuration
 * @example
 * ```ts
 * transitionConfigDefaults({
 *  transitionDuration: '1s',
 *  transitionTimingFunction: 'ease-in',
 * });
 * ```
 */
export function transitionConfigDefaults(newConfig: Partial<TransitionConfig>) {
  Object.assign(defaultConfig, newConfig);
}

/** */
class Transition {
  constructor(
    private readonly properties: (keyof Properties)[],
    private readonly configuration: TransitionConfig = { ...defaultConfig },
    private readonly otherTransitions: Transition[] = [],
  ) {}

  /**
   * Set the duration of the transition
   *
   * @param duration - The duration of the transition. Can be a number in
   * milliseconds or a string with a unit (e.g. '300ms'). If the string is
   * missing a unit, 'ms' will be added. eg: '300' -> '300ms'
   * @returns A new Transition instance with the duration set
   * @example
   * ```ts
   * const result = transition('opacity').duration('1s');
   *
   * expect(result.build()).toBe('opacity 1s cubic-bezier(0.4, 0, 0.2, 1)');
   * ```
   */
  public duration(
    duration: Property.TransitionDuration<Time> | number,
  ): Transition {
    return new Transition(
      this.properties,
      {
        ...this.configuration,
        transitionDuration: coerceToTime(duration),
      },
      this.otherTransitions,
    );
  }

  /**
   * Set the easing function of the transition
   *
   * @param easing - The easing function of the transition
   * @returns A new Transition instance with the easing function set
   * @example
   * ```ts
   * const result = transition('opacity').easing('ease-in');
   *
   * expect(result.build()).toBe('opacity 300ms ease-in');
   * ```
   */
  public timingFunction(
    timingFunction: Property.TransitionTimingFunction,
  ): Transition {
    return new Transition(
      this.properties,
      {
        ...this.configuration,
        transitionTimingFunction: timingFunction,
      },
      this.otherTransitions,
    );
  }

  /**
   * Set the delay of the transition
   *
   * @param delay - The delay of the transition. Can be a number in milliseconds
   * or a string with a unit (e.g. '300ms'). If the string is missing a unit,
   * 'ms' will be added. eg: '300' -> '300ms'
   * @returns A new Transition instance with the delay set
   * @example
   * ```ts
   * const result = transition('opacity').delay('1s');
   *
   * expect(result.build()).toBe('opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 1s');
   * ```
   */
  public delay(delay: Property.TransitionDelay<Time> | number): Transition {
    return new Transition(
      this.properties,
      {
        ...this.configuration,
        transitionDelay: coerceToTime(delay),
      },
      this.otherTransitions,
    );
  }

  /**
   * Chain multiple transitions together. This is useful for transitioning
   * multiple properties with different durations and easing functions.
   *
   * @param transitions - The transitions to chain
   * @returns A new Transition instance with the transitions chained
   * @example
   * ```ts
   * const result = transition('opacity').duration('1s').and(transition('transform'));
   *
   * expect(result.build()).toBe(
   *  `opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
   *   transform 300ms cubic-bezier(0.4, 0, 0.2, 1)`
   * );
   * ```
   */
  public and(...transitions: Transition[]): Transition {
    return new Transition(this.properties, this.configuration, [
      ...this.otherTransitions,
      ...transitions,
    ]);
  }

  /**
   * Build the transition string
   *
   * @returns The transition string
   * @example
   * ```ts
   * const result = transition('opacity').build();
   *
   * expect(result).toBe('opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
   * ```
   */
  public toString(): string {
    const cfg = [
      this.configuration.transitionDuration,
      this.configuration.transitionTimingFunction,
      this.configuration.transitionDelay,
    ]
      .filter(Boolean)
      .join(' ');

    const self = this.properties
      .map((property) => `${property} ${cfg}`)
      .join(', ');

    const other = this.otherTransitions.map((transition) =>
      transition.toString(),
    );

    return [self].concat(other).join(', ');
  }
}

/**
 * Create a new Transition instance with the given properties
 *
 * @param properties - The properties to transition
 * @returns A new Transition instance
 * @example
 * ```ts
 * const root = style({
 *  transition: transition('opacity').build(),
 *
 *  ':hover': {
 *    opacity: 0.5,
 *  }
 * })
 * ```
 */
export function transition(...properties: (keyof Properties)[]): Transition {
  return new Transition(properties);
}
