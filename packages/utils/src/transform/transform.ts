import { Operand } from '../calc';

function coerceValue(value: Operand, unit: string): string {
  if (value === 0) {
    return '0';
  }

  return Number.isNaN(Number(value))
    ? value.toString()
    : `${Number(value)}${unit}`;
}

class Transform {
  constructor(private readonly transforms: string[] = []) {}

  public matrix(
    a1: number,
    b1: number,
    a2: number,
    b2: number,
    a4: number,
    b4: number,
  ): Transform {
    return new Transform([
      ...this.transforms,
      `matrix(${a1}, ${b1}, ${a2}, ${b2}, ${a4}, ${b4})`,
    ]);
  }

  public matrix3d(
    a1: number,
    b1: number,
    c1: number,
    d1: number,
    a2: number,
    b2: number,
    c2: number,
    d2: number,
    a3: number,
    b3: number,
    c3: number,
    d3: number,
    a4: number,
    b4: number,
    c4: number,
    d4: number,
  ): Transform {
    return new Transform([
      ...this.transforms,
      `matrix3d(${a1}, ${b1}, ${c1}, ${d1}, ${a2}, ${b2}, ${c2}, ${d2}, ${a3}, ${b3}, ${c3}, ${d3}, ${a4}, ${b4}, ${c4}, ${d4})`,
    ]);
  }

  public perspective(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `perspective(${coerceValue(value, 'px')})`,
    ]);
  }

  public rotate(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `rotate(${coerceValue(value, 'deg')})`,
    ]);
  }

  public rotate3d(x: number, y: number, z: number, angle: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `rotate3d(${x}, ${y}, ${z}, ${coerceValue(angle, 'deg')})`,
    ]);
  }

  public rotateX(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `rotateX(${coerceValue(value, 'deg')})`,
    ]);
  }

  public rotateY(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `rotateY(${coerceValue(value, 'deg')})`,
    ]);
  }

  public rotateZ(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `rotateZ(${coerceValue(value, 'deg')})`,
    ]);
  }

  public scale(x: Operand, y: Operand = x): Transform {
    return new Transform([...this.transforms, `scale(${x}, ${y})`]);
  }

  public scale3d(x: number, y: number, z: number): Transform {
    return new Transform([...this.transforms, `scale3d(${x}, ${y}, ${z})`]);
  }

  public scaleX(value: number): Transform {
    return new Transform([...this.transforms, `scaleX(${value})`]);
  }

  public scaleY(value: number): Transform {
    return new Transform([...this.transforms, `scaleY(${value})`]);
  }

  public scaleZ(value: number): Transform {
    return new Transform([...this.transforms, `scaleZ(${value})`]);
  }

  public skew(x: Operand, y: Operand = 0): Transform {
    return new Transform([
      ...this.transforms,
      `skew(${coerceValue(x, 'deg')}, ${coerceValue(y, 'deg')})`,
    ]);
  }

  public skewX(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `skewX(${coerceValue(value, 'deg')})`,
    ]);
  }

  public skewY(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `skewY(${coerceValue(value, 'deg')})`,
    ]);
  }

  public translate(x: Operand, y: Operand = 0): Transform {
    return new Transform([
      ...this.transforms,
      `translate(${coerceValue(x, 'px')}, ${coerceValue(y, 'px')})`,
    ]);
  }

  public translate3d(x: Operand, y: Operand, z: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `translate3d(${coerceValue(x, 'px')}, ${coerceValue(
        y,
        'px',
      )}, ${coerceValue(z, 'px')})`,
    ]);
  }

  public translateX(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `translateX(${coerceValue(value, 'px')})`,
    ]);
  }

  public translateY(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `translateY(${coerceValue(value, 'px')})`,
    ]);
  }

  public translateZ(value: Operand): Transform {
    return new Transform([
      ...this.transforms,
      `translateZ(${coerceValue(value, 'px')})`,
    ]);
  }

  public toString(): string {
    return this.transforms.join(' ');
  }
}

export function transform(): Transform {
  return new Transform();
}
