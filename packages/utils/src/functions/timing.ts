import { Percentage } from '../types';

type StepPosition =
  | 'jump-start'
  | 'jump-end'
  | 'jump-none'
  | 'jump-both'
  | 'start'
  | 'end';

export function cubicBezier(
  p1: number,
  p2: number,
  p3: number,
  p4: number,
): string & {} {
  return `cubic-bezier(${p1}, ${p2}, ${p3}, ${p4})`;
}

export function linear(...args: (number | Percentage)[]): string & {} {
  return `linear(${args.join(', ')})`;
}

export function steps(n: number, position: StepPosition): string & {} {
  return `steps(${n}, ${position})`;
}
