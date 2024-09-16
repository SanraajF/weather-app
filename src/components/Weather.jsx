import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("ENTER VALID CITY NAME");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("ERROR FETCHING WEATHER DATA", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="place-self-center items-center flex flex-col p-10 rounded-xl bg-gradient-to-r from-[#2f4680] to-[#500ae4] ">
      <div className="flex items-center gap-2">
        <input
          className="pl-6 rounded-xl h-9 text-[#626262] bg-[#ebfffc] text-lg"
          type="text"
          placeholder="Search"
          ref={inputRef}
        />
        <div
          className="p-2 rounded-full bg-[#ebfffc] cursor-pointer"
          onClick={() => search(inputRef.current.value)}
        >
          <IoSearch size={20} />
        </div>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="clear icon" className="w-36 my-8" />
          <p className="text-[#ffffff] text-[80px] leading-none">
            {weatherData.temperature}°C
          </p>
          <p className="text-[#ffffff] text-[40px]">{weatherData.location}</p>
          <div className="w-full mt-10 text-white flex items-center justify-between">
            <div className="flex items-start gap-3 text-[22px]">
              <img
                src={humidity_icon}
                alt="humidity icon"
                className="w-[26px] mt-[10px]"
              />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="block text-[16px]">Humidity</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-[22px]">
              <img
                src={wind_icon}
                alt="wind icon"
                className="w-[26px] mt-[10px]"
              />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span className="block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
