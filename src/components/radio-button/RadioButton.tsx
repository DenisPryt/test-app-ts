import styled from "styled-components";
import { flexContainerCenter } from "../../styles/css/flex-container-center";

export const RadioButton = styled.input.attrs(() => ({ type: 'radio' }))`
  appearance: none;

  ${flexContainerCenter}

  width: 1.6em;
  height: 1.6em;
  color: ${({theme: {palette}}) => palette.secondary};
  border: ${({theme: {shape: {borderWidth}, palette}}) => `${borderWidth} solid ${palette.secondary}`};
  border-radius: 50%;

  cursor: pointer;

  &:checked {
    position: relative;
    border-color: ${({theme: {palette}}) => palette.primary};
  }

  &:before {
    content: "";
    background-color: ${({theme: {palette}}) => palette.primary};
    width: 50%;
    height: 50%;
    border-radius: 50%;

    transform: scale(0);
    transition: 0.1s transform ease-in-out;
  }

  &:checked:before {
    transform: scale(1);
  }
`;
