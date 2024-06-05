/**
 * @file Defines a class for creating CSS transitions. This class allows for
 * multiple properties to be transitioned with a single duration and easing
 * function. This class is chainable, allowing for easy customization of
 * transitions. The build() method returns a string that can be used in a CSS
 * transition property.
 * @author rowan-gud
 */

let defaultDuration = '300ms';
let defaultEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

export function configureTransitionDefaults({
  duration,
  easing,
}: {
  duration?: string;
  easing?: string;
}) {
  if (duration !== undefined) {
    defaultDuration = duration;
  }

  if (easing !== undefined) {
    defaultEasing = easing;
  }
}

/** */
class Transition {
  constructor(
    private readonly properties: string[],
    private readonly durationValue: string = defaultDuration,
    private readonly easingValue: string = defaultEasing,
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
  public duration(duration: string | number): Transition {
    const numberDuration = Number(duration);

    return new Transition(
      this.properties,
      Number.isNaN(numberDuration)
        ? (duration as string)
        : `${numberDuration}ms`,
      this.easingValue,
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
  public easing(easing: string): Transition {
    return new Transition(
      this.properties,
      this.durationValue,
      easing,
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
    return new Transition(
      this.properties,
      this.durationValue,
      this.easingValue,
      [...this.otherTransitions, ...transitions],
    );
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
    const self = this.properties
      .map(
        (property) => `${property} ${this.durationValue} ${this.easingValue}`,
      )
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
export function transition(...properties: string[]): Transition {
  return new Transition(properties);
}
