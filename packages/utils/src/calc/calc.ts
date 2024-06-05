/**
 * @file Defines a class for creating CSS calc() functions. This class allows
 * for chaining operations to build up a calc() function.
 * @author rowan-gud
 * @author michaeltaranto
 * @author markdalgleish
 */

type NonCalcFunctions =
  | 'min'
  | 'max'
  | 'clamp'
  | 'acos'
  | 'asin'
  | 'atan'
  | 'atan2'
  | 'cos'
  | 'sin'
  | 'tan'
  | 'sqrt'
  | 'log'
  | 'exp'
  | 'abs'
  | 'pow'
  | 'round'
  | 'ceil'
  | 'floor';
/**
 * An input to a calc function. Can be a number, string, or another Calc
 * instance.
 *
 * NOTE: Unlike a lot of other places in this library, numbers will not be
 * interpreted as pixel values since they can be used to represent unitless
 * values.
 */
export type Operand = string | number | Calc;

class Calc {
  private static isTerm(op: Calc): boolean {
    return op instanceof Calc && (op.operator === '+' || op.operator === '-');
  }

  private static isFactor(op: Calc): boolean {
    return op instanceof Calc && (op.operator === '*' || op.operator === '/');
  }

  private static isFn(op: Calc): boolean {
    return op instanceof Calc && op.fn !== 'calc';
  }

  /**
   * The expressions to combine with the operator
   */
  private readonly expressions: string[];

  constructor(
    exprs: Operand[],
    /**
     * The operator to use when combining the expressions. If undefined, the
     * Calc instance only has one expression.
     */
    private readonly operator?: '+' | '-' | '*' | '/',
    private readonly fn: 'calc' | NonCalcFunctions = 'calc',
  ) {
    const thisIsFactor = Calc.isFactor(this);
    const thisIsFn = Calc.isFn(this);

    this.expressions = exprs.map((e) => {
      if (thisIsFactor && e instanceof Calc && Calc.isTerm(e)) {
        return `(${e.build()})`;
      } else if (thisIsFn || (e instanceof Calc && Calc.isFn(e))) {
        return e.toString();
      } else if (e instanceof Calc) {
        return e.build();
      }

      return e.toString();
    });
  }

  /**
   * Add operands to the current Calc instance
   *
   * @param operands - The operands to add
   * @returns A new Calc instance with the added operands
   * @example
   * ```ts
   * const result = calc(1).add(3);
   *
   * expect(result.toString()).toBe('calc(1 + 3)');
   * ```
   */
  public add(...operands: Operand[]): Calc {
    return new Calc([this, ...operands], '+');
  }

  /**
   * Subtract operands from the current Calc instance
   *
   * @param operands - The operands to subtract
   * @returns A new Calc instance with the subtracted operands
   * @example
   * ```ts
   * const result = calc(1).subtract(3);
   *
   * expect(result.toString()).toBe('calc(1 - 3)');
   * ```
   */
  public subtract(...operands: Operand[]): Calc {
    return new Calc([this, ...operands], '-');
  }

  /**
   * Multiply operands with the current Calc instance. If any of the operands
   * are Calc instances with the operator '+' or '-', they will be wrapped in
   * parentheses.
   *
   * @param operands - The operands to multiply
   * @returns A new Calc instance with the multiplied operands
   * @example
   * ```ts
   * const result = calc(1).multiply(3);
   *
   * expect(result.toString()).toBe('calc(1 * 3)');
   *
   * const result2 = calc(1).add(2, 3).multiply(4);
   *
   * expect(result2.toString()).toBe('calc((1 + 2 + 3) * 4)');
   * ```
   */
  public multiply(...operands: Operand[]): Calc {
    return new Calc([this, ...operands], '*');
  }

  /**
   * Divide the current Calc instance by the operands. If any of the operands
   * are Calc instances with the operator '+' or '-', they will be wrapped in
   * parentheses.
   *
   * @param operands - The operands to divide by
   * @returns A new Calc instance with the divided operands
   * @example
   * ```ts
   * const result = calc(1).divide(2);
   *
   * expect(result.toString()).toBe('calc(1 / 2)');
   * ```
   */
  public divide(...operands: Operand[]): Calc {
    return new Calc([this, ...operands], '/');
  }

