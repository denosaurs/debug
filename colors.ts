import { colors } from "./deps.ts";

export type ColorFunction = (message: string) => string;
export const colorFunctions: ColorFunction[] = [
  colors.red,
  colors.green,
  colors.yellow,
  colors.blue,
  colors.magenta,
  colors.cyan,
];

function hashCode(s: string): number {
  let h = 0;
  let l = s.length;
  let i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
}

export function generateColor(message: string): ColorFunction {
  const hash = Math.abs(hashCode(message));
  return colorFunctions[hash % colorFunctions.length];
}
