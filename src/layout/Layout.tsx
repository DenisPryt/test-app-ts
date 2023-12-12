import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from '../components/navbar/Navbar';

export const FullScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Layout = () => {
  return (
    <FullScreenContainer as="main">
      <Navbar />
      <Outlet />
    </FullScreenContainer>
  );
};