  /**
   * Negate the current Calc instance. If the current Calc instance has the
   * operator '+' or '-', it will be wrapped in parentheses.
   *
   * @returns A new Calc instance with the negated value
   * @example
   * ```ts
   * const result = calc(1).negate();
   *
   * expect(result.toString()).toBe('calc(1 * -1)');
   *
   * const result2 = calc(1).add(3).negate();
   *
   * expect(result2.toString()).toBe('calc((1 + 3) * -1)');
   * ```
   */
  public negate(): Calc {
    return new Calc([-1, this], '*');
  }

  /**
   * Get the minimum value of the current Calc instance and the operands
   * provided
   *
   * @param operands - The operands to compare with the current Calc instance
   * @returns A new Calc instance with the minimum value
   * @example
   * ```ts
   * const result = calc(1).min(3);
   *
   * expect(result.toString()).toBe('calc(min(1, 3))');
   * ```
   */
  public min(...operands: Operand[]): Calc {
    return new Calc([this, ...operands], undefined, 'min');
  }

  /**
   * Get the maximum value of the current Calc instance and the operands
   * provided
   *
   * @param operands - The operands to compare with the current Calc instance
   * @returns A new Calc instance with the maximum value
   * @example
   * ```ts
   * const result = calc(1).max(3);
   *
   * expect(result.toString()).toBe('calc(max(1, 3))');
   * ```
   */
  public max(...operands: Operand[]): Calc {
    return new Calc([this, ...operands], undefined, 'max');
  }

  /**
   * Clamp the current Calc instance between the min and max operands provided
   *
   * @param min - The minimum value to clamp the current Calc instance to
   * @param max - The maximum value to clamp the current Calc instance to
   * @returns A new Calc instance with the clamped value
   * @example
   * ```ts
   * const result = calc(1).clamp(0, 3);
   *
   * expect(result.toString()).toBe('calc(clamp(1, 0, 3))');
   * ```
   */
  public clamp(min: Operand, max: Operand): Calc {
    return new Calc([this, min, max], undefined, 'clamp');
  }

  /**
   * Get the arccosine of the current Calc instance
   *
   * @returns A new Calc instance with the arccosine value
   * @example
   * ```ts
   * const result = calc(1).acos();
   *
   * expect(result.toString()).toBe('calc(acos(1))');
   * ```
   */
  public acos(): Calc {
    return new Calc([this], undefined, 'acos');
  }

  /**
   * Get the arcsine of the current Calc instance
   *
   * @returns A new Calc instance with the arcsine value
   * @example
   * ```ts
   * const result = calc(1).asin();
   *
   * expect(result.toString()).toBe('calc(asin(1))');
   * ```
   */
  public asin(): Calc {
    return new Calc([this], undefined, 'asin');
  }

  /**
   * Get the arctangent of the current Calc instance
   *
   * @returns A new Calc instance with the arctangent value
   * @example
   * ```ts
   * const result = calc(1).atan();
   *
   * expect(result.toString()).toBe('calc(atan(1))');
   * ```
   */
  public atan(): Calc {
    return new Calc([this], undefined, 'atan');
  }

  /**
   * Get the arctangent of the current Calc instance divided by the operand
   * provided
   *
   * @param y - The operand to divide the arctangent by
   * @returns A new Calc instance with the arctangent value divided by the
   * operand
   * @example
   * ```ts
   * const result = calc(1).atan2(3);
   *
   * expect(result.toString()).toBe('calc(atan2(1, 3))');
   * ```
   */
  public atan2(y: Operand): Calc {
    return new Calc([this, y], undefined, 'atan2');
  }

