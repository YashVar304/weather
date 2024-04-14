import React from 'react'
import searchIcon from '../assets/search.png'
import { useWeather } from '../context/weatherContext'

function Form({city,setCity,func,placeholder}) {
    
  return (
    <div className='flex  h-[5%]  justify-center mx-8 my-4  '>
      <input type="text" className='w-full  rounded-l-lg px-3 py-1.5 outline-none bg-[#f5fefd] ' placeholder={placeholder} onChange={(e) => { setCity(e.target.value) }} value={city} />
      <button className='text-white bg-green-400 rounded-r-lg px-3 py-1.5 shrink-0 rounded-l-none outline-none ' onClick={()=>func(city)}><img src={searchIcon} alt="" className='h-full w-full' /></button>
    </div>
)
}

export default Form