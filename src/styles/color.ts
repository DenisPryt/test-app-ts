import { IPaletteColors } from "./theme";

export type Color = 'primary' | 'secondary' | string;

export const getColor = (paletteColors: IPaletteColors, color : Color = '') => {
  if (color === 'primary') {
    return paletteColors.primary;  
  }

  if (color === 'secondary') {
    return paletteColors.secondary;
  }

  return color;
};

export const blueColor = '#1976d2';
