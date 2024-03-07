import React, { useState, useEffect } from 'react';
import quotesData from './quotes.json';

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Fetch quotes data from quotes.json
    setQuotes(quotesData);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      {quotes.map((quote, index) => (
        <div key={index} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <p>{quote.Content}</p>
          <p style={{ textAlign: 'right', fontStyle: 'italic', marginTop: '5px' }}>{quote.Author}</p>
        </div>
      ))}
    </div>
  );
};

export default QuotesPage;
