import { MouseEventHandler } from "react";
import styled from "styled-components";

interface IFullScreenOverlayProps {
  background: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const FullScreenOverlay = styled.div<IFullScreenOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: ${({background}) => background};

  cursor: pointer;
`;

