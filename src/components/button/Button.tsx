import styled, { css, FlattenInterpolation, ThemedStyledProps } from "styled-components";
import { getBorderRadius } from "../../styles/border";
import { Color, getColor } from "../../styles/color";
import { ITheme } from "../../styles/theme";

type Variant = 'text' | 'contained' | 'outlined';

interface IButtonProps {
  variant?: Variant;
  color?: Color;
}

type ThemedProps = ThemedStyledProps<IButtonProps, ITheme>;

const CSS_BY_VARIANT: Record<Variant, FlattenInterpolation<ThemedProps>> = {
  text: css<ThemedProps>`
    background: none;
    border: none;
    color: ${({color, theme: {palette}}) => getColor(palette, color)};
  `,
  contained: css<ThemedProps>`
    background: ${({color, theme: {palette}}) => getColor(palette, color)};
    border: ${({color, theme: {shape: {borderWidth}, palette}}) => css`${borderWidth} solid ${getColor(palette, color)}`};
    color: white;
  `,
  outlined: css<ThemedProps>`
    background: none;
    border: ${({color, theme: {shape: {borderWidth}, palette}}) => css`${borderWidth} solid ${getColor(palette, color)}`};
    color: ${({color, theme: {palette}}) => getColor(palette, color)};
  `
};

export const Button = styled.button<IButtonProps>`
  ${({variant = 'text'}) => CSS_BY_VARIANT[variant]}
  border-radius: ${getBorderRadius('all')};
  padding: 1rem;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    background: none;
    border: ${({theme: {shape: {borderWidth}, palette}}) => `${borderWidth} solid ${palette.disabled}`};
    color: grey;
    
    cursor: not-allowed;
  }
`;
