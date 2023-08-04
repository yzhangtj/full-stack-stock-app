import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { parse, format } from 'date-fns';
import { Chart } from 'chart.js';
import * as dateFnsAdapter from 'chartjs-adapter-date-fns';

import { registerables } from 'chart.js';
Chart.register(dateFnsAdapter, ...registerables);


const StockPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ticker } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/stock_history?ticker=${ticker}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [ticker]);

  if (loading) return "Loading...";

  // extract the dates and close prices from the data
  const dates = Object.keys(data.Close);
  const closePrices = Object.values(data.Close);

  console.log('Dates length:', dates.length);
  console.log('Close prices length:', closePrices.length);





// ...

  const chartData = {
    datasets: [
      {
        label: 'Stock Price',
        data: dates.map((date, i) => ({
          x: parse(date, 'MM/dd/yyyy', new Date()),
          y: closePrices[i]
        })),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

// ...

  console.log('Chart data:', chartData);
  const options = {
    scales: {
      x: {
        type: 'time',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Stock Data for {ticker}</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockPage;
