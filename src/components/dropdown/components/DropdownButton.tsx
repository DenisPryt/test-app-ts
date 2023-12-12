import React, { forwardRef } from "react";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { getBorderRadius } from "../../../styles/border";

import { Button } from "../../button";

interface IStyledButtonProps {
  expanded: boolean;
}

const StyledButton = styled(Button).attrs<IStyledButtonProps>(
  ({expanded}) => ({type: 'button', ariaExpanded: expanded, ariaHaspopup: true})
)<IStyledButtonProps>`
  display: inline-flex;
  border-radius: ${({expanded}) => getBorderRadius(expanded ? 'top' : 'all')};
  border-color: ${({theme: {palette}}) => palette.secondary};
`;

const StyledSvg = styled.svg`
  width: 1rem;
  height: 1rem;
  margin-left: auto;
  fill: ${({theme: {palette}}) => palette.primary};
`;

interface IDropdownButtonProps extends StyledComponentPropsWithRef<typeof StyledButton> {
  expanded?: boolean;
}

const DropdownButton = forwardRef<HTMLButtonElement, IDropdownButtonProps>(
  ({children, expanded = false, ...otherProps}, ref) => {
    return (
      <StyledButton ref={ref} variant='outlined' expanded={expanded} {...otherProps}>
        {children}
        <StyledSvg focusable={false} viewBox='0 0 24 24'>
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </StyledSvg>
      </StyledButton>
    );
  }
);

export default DropdownButton;
