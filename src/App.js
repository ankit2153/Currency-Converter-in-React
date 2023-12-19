import React, { useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {

  const [val, setVal] = useState(0);

  const [convertedAmounts, setConvertedAmounts] = useState({});

  const [load,setLoad] = useState(false);

  
  const handleSubmit = async () => {

    const url = 'https://v6.exchangerate-api.com/v6/e2b3826b1fdd534a6c49f7fe/latest/INR';
    
    try {

      setLoad(true)

      const response = await axios.get(url);

    

      const conversionRates = response.data.conversion_rates;

      // Calculate and store converted amounts for each country
      const converted = {};

      console.log(response)

      Object.keys(conversionRates).forEach((currency) => {

        converted[currency] = (val * conversionRates[currency]).toFixed(2);

      });

      setConvertedAmounts(converted);

      setLoad(false)

      

    } catch (error) {

      console.error('Error fetching exchange rates:', error);
    }
  };

  return (
    <div>
      <h1>Currency Converter App</h1>
      <div className='container'>
        <b>Enter the amount in Rupees</b>
        <input
          type="number"
          id="amount"
          value={val}
          onChange={(event) => setVal(event.target.value)}
          required
        />
        <button onClick={handleSubmit}>CONVERT</button>
      </div>
      
      <div>
        {/* Display the converted amounts */}
        <h2>Converted Amounts</h2>
        {load && (
        <div className="loading-container">
          <p className="loading-message">Loading...</p>
        </div>
      )}
        <ul>
          {Object.keys(convertedAmounts).map((currency) => (
            <li key={currency}>
              {currency}: {convertedAmounts[currency]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
