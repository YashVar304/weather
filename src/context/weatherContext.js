import { useContext } from "react";
import { createContext } from "react";

export const WeatherContext = createContext({
    city:"",
    cityArray: [],
    addCity:(city)=>{},
    removeCity:(city)=>{},
    updateCity:(city)=>{},
    clearAllCity:()=>{}
})

export const useWeather = ()=>{
    return useContext(WeatherContext)
}
export const WeatherContextProvider = WeatherContext.Provider