import React from "react";
import styled, {StyledComponentPropsWithRef} from "styled-components";

import { Input } from "../input";

const StyledContainer = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding: 1rem 1rem 1rem 2.8rem;
  width: 100%;
`;

const StyledSvg = styled.svg`
  position: absolute;
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  left: 0.5rem;
  top: calc(50% - 0.65em);
  fill: ${({theme: {palette}}) => palette.primary};
`;

export const SearchInput = ({className, ...props}: StyledComponentPropsWithRef<typeof StyledInput>) => {
  return (
    <StyledContainer className={className}>
      <StyledSvg viewBox="1 1 26 26">
        <path d="M 13 3 C 7.5 3 3 7.5 3 13 C 3 18.5 7.5 23 13 23 C 15.4 23 17.6 22.15 19.322266 20.736328 L 25.3 26.7 A 1.0001 1.0001 0 1 0 26.7 25.3 L 20.736328 19.322266 C 22.15 17.6 23 15.4 23 13 C 23 7.5 18.5 3 13 3 z M 13 5 C 17.43 5 21 8.57 21 13 C 21 17.43 17.43 21 13 21 C 8.57 21 5 17.43 5 13 C 5 8.57 8.57 5 13 5 z"></path>
      </StyledSvg>
      <StyledInput {...props} />
    </StyledContainer>
  );
};
