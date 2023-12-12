import React, { PropsWithChildren, useState } from 'react';

import styled, { css, StyledComponentPropsWithRef } from 'styled-components';
import { collapseScale } from '../../styles/keyframes/collapse-scale';
import { expandScale } from '../../styles/keyframes/expand-scale';
import { getBorderRadius } from '../../styles/border';

import { FullScreenContainer } from '../full-screen-container';
import { FullScreenOverlay } from '../full-screen-overlay';
import { Portal } from '../portal';

import { useOnPropChange } from '../../hooks/use-on-prop-change';

const ModalWindow = styled.article<{closeInProgress?: boolean}>`
  height: 50%;
  width: 50%;
  background-color: white;
  padding: 1rem;
  border-radius: ${getBorderRadius('all')};
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  
  ${({ closeInProgress }) =>
		closeInProgress
			? css`
					animation: ${collapseScale} 0.2s ease-in forwards;
			  `
			: css`
					animation: ${expandScale} 0.2s ease-out forwards;
			  `}
`;

const modalRootElement = document.getElementById('modal-root');
if (!modalRootElement) {
  console.error('Can not find element with id=modal-root');
}

interface IModalProps extends StyledComponentPropsWithRef<typeof ModalWindow> {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal = ({children, isOpen = false, onClose, onAnimationEnd, ...otherProps}: PropsWithChildren<IModalProps>) => {
  const [closeInProgress, setCloseInProgress] = useState(false);

  useOnPropChange(isOpen, (prevIsOpen, newIsOpen) => {
    setCloseInProgress(!newIsOpen);
  });

  const handleModalWindowAnimationEnd = (e : React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === collapseScale.getName()) {
      setCloseInProgress(false);
    }
    onAnimationEnd?.(e);
  };
  
  if (!isOpen && !closeInProgress) {
    return null;
  }

  return (
    <Portal container={modalRootElement}>
      <FullScreenContainer>
        <FullScreenOverlay background='rgba(0, 0, 0, 0.2)' onClick={onClose} />
        <ModalWindow
          closeInProgress={closeInProgress}
          onAnimationEnd={handleModalWindowAnimationEnd}
          {...otherProps}
        >
          {children}
        </ModalWindow>
      </FullScreenContainer>
    </Portal>
  );
};
