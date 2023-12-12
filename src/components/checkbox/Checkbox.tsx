import styled from "styled-components";
import { flexContainerCenter } from "../../styles/css/flex-container-center";

export const Checkbox = styled.input.attrs(() => ({type: 'checkbox'}))`
  appearance: none;

  ${flexContainerCenter}

  width: 1.6em;
  height: 1.6em;
  color: ${({theme: {palette}}) => palette.secondary};
  border: ${({theme: {shape: {borderWidth}, palette}}) => `${borderWidth} solid ${palette.secondary}`};
  border-radius: 0.4rem;

  cursor: pointer;

  &:checked {
    position: relative;
    border-color: ${({theme: {palette}}) => palette.primary};
  }

  &:before {
    content: "";
    background-color: ${({theme: {palette}}) => palette.primary};
    width: 80%;
    height: 80%;

    transform: scale(0);
    transition: 0.1s transform ease-in;
    clip-path: polygon(12% 44%, 35% 71%, 89% 18%, 100% 30%, 34% 96%, 0 54%);
  }

  &:checked:before {
    transform: scale(1);
  }
`;