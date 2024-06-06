declare const INTEGER_BRAND: unique symbol;

export type Integer = number & { [INTEGER_BRAND]: true };

export type Percentage = `${number}%`;

export type Ratio = `${number}/${number}` | `${number} / ${number}`;

export type Flex = `${number}fr`;

export type LengthUnit =
  | 'cap'
  | 'ch'
  | 'em'
  | 'ex'
  | 'ic'
  | 'lh'
  | 'rcap'
  | 'rch'
  | 'rem'
  | 'rex'
  | 'ric'
  | 'rlh'
  | 'vh'
  | 'vw'
  | 'vmax'
  | 'vmin'
  | 'vb'
  | 'vi'
  | 'cqw'
  | 'cqh'
  | 'cqi'
  | 'cqb'
  | 'cqmin'
  | 'cqmax'
  | 'px'
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pc'
  | 'pt';

export type AngleUnit = 'deg' | 'grad' | 'rad' | 'turn';

export type TimeUnit = 's' | 'ms';

export type FrequencyUnit = 'Hz' | 'kHz';

export type ResolutionUnit = 'dpi' | 'dpcm' | 'dppx' | 'x';

export type Unit =
  | LengthUnit
  | AngleUnit
  | TimeUnit
  | FrequencyUnit
  | ResolutionUnit;

export type Length = `${number}${LengthUnit}` | 0;

export type Angle = `${number}${AngleUnit}` | 0;

export type Time = `${number}${TimeUnit}` | 0;

export type Frequency = `${number}${FrequencyUnit}` | 0;

export type Resolution = `${number}${ResolutionUnit}` | 0;

export type Dimension = Length | Angle | Time | Frequency | Resolution;

export type AlphaValue = number | Percentage;

export type Hue = number | Angle;