  /**
   * Get the cosine of the current Calc instance
   *
   * @returns A new Calc instance with the cosine value
   * @example
   * ```ts
   * const result = calc(1).cos();
   *
   * expect(result.toString()).toBe('calc(cos(1))');
   * ```
   */
  public cos(): Calc {
    return new Calc([this], undefined, 'cos');
  }

  /**
   * Get the sine of the current Calc instance
   *
   * @returns A new Calc instance with the sine value
   * @example
   * ```ts
   * const result = calc(1).sin();
   *
   * expect(result.toString()).toBe('calc(sin(1))');
   * ```
   */
  public sin(): Calc {
    return new Calc([this], undefined, 'sin');
  }

  /**
   * Get the tangent of the current Calc instance
   *
   * @returns A new Calc instance with the tangent value
   * @example
   * ```ts
   * const result = calc(1).tan();
   *
   * expect(result.toString()).toBe('calc(tan(1))');
   * ```
   */
  public tan(): Calc {
    return new Calc([this], undefined, 'tan');
  }

  /**
   * Get the square root of the current Calc instance
   *
   * @returns A new Calc instance with the square root value
   * @example
   * ```ts
   * const result = calc(1).sqrt();
   *
   * expect(result.toString()).toBe('calc(sqrt(1))');
   * ```
   */
  public sqrt(): Calc {
    return new Calc([this], undefined, 'sqrt');
  }

  /**
   * Get the logarithm of the current Calc instance with the base provided. The
   * default base is e.
   *
   * @param base - The base of the logarithm
   * @returns A new Calc instance with the natural logarithm value
   * @example
   * ```ts
   * const result = calc(1).log();
   *
   * expect(result.toString()).toBe('calc(log(1))');
   * ```
   */
  public log(base?: Operand): Calc {
    if (base !== undefined) {
      return new Calc([this, base], undefined, 'log');
    }

    return new Calc([this], undefined, 'log');
  }

  /**
   * Get the exponential value of the current Calc instance. That is, e raised
   * to the power of the current Calc instance.
   *
   * @returns A new Calc instance with the exponential value
   * @example
   * ```ts
   * const result = calc(1).exp();
   *
   * expect(result.toString()).toBe('calc(exp(1))');
   * ```
   */
  public exp(): Calc {
    return new Calc([this], undefined, 'exp');
  }

  /**
   * Get the absolute value of the current Calc instance
   *
   * NOTE: This is not a widely supported function. Consider using the max
   * function (`calc(1).max(calc(1).negate())`) instead.
   *
   * @returns A new Calc instance with the absolute value
   * @example
   * ```ts
   * const result = calc(1).abs();
   *
   * expect(result.toString()).toBe('calc(abs(1))');
   * ```
   */
  public abs(): Calc {
    return new Calc([this], undefined, 'abs');
  }

  /**
   * Get the current Calc instance raised to the power of the exponent provided
   *
   * @param exponent - The exponent to raise the current Calc instance to
   * @returns A new Calc instance with the power value
   * @example
   * ```ts
   * const result = calc(1).pow(3);
   *
   * expect(result.toString()).toBe('calc(pow(1, 3))');
   * ```
   */
  public pow(exponent: Operand): Calc {
    return new Calc([this, exponent], undefined, 'pow');
  }

  /**
   * Round the current Calc instance to the nearest integer
   *
   * @returns A new Calc instance with the rounded value
   * @example
   * ```ts
   * const result = calc(1.5).round();
   *
   * expect(result.toString()).toBe('calc(round(1.5))');
   * ```
   */
  public round(): Calc {
    return new Calc([this], undefined, 'round');
  }

  /**
   * Get the smallest integer greater than or equal to the current Calc
   * instance
   *
   * @returns A new Calc instance with the ceiling value
   * @example
   * ```ts
   * const result = calc(1.5).ceil();
   *
   * expect(result.toString()).toBe('calc(ceil(1.5))');
   * ```
   */
  public ceil(): Calc {
    return new Calc([this], undefined, 'ceil');
  }

