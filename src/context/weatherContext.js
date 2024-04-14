import { useContext } from "react";
import { createContext } from "react";

export const WeatherContext = createContext({
    city:"",
    cityArray: [],
    addCity:(city)=>{
    },
    removeCity:(city)=>{},
    updateCity:(city)=>{},
})

export const useWeather = ()=>{
    return useContext(WeatherContext)
}
export const WeatherContextProvider = WeatherContext.Provider