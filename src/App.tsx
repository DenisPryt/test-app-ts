import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import GlobalStyle from './styles/global';
import DefaultTheme from './styles/theme';
import { ThemeProvider } from 'styled-components';

import { SubscriptionStorageProvider } from './modules/subscription-storage';

import { Layout } from './layout';
import { Label } from './components/label';

import SubscribePage from './pages/subscribe-page';
import HomePage from './pages/home-page';

function App() {
  return (
    <SubscriptionStorageProvider storage={window.sessionStorage} itemKey='subscribe-info'>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyle/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='subscribe' element={<SubscribePage />} />
              <Route path='*' element={<Label as='h1'>Page Not Found</Label>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SubscriptionStorageProvider>
  );
}

export default App;
