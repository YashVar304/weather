import React, { useEffect, useState } from 'react';
import deleteIcon from '../assets/remove.png';
import { useWeather } from '../context/weatherContext';
import seeMore from '../assets/interface (1).png';

function Card({ name }) {
  const { removeCity, updateCity } = useWeather();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=fcef69b40c017531b6a6e6bf9f0c1d84`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setData(null);
      }
    };

    fetchData();
  }, [name]);

  return (
    <>
      {error ? (
        <div></div>
      ) : (
        <div className='p-1 bg-[#383e3e]/30 rounded-xl'>
          <div className='flex justify-evenly items-center'>
            {data && data.weather && (
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" className='lg:h-10 h-20' />
            )}
            <div className='flex flex-col items-center'>
              <p className='text-white text-[0.85rem]'>{data && data.main && Math.floor(data.main.temp - 273.15)}°C</p>
              <p className='text-white text-[0.85rem]'>{data && data.name}</p>
            </div>
            <button onClick={() => removeCity(name)}><img src={deleteIcon} alt="Delete" /></button>
          </div>
          <div className='flex justify-start mx-3 items-center' onClick={() => { updateCity(name) }}>
            <p className='text-blue-100 mb-[0.3rem]'>See details</p>
            <button className=''><img src={seeMore} alt="See More" /></button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
