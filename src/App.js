import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

import StockSearch from './StockSearch';
import StockPage from './StockPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StockSearch />} />
        <Route path="/stock/:ticker" element={<StockPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
