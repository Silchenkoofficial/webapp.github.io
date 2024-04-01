import React from 'react';
import { AppLayout } from './layouts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';

export const App = () => {
  console.log(process.env.REACT_APP_BOT_URL);
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
