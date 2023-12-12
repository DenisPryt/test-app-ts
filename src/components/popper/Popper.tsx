import styled from 'styled-components';
import React, { forwardRef, PropsWithChildren } from 'react';

import { FullScreenContainer } from '../full-screen-container';
import { FullScreenOverlay } from '../full-screen-overlay';
import { Portal } from '../portal';

const Container = styled.section<{width?: number}>`
  ${({width}) => width && `width: ${width}px;`}
`;

interface IPopperProps {
  expanded?: boolean;
  mountContainer?: HTMLElement | null;
  onClose?: () => void;
  width?: number;
  className?: string;
}

export const Popper = forwardRef<HTMLDivElement, PropsWithChildren<IPopperProps>>(
  ({children, expanded, mountContainer, onClose, width, className}, ref) => {
    if (!expanded) {
      return null;
    }

    return (
      <Portal container={mountContainer}>
        <FullScreenContainer>
          <FullScreenOverlay background='none' onClick={onClose} />
          <Container ref={ref} width={width} className={className}>
            {children}
          </Container>
        </FullScreenContainer>
      </Portal>
    );
  }
);
