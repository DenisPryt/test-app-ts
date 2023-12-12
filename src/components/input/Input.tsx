import styled from "styled-components";
import { getBorder, getBorderRadius } from "../../styles/border";
import { Color, getColor } from "../../styles/color";

export interface IInputProps {
  color?: Color;
}

export const Input = styled.input<IInputProps>`
  border: ${getBorder('solid')};
  border-radius: ${getBorderRadius('all')};
  padding: 0.5rem 1rem;
  color: ${({theme: {palette}, color}) => getColor(palette, color)};
`;
