'use client';  // 이 줄을 추가

import { useEffect, useState } from 'react';
import axios from 'axios';

const ExchangeRate = () => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => setRate(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {rate ? (
        <div>
          <h2>환율 정보</h2>
          <p>USD to EUR: {rate.rates.EUR}</p>
          <p>USD to KRW: {rate.rates.KRW}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default ExchangeRate;