  /**
   * Get the largest integer less than or equal to the current Calc instance
   *
   * @returns A new Calc instance with the floor value
   * @example
   * ```ts
   * const result = calc(1.5).floor();
   *
   * expect(result.toString()).toBe('calc(floor(1.5))');
   * ```
   */
  public floor(): Calc {
    return new Calc([this], undefined, 'floor');
  }

  /**
   * Build the current Calc instance into a CSS calc() function
   *
   * @returns The CSS calc() function
   * @example
   * ```ts
   * const result = calc(1).add(3);
   *
   * expect(result.toString()).toBe('calc(1 + 3)');
   * ```
   */
  public toString(): string {
    return `${this.fn}(${this.build()})`;
  }

  /**
   * Convert the current Calc instance to a string
   *
   * NOTE: This is not the same as calling toString(). The resulting string will
   * not be wrapped in a calc() function
   *
   * @returns The string representation of the Calc instance
   * @example
   * ```ts
   * const result = calc(1).add(3);
   *
   * expect(result.build()).toBe('1 + 3');
   * ```
   */
  private build(): string {
    if (this.operator === undefined) {
      return this.expressions.join(', ');
    }

    return this.expressions.join(` ${this.operator} `);
  }
}

/**
 * Create a new Calc instance with the given operand
 *
 * @param x - The operand to create the Calc instance with
 * @returns A new Calc instance
 * @example
 * ```ts
 * const headerHeight = createVar()
 *
 * const root = style({
 *  height: calc(headerHeight)
 *    .divide(2)
 *    .toString(),
 * })
 * ```
 */
export function calc(x: Operand): Calc {
  return new Calc([x]);
}

/**
 * Create a new Calc instance with the value of e multiplied by the factor
 * provided
 *
 * @param [factor=1] - The factor to multiply e by
 * @returns A new Calc instance with the value of e multiplied by the factor
 * @example
 * ```ts
 * const result = e(2);
 *
 * expect(result.toString()).toBe('calc(2 * e)');
 * ```
 */
export function e(factor: number = 1): Calc {
  if (factor === 1) {
    return new Calc(['e']);
  }

  return new Calc([factor, 'e'], '*');
}

/**
 * Create a new Calc instance with the value of pi multiplied by the factor
 * provided
 *
 * @param [factor=1] - The factor to multiply pi by
 * @returns A new Calc instance with the value of pi multiplied by the factor
 * @example
 * ```ts
 * const result = pi(2);
 *
 * expect(result.toString()).toBe('calc(2 * pi)');
 * ```
 */
export function pi(factor: number = 1): Calc {
  if (factor === 1) {
    return new Calc(['pi']);
  }

  return new Calc([factor, 'pi'], '*');
}

/**
 * Create a new Calc instance with the value of infinity
 *
 * @param [isNegative=false] - Whether the value should be negative infinity
 * @returns A new Calc instance with the value of infinity
 * @example
 * ```ts
 * const result = inf();
 *
 * expect(result.build()).toBe('infinity');
 * expect(result.toString()).toBe('calc(infinity)');
 *
 * const result2 = inf(true);
 *
 * expect(result2.toString()).toBe('calc(-infinity)');
 * ```
 */
export function inf(isNegative: boolean = false): Calc {
  if (isNegative) {
    return new Calc(['-infinity']);
  }

  return new Calc(['infinity']);
}

/**
 * Create a new Calc instance with the value of NaN
 *
 * @returns A new Calc instance with the value of NaN
 * @example
 * ```ts
 * const result = nan();
 *
 * expect(result.toString()).toBe('calc(NaN)');
 * ```
 */
export function nan(): Calc {
  return new Calc(['NaN']);
}

/**
 * Create a new min Calc instance with the operands provided
 *
 * @param operands - The operands to compare
 * @returns A new Calc instance with the minimum value
 * @example
 * ```ts
 * const result = min(1, 3);
 *
 * expect(result.toString()).toBe('min(1, 3)');
 */
export function min(...operands: Operand[]): Calc {
  return new Calc(operands, undefined, 'min');
}

