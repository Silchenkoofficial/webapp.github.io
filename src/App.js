import React from 'react';
import { AppLayout } from './layouts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';

export const App = () => {
    const tg = window?.Telegram?.WebApp;
    if (tg) {
        tg.onEvent('viewportChanged', () => {
            tg.expand();
            console.log(this.viewportHeight)
        });
    }
	
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/webapp/:pk" Component={AppLayout} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};
