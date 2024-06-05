import { px } from '../unit';

let unitPx = 4;

export function configureSpacingDefaults({
  unitPx: newUnitPx,
}: {
  unitPx?: number;
}) {
  if (newUnitPx !== undefined) {
    unitPx = newUnitPx;
  }
}

export function spacing(value?: number): string {
  return px((value ?? 1) * unitPx);
}