/**
 * Create a new max Calc instance with the operands provided
 *
 * @param operands - The operands to compare
 * @returns A new Calc instance with the maximum value
 * @example
 * ```ts
 * const result = max(1, 3);
 *
 * expect(result.toString()).toBe('max(1, 3)');
 */
export function max(...operands: Operand[]): Calc {
  return new Calc(operands, undefined, 'max');
}

/**
 * Create a new clamp Calc instance with the operands provided
 *
 * @param min - The minimum value to clamp to
 * @param value - The value to clamp
 * @param max - The maximum value to clamp to
 * @returns A new Calc instance with the clamped value
 * @example
 * ```ts
 * const result = clamp(0, 1, 3);
 *
 * expect(result.toString()).toBe('clamp(0, 1, 3)');
 */
export function clamp(min: Operand, value: Operand, max: Operand): Calc {
  return new Calc([min, value, max], undefined, 'clamp');
}

/**
 * Create a new acos Calc instance with the operand provided
 *
 * @param value - The operand to get the arccosine of
 * @returns A new Calc instance with the arccosine value
 * @example
 * ```ts
 * const result = acos(1);
 *
 * expect(result.toString()).toBe('acos(1)');
 */
export function acos(value: Operand): Calc {
  return new Calc([value], undefined, 'acos');
}

/**
 * Create a new asin Calc instance with the operand provided
 *
 * @param value - The operand to get the arcsine of
 * @returns A new Calc instance with the arcsine value
 * @example
 * ```ts
 * const result = asin(1);
 *
 * expect(result.toString()).toBe('asin(1)');
 */
export function asin(value: Operand): Calc {
  return new Calc([value], undefined, 'asin');
}

/**
 * Create a new atan Calc instance with the operand provided
 *
 * @param value - The operand to get the arctangent of
 * @returns A new Calc instance with the arctangent value
 * @example
 * ```ts
 * const result = atan(1);
 *
 * expect(result.toString()).toBe('atan(1)');
 */
export function atan(value: Operand): Calc {
  return new Calc([value], undefined, 'atan');
}

/**
 * Create a new atan2 Calc instance with the operands provided
 *
 * @param x - The x operand
 * @param y - The y operand
 * @returns A new Calc instance with the arctangent value
 * @example
 * ```ts
 * const result = atan2(1, 3);
 *
 * expect(result.toString()).toBe('atan2(1, 3)');
 */
export function atan2(x: Operand, y: Operand): Calc {
  return new Calc([x, y], undefined, 'atan2');
}

/**
 * Create a new cos Calc instance with the operand provided
 *
 * @param value - The operand to get the cosine of
 * @returns A new Calc instance with the cosine value
 * @example
 * ```ts
 * const result = cos(1);
 *
 * expect(result.toString()).toBe('cos(1)');
 */
export function cos(value: Operand): Calc {
  return new Calc([value], undefined, 'cos');
}

/**
 * Create a new sin Calc instance with the operand provided
 *
 * @param value - The operand to get the sine of
 * @returns A new Calc instance with the sine value
 * @example
 * ```ts
 * const result = sin(1);
 *
 * expect(result.toString()).toBe('sin(1)');
 */
export function sin(value: Operand): Calc {
  return new Calc([value], undefined, 'sin');
}

/**
 * Create a new tan Calc instance with the operand provided
 *
 * @param value - The operand to get the tangent of
 * @returns A new Calc instance with the tangent value
 * @example
 * ```ts
 * const result = tan(1);
 *
 * expect(result.toString()).toBe('tan(1)');
 */
export function tan(value: Operand): Calc {
  return new Calc([value], undefined, 'tan');
}

/**
 * Create a new sqrt Calc instance with the operand provided
 *
 * @param value - The operand to get the square root of
 * @returns A new Calc instance with the square root value
 * @example
 * ```ts
 * const result = sqrt(1);
 *
 * expect(result.toString()).toBe('sqrt(1)');
 */
export function sqrt(value: Operand): Calc {
  return new Calc([value], undefined, 'sqrt');
}

