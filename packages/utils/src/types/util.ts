import {
  Unit,
  LengthUnit,
  AngleUnit,
  TimeUnit,
  FrequencyUnit,
  ResolutionUnit,
} from './unit';

const DEFAULT_LENGTH_UNIT = 'px';
const DEFAULT_ANGLE_UNIT = 'deg';
const DEFAULT_TIME_UNIT = 'ms';
const DEFAULT_FREQUENCY_UNIT = 'Hz';
const DEFAULT_RESOLUTION_UNIT = 'dpi';

type Numeric = number | `${number}`;

export function coerceToUnit<T extends string | number, U extends Unit = Unit>(
  value: T,
  unit: U,
): T extends Numeric ? `${number}${U}` : T {
  const asNumber = Number(value);

  if (Number.isNaN(asNumber)) {
    return value as `${number}${U}` as any;
  }

  return `${asNumber}${unit}` as any;
}

export function coerceToLength<
  T extends string | number,
  U extends LengthUnit = typeof DEFAULT_LENGTH_UNIT,
>(
  value: T,
  unit: U = DEFAULT_LENGTH_UNIT as U,
): T extends Numeric ? `${number}${U}` : T {
  return coerceToUnit(value, unit);
}

export function coerceToAngle<
  T extends string | number,
  U extends AngleUnit = typeof DEFAULT_ANGLE_UNIT,
>(
  value: T,
  unit: U = DEFAULT_ANGLE_UNIT as U,
): T extends Numeric ? `${number}${U}` : T {
  return coerceToUnit(value, unit);
}

export function coerceToTime<
  T extends string | number,
  U extends TimeUnit = typeof DEFAULT_TIME_UNIT,
>(
  value: T,
  unit: U = DEFAULT_TIME_UNIT as U,
): T extends Numeric ? `${number}${U}` : T {
  return coerceToUnit(value, unit);
}

export function coerceToFrequency<
  T extends string | number,
  U extends FrequencyUnit = typeof DEFAULT_FREQUENCY_UNIT,
>(
  value: T,
  unit: U = DEFAULT_FREQUENCY_UNIT as U,
): T extends Numeric ? `${number}${U}` : T {
  return coerceToUnit(value, unit);
}

export function coerceToResolution<
  T extends string | number,
  U extends ResolutionUnit = typeof DEFAULT_RESOLUTION_UNIT,
>(
  value: T,
  unit: U = DEFAULT_RESOLUTION_UNIT as U,
): T extends Numeric ? `${number}${U}` : T {
  return coerceToUnit(value, unit);
}
