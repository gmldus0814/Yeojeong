'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar.js';

const countries = [
  { name: 'Korea', cities: ['Seoul', 'Gimpo', 'Busan', 'Jeju'] },
  { name: 'Japan', cities: ['Tokyo', 'Osaka', 'Hukuoka'] },
  { name: 'China', cities: ['Shanghai'] }
];

const airports = [
  { country: 'Korea', city: 'Seoul', name: 'Incheon International', code: 'ICN' },
  { country: 'Korea', city: 'Gimpo', name: 'Gimpo International', code: 'GMP' },
  { country: 'Korea', city: 'Busan', name: 'Gimhae International', code: 'PUS' },
  { country: 'Korea', city: 'Jeju', name: 'Jeju International', code: 'CJU' },
  { country: 'Japan', city: 'Tokyo', name: 'Narita International', code: 'NRT' },
  { country: 'Japan', city: 'Osaka', name: 'Kansai International', code: 'KIX' },
  { country: 'Japan', city: 'Hukuoka', name: 'Fukuoka Airport', code: 'FUK' },
  { country: 'China', city: 'Shanghai', name: 'Shanghai Pudong', code: 'PVG' }
];

const TravelApp = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [post, setPost] = useState('');
  const [rate, setRate] = useState(null);
  const [jpyToKrw, setJpyToKrw] = useState(null);
  const [cnyToKrw, setCnyToKrw] = useState(null);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [openSidebar, setOpenSidebar] = useState(false); // 초기 사이드바 닫힘 상태
  const [openCountry, setOpenCountry] = useState(null);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => {
        setRate(response.data);
        setJpyToKrw(response.data.rates.KRW / response.data.rates.JPY);
        setCnyToKrw(response.data.rates.KRW / response.data.rates.CNY);
      })
      .catch((error) => console.error('Error fetching exchange rates:', error));
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    setPost('');
    setOpenCountry(openCountry === country.name ? null : country.name);  // 국가 클릭 시 펼침 상태 변경
  };

  const generateGoogleFlightsLink = () => {
    if (!departure || !destination || !date) return '';
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `https://www.google.com/travel/flights?q=flights%20from%20${departure}%20to%20${destination}%20on%20${formattedDate}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* 사이드바 */}
      <Sidebar
        countries={countries}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        openCountry={openCountry}
        setOpenCountry={setOpenCountry}
      />


      {/* 본문 */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-center mb-8 mt-8"> 🌍 여정(여행의 정석) 🚀</h1>

        <div className="max-w-[500px] mx-auto p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-8">환율 정보</h2>
          {rate && (
            <div className="space-y-5 text-lg text-center">
              <p className="flex items-center justify-center">
                <img className="w-[50px] mr-2 " src="https://i.namu.wiki/i/iQufLrbhJomAExn78C9qAWtlHlWAGSOdIn-2MKlW9QUhgQ-sCzVC2TpQl1vT5PK2pcnEv8_Zy2dZcYX9k7AaAx9VIP8p_vvyWbBBfii4UihN32MlcKGQ7mebR1uD8eG2_IeVT8X7MRFHsNBIDrPTqQ.svg" alt="USD Icon" />
                (1달러기준):  <span className="font-bold">{rate.rates.KRW.toFixed(2)} 원</span>
              </p>
              <p className="flex items-center justify-center">
                <img className="w-[50px] mr-2 border-1" src="https://i.namu.wiki/i/ed340Y_F0Jkz3i4PdoOFs_Zp3zdMwAAeMTeIa8ZWCL7qPZg8OS-spflgtkQFF-WfnSbQ2fZ5l4EWpoXuWY-JFGSEoRaTEWNAJFHI8f1lWpS6xftNmIENXRAu_smd_1TwLjynv9VcKhBTw5qcVWD9jw.svg" alt="JPY Icon" />
                JPY(1엔기준): <span className="font-bold"> {jpyToKrw && jpyToKrw.toFixed(2)} 원</span></p>
              <p className="flex items-center justify-center">
                <img className="w-[50px] mr-2" src="https://i.namu.wiki/i/DbPcEiQ63TM4FJQLKc9EZAPYb3iw2KYb0LWR87AY4OpGQgslZbpqbAam4hYMxZu5iGbSi9CWNcXTfctog7sfbI2GDPqgxSmAIpd5iymE6xR2KIpMM85VAyxYMn7toAUyCExBZElpoXJqyVPB22jmHA.svg" alt="CNY Icon" />
                CNY(1위안기준): <span className="font-bold"> {cnyToKrw && cnyToKrw.toFixed(2)} 원</span></p>
            </div>
          )}

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-center mb-4">최저가 검색</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium">출발지</label>
                <select
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-[300px] mt-2 p-3 rounded-lg bg-gray-100"
                >
                  <option value="">출발지 선택</option>
                  {airports.map((airport, index) => (
                    <option key={index} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium">도착지</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-[300px] mt-2 p-3 rounded-lg bg-gray-100"
                >
                  <option value="">도착지 선택</option>
                  {airports.map((airport, index) => (
                    <option key={index} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium">출발 날짜</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-[300px] mt-2 p-3 rounded-lg bg-gray-100"
                />
              </div>

              {generateGoogleFlightsLink() && (
                <a
                  href={generateGoogleFlightsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                  최저가 검색하기 🔍
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TravelApp;
