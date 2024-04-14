import React, { useEffect, useState } from 'react'
import searchIcon from '../assets/search.png'
import {nanoid} from 'nanoid'
import humidityPic from '../assets/humidity.png'
import wind from '../assets/wind.png'
import useWeatherInfo from '../custom/useWeatherInfo'
import Card from './Card'
import { WeatherContextProvider } from '../context/weatherContext'
function Weather() {
   const [city,setCity] = useState('')
   const [searchedCity,setSearchedCity] = useState("")
   const [cityAdded, setCityAdded] = useState("")
   const [cityArray,setCityArray] = useState([]);
   let {data,error}= useWeatherInfo(city);
   useEffect(()=>{
    let cityArray = JSON.parse( localStorage.getItem("cityArray"))
    if(cityArray && cityArray.length>0){
      
      setCityArray(cityArray)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("cityArray",JSON.stringify(cityArray))
  },[cityArray])
   
   function updateCity(val){
       setCity(val);
       setSearchedCity('');
   }
   const addCity = (val)=>{
    setCityAdded("")
    setCityArray((prev)=>[...prev,val]);
   }
   const removeCity = (city)=>{
    setCityArray((prev)=>prev.filter((prev)=>prev!=city))
   }
   

  return (
    <WeatherContextProvider value={{city,cityArray,addCity,removeCity,updateCity}}>
      <div className='bg-gradient-to-br from-teal-400 to-purple-600 shadow-lg sm:rounded-2xl py-2 h-full w-full lg:w-1/3 sm:w-1/2 '>
    <div className='flex  h-[5%]  justify-center mx-8 my-4  '>
      <input type="text" className='w-full  rounded-l-lg px-3 py-1.5 outline-none bg-[#f5fefd] ' placeholder='Search your city' onChange={(e) => { setSearchedCity(e.target.value) }} value={searchedCity} />
      <button className='text-white bg-green-400 rounded-r-lg px-3 py-1.5 shrink-0 rounded-l-none outline-none ' onClick={()=>updateCity(searchedCity)}><img src={searchIcon} alt="" className='h-full w-full' /></button>
    </div>
    {error ?
    (
      <div className='h-[40%] shadow-lg mx-8 my-2 py-2 rounded-lg bg-[#383e3e]/30 flex justify-center items-center text-white'>{error}</div>):(
      <>
    <div className='h-[20%] flex justify-evenly shadow-lg mx-8 my-2 py-2 rounded-lg bg-[#383e3e]/30 '>
      <div className='flex flex-col items-center   justify-center '>
        <img src={`https://openweathermap.org/img/wn/${data && data.weather[0].icon}@2x.png`} alt="" className='h-[3rem] ' />
        <p className='text-slate-50 text-[0.85rem] font-bold lg:text-xl '>{data && data.main && Math.floor(data.main.temp - 273.15)}°C</p>
        <p className='text-slate-50 text-[1rem] font-semibold lg:text-lg'>{data && data.weather && data.weather[0].description[0].toUpperCase()}{data && data.weather && data.weather[0].description.slice(1)}</p>

      </div>
      <div className='flex flex-col items-center  justify-center px-auto'>
        <p className='text-base font-semibold text-slate-50 lg:text-xl'>Real feel {data && data.main && Math.floor(data.main.feels_like - 273.15)}°C</p>
        <p className='text-slate-50 text-[1rem] font-semibold lg:text-lg'>{data && data.name}</p>

      </div>
    </div>
    <div className='flex justify-evenly h-[20%] bg-[#383e3e]/30 rounded-lg mx-8 py-2 '>
      <div className='flex flex-col items-center justify-center'>
        <img src={humidityPic} alt="" className='h-10 ' />
        <p className='text-white font-bold mt-3 text-[0.85rem] '>
          {data && data.main && data.main.humidity}% humidity
        </p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img src={wind} alt="" className='h-10 w-12  ' />
        <p className='text-white font-bold mt-3 text-[0.85rem] lg:mt-2 lg:text-xs lg:font-medium'>{data && data.wind && data.wind.speed} km/hr</p>
      </div>
    </div>
    </>)}
    <div className='flex  h-[5%]  justify-center mx-8 my-4  '>
    <input type="text" className='w-full  rounded-l-lg px-3 py-1.5 outline-none bg-[#f5fefd] ' placeholder='Search your city' onChange={(e) => { setCityAdded(e.target.value) }} value={cityAdded} />
      <button className='text-white bg-green-400 rounded-r-lg px-3 py-1.5 shrink-0 rounded-l-none outline-none ' onClick={()=>addCity(cityAdded)}><img src={searchIcon} alt="" className='h-full w-full' /></button>
    </div>
    <div className='flex  flex-wrap gap-2  h-[32%] max-h-60 w-full  overflow-y-auto'>
      {cityArray.map((each)=>(
        (<div key={nanoid()} className='mx-8 w-full'>
          <Card name={each}/>
        </div>)
      ))}
    </div>
  </div></WeatherContextProvider>
    
  
  )
}

export default Weather
