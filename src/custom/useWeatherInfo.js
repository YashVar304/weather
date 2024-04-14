import { useEffect, useState } from "react";

function useWeatherInfo(city) {
    const [data, setData] = useState(null); // Changed initial state to null
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(error)
        try {
            if (city) {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fcef69b40c017531b6a6e6bf9f0c1d84`)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("Not found");
                        }
                        return res.json();
                    })
                    .then((res) => {
                    setData(res);
                    setError(null)})
                    .catch((error) => {
                        setError("City not found");
                        setData(null); // Clear previous data
                    });
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=fcef69b40c017531b6a6e6bf9f0c1d84`)
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error("Not found");
                                }
                                return res.json();
                            })
                            .then((res) => {
                                setData(res)
                                setError(null)
                            })
                            .catch((error) => {
                                setError("City not found");
                                setData(null); // Clear previous data
                            });
                    });
                }
            }
        } catch (error) {
            setError("City not found");
            setData(null); // Clear previous data
        }
    }, [city]);

    return { data, error };
}

export default useWeatherInfo;
