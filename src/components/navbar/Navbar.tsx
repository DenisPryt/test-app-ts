import React from 'react';
import styled from 'styled-components';
import { flexContainerCenter } from '../../styles/css/flex-container-center';
import { blueColor } from '../../styles/color';

import { NavLink } from 'react-router-dom';

import logo from '../../logo.svg';

const NAV_HEIGHT = '4rem';

const StyledNav = styled.nav`
  position: relative;

  ${flexContainerCenter}
  
  gap: 4rem;
  height: ${NAV_HEIGHT};
  background: #3E2558;
  
  a {
    text-decoration: none;
    color: white;
  }

  .active {
    color: ${blueColor};
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 1rem;
  top: 0;
  height: ${NAV_HEIGHT};
`;

export const Navbar = () => {
  return (
    <StyledNav>
      <LogoContainer><img height={'100%'} src={logo} alt='logo' /></LogoContainer>
      <NavLink to="/" end>Welcome</NavLink>
      <NavLink to="/subscribe">Subscribe</NavLink>
    </StyledNav>
  );
};
