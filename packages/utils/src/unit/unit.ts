// Length

// Relative

// Relative to font

export function cap(value: number = 1): string {
  return `${value}cap`;
}

export function ch(value: number = 1): string {
  return `${value}ch`;
}

export function em(value: number = 1): string {
  return `${value}em`;
}

export function ex(value: number = 1): string {
  return `${value}ex`;
}

export function ic(value: number = 1): string {
  return `${value}ic`;
}

export function lh(value: number = 1): string {
  return `${value}lh`;
}

// Relative to root font

export function rcap(value: number = 1): string {
  return `${value}rcap`;
}

export function rch(value: number = 1): string {
  return `${value}rch`;
}

export function rem(value: number = 1): string {
  return `${value}rem`;
}

export function rex(value: number = 1): string {
  return `${value}rex`;
}

export function ric(value: number = 1): string {
  return `${value}ric`;
}

export function rlh(value: number = 1): string {
  return `${value}rlh`;
}

// Relative to viewport

export function vh(value: number = 1): string {
  return `${value}vh`;
}

export function vw(value: number = 1): string {
  return `${value}vw`;
}

export function vmax(value: number = 1): string {
  return `${value}vmax`;
}

export function vmin(value: number = 1): string {
  return `${value}vmin`;
}

export function vb(value: number = 1): string {
  return `${value}vb`;
}

export function vi(value: number = 1): string {
  return `${value}vi`;
}

// Container query units

export function cqw(value: number = 1): string {
  return `${value}cqw`;
}

export function cqh(value: number = 1): string {
  return `${value}cqh`;
}

export function cqi(value: number = 1): string {
  return `${value}cqi`;
}

export function cqb(value: number = 1): string {
  return `${value}cqb`;
}

export function cqmin(value: number = 1): string {
  return `${value}cqmin`;
}

export function cqmax(value: number = 1): string {
  return `${value}cqmax`;
}

// Absolute

export function px(value: number = 1): string {
  return `${value}px`;
}

export function cm(value: number = 1): string {
  return `${value}cm`;
}

export function mm(value: number = 1): string {
  return `${value}mm`;
}

export function Q(value: number = 1): string {
  return `${value}Q`;
}

export function inch(value: number = 1): string {
  return `${value}in`;
}

export function pc(value: number = 1): string {
  return `${value}pc`;
}

export function pt(value: number = 1): string {
  return `${value}pt`;
}

// Angle

export function deg(value: number = 1): string {
  return `${value}deg`;
}

export function grad(value: number = 1): string {
  return `${value}grad`;
}

export function rad(value: number = 1): string {
  return `${value}rad`;
}

export function turn(value: number = 1): string {
  return `${value}turn`;
}

// Time

export function s(value: number = 1): string {
  return `${value}s`;
}

export function ms(value: number = 1): string {
  return `${value}ms`;
}

// Frequency

export function Hz(value: number = 1): string {
  return `${value}Hz`;
}

export function kHz(value: number = 1): string {
  return `${value}kHz`;
}

// Resolution

export function dpi(value: number = 1): string {
  return `${value}dpi`;
}

export function dpcm(value: number = 1): string {
  return `${value}dpcm`;
}

export function dppx(value: number = 1): string {
  return `${value}dppx`;
}

export function x(value: number = 1): string {
  return `${value}x`;
}

// Flex

export function fr(value: number = 1): string {
  return `${value}fr`;
}

// Percent

export function pct(value: number = 1): string {
  return `${value}%`;
}

export function percent(value: number = 1): string {
  return `${value}%`;
}

// Ratio

export function ratio(n: number, d: number): string {
  return `${n}/${d}`;
}

// Color

export function rgb(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function hsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function hsla(h: number, s: number, l: number, a: number): string {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

export function hwb(h: number, w: number, b: number, a?: number): string {
  return `hwb(${h}, ${w}%, ${b}%${a !== undefined ? `, ${a}` : ''})`;
}

export function lab(l: number, a: number, b: number, alpha?: number): string {
  return `lab(${l}, ${a}, ${b}${alpha !== undefined ? `, ${alpha}` : ''})`;
}

export function lch(l: number, c: number, h: number, a?: number): string {
  return `lch(${l}, ${c}, ${h}${a !== undefined ? `, ${a}` : ''})`;
}

export function oklab(l: number, a: number, b: number, alpha?: number): string {
  return `oklab(${l}, ${a}, ${b}${alpha !== undefined ? `, ${alpha}` : ''})`;
}

export function oklch(l: number, c: number, h: number, alpha?: number): string {
  return `oklch(${l}, ${c}, ${h}${alpha !== undefined ? `, ${alpha}` : ''})`;
}

export function color(from: string, ...args: (string | number)[]): string {
  return `color(${from} ${args.join(', ')})`;
}