/**
 * Create a new log Calc instance with the value and base provided. If the base
 * is not provided, the natural logarithm is used.
 *
 * @param value - The operand to get the logarithm of
 * @param [base] - The base of the logarithm
 * @returns A new Calc instance with the logarithm value
 * @example
 * ```ts
 * const result = log(1);
 *
 * expect(result.toString()).toBe('log(1)');
 *
 * const result2 = log(1, 10);
 *
 * expect(result2.toString()).toBe('log(1, 10)');
 */
export function log(value: Operand, base?: Operand): Calc {
  if (base !== undefined) {
    return new Calc([value, base], undefined, 'log');
  }

  return new Calc([value], undefined, 'log');
}

/**
 * Create a new exp Calc instance with the operand provided
 *
 * @param value - The operand to get the exponential value of
 * @returns A new Calc instance with the exponential value
 * @example
 * ```ts
 * const result = exp(1);
 *
 * expect(result.toString()).toBe('exp(1)');
 */
export function exp(value: Operand): Calc {
  return new Calc([value], undefined, 'exp');
}

/**
 * Create a new abs Calc instance with the operand provided
 *
 * NOTE: This is not a widely supported function. Consider using the max
 * function (`calc(1).max(calc(1).negate())`) instead.
 *
 * @param value - The operand to get the absolute value of
 * @returns A new Calc instance with the absolute value
 * @example
 * ```ts
 * const result = abs(1);
 *
 * expect(result.toString()).toBe('abs(1)');
 */
export function abs(value: Operand): Calc {
  return new Calc([value], undefined, 'abs');
}

/**
 * Create a new pow Calc instance with the base and exponent provided
 *
 * @param base - The base of the power
 * @param exponent - The exponent to raise the base to
 * @returns A new Calc instance with the power value
 * @example
 * ```ts
 * const result = pow(1, 3);
 *
 * expect(result.toString()).toBe('pow(1, 3)');
 */
export function pow(base: Operand, exponent: Operand): Calc {
  return new Calc([base, exponent], undefined, 'pow');
}

/**
 * Create a new round Calc instance with the operand provided
 *
 * @param value - The operand to round
 * @returns A new Calc instance with the rounded value
 * @example
 * ```ts
 * const result = round(1.5);
 *
 * expect(result.toString()).toBe('round(1.5)');
 */
export function round(value: Operand): Calc {
  return new Calc([value], undefined, 'round');
}

/**
 * Create a new ceil Calc instance with the operand provided
 *
 * @param value - The operand to get the ceiling of
 * @returns A new Calc instance with the ceiling value
 * @example
 * ```ts
 * const result = ceil(1.5);
 *
 * expect(result.toString()).toBe('ceil(1.5)');
 */
export function ceil(value: Operand): Calc {
  return new Calc([value], undefined, 'ceil');
}

/**
 * Create a new floor Calc instance with the operand provided
 *
 * @param value - The operand to get the floor of
 * @returns A new Calc instance with the floor value
 * @example
 * ```ts
 * const result = floor(1.5);
 *
 * expect(result.toString()).toBe('floor(1.5)');
 */
export function floor(value: Operand): Calc {
  return new Calc([value], undefined, 'floor');
}

/**
 * Create a new random Calc instance with the scale and offset provided
 *
 * @param [scale=1] - The scale of the random value
 * @param [offset=0] - The offset of the random value
 * @returns A new Calc instance with the random value
 * @example
 * ```ts
 * const result = random();
 *
 * expect(result.toString()).toMatch(/^calc\(\d+(\.\d+)?\)$/);
 *
 * const result2 = random(10);
 *
 * expect(result2.toString()).toMatch(/^calc\(\d+(\.\d+)?\)$/);
 *
 * const result3 = random(10, 5);
 *
 * expect(result3.toString()).toMatch(/^calc\(\d+(\.\d+)?\)$/);
 */
export function random(scale: number = 1, offset: number = 0) {
  const val = Math.random() * scale + offset;

  return new Calc([val]);
}
