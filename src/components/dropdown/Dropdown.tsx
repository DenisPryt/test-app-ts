import React, { ReactNode, useCallback, useState } from 'react';
import { StyledComponentPropsWithRef } from 'styled-components';

import { usePopper } from '../../hooks/use-popper';
import { Popper } from '../popper';

import DropdownButton from './components/DropdownButton';

const dropdownRootElement = document.getElementById('dropdown-root');
if (!dropdownRootElement) {
  console.error('Can not find element with id=dropdown-root');
}

interface IDropdownProps extends StyledComponentPropsWithRef<typeof DropdownButton> {
  label: ReactNode;
  itemList: ReactNode;
}

export const Dropdown = ({label, itemList, ...otherProps}: IDropdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(expanded => !expanded), []);
  const {anchorRef, tooltipRef} = usePopper<HTMLButtonElement, HTMLDivElement>('bottom');

  const [width, setWidth] = useState(0);

  return (
    <>
      <DropdownButton
        ref={(node) => {
          if (node) {
            anchorRef(node);
            setWidth(node.offsetWidth);
          }
        }}
        expanded={expanded}
        onClick={toggleExpanded}
        {...otherProps}
      >
        {label}
      </DropdownButton>
      <Popper
        ref={tooltipRef}
        width={width}
        mountContainer={dropdownRootElement}
        expanded={expanded}
        onClose={() => setExpanded(false)}
      >
        {itemList}
      </Popper>
    </>
  );
};
