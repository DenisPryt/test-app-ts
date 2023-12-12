import { ThemedStyledProps } from "styled-components";
import { ITheme } from "./theme";
import { Color, getColor } from "./color";

export const getBorder = (borderStyle: string, color: Color = 'primary') => {
  return <PropsT>({theme: {palette, shape: {borderWidth}}}: ThemedStyledProps<PropsT, ITheme>) => {
    return `${borderWidth} ${borderStyle} ${getColor(palette, color)};`
  };
};

type BorderPlace = 'all' | 'bottom' | 'top';

export const getBorderRadius = (place: BorderPlace = 'all') => {
  return <PropsT>({theme: {shape: {borderRadius}}}: ThemedStyledProps<PropsT, ITheme>) => {
    switch (place) {
      case 'all' : return `${borderRadius};`;
      case 'top' : return `${borderRadius} ${borderRadius} 0 0;`;
      case 'bottom' : return `0 0 ${borderRadius} ${borderRadius};`;
    }
  };
}
