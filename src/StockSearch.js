import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StockSearch() {
  const [ticker, setTicker] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/stock/${ticker}`);
  };

  return (
    <div>
      <h1>Stock Search</h1>
      <label>
        Enter ticker symbol:
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default StockSearch;
