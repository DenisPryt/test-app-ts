import styled from "styled-components";
import { Color, getColor } from "../../styles/color";

interface ILabelProps {
  color?: Color;
}

export const Label = styled.label<ILabelProps>`
  color: ${({theme: {palette: {text}}, color}) => getColor(text, color)};
`;
