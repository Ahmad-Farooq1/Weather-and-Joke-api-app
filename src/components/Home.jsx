import React, { useState, useEffect } from "react";

const Home = () => {
  const [joke, setJoke] = useState([]);
  const [weather,setWeather]=useState({})
  const [count, setCount] = useState(0);
  const [jokeApi,setJokeApi] = useState("https://v2.jokeapi.dev/joke/Any?type=twopart")
  const weatherApi ="https://api.open-meteo.com/v1/forecast?latitude=31.582&longitude=74.329&current_weather=true"
  const good =()=>{
    const newlink='https://v2.jokeapi.dev/joke/Programming,Miscellaneous'
    setJokeApi(newlink)
    return setCount((prev)=>prev+1)
  }
  const dark =()=>{
    const newlink='https://v2.jokeapi.dev/joke/Dark?blacklistFlags=religious,sexist'
    setJokeApi(newlink)
    return setCount((prev)=>prev+1)
  }
  const refersh = () => {
   setJokeApi("https://v2.jokeapi.dev/joke/Any?type=twopart")
   return setCount((prev)=>prev+1)
  };
  useEffect(() => {
    fetch(jokeApi)
      .then((response) => response.json())
      .then((data) => setJoke(data))
      .catch((error) => console.error("Error while fetching the Joke:", error));
      fetch(weatherApi)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error while fetching the Joke:", error));
  }, [count]);
  return (
    <>
      <div className="bg-sky-500 min-h-screen flex flex-col justify-around items-center p-4 sm:p-0 sm:h-screen">
        <div className="h-auto sm:h-[10%] w-full sm:w-[70%] bg-white rounded-xl sm:rounded-4xl p-4 sm:flex sm:items-center sm:justify-center">
              <div className="text-lg sm:text-2xl font-bold text-center text-sky-500">{weather.current_weather ? (
          <>
            <p className="text-base sm:text-xl font-bold">
              🌡 Temp: {weather.current_weather.temperature}°C
            </p>
            <p className="text-sm sm:text-base">💨 Wind: {weather.current_weather.windspeed} km/h</p>
          </>
        ) : (
          <p>Loading weather...</p>
        )}</div>
        </div>
        <div className="h-auto sm:h-[70%] w-full sm:w-[70%] bg-white rounded-xl sm:rounded-4xl flex flex-col justify-around items-center p-4 sm:p-0 mt-4 sm:mt-0">
            <p className="p-2 sm:p-4 text-lg sm:text-2xl text-sky-500 font-semibold text-center">Refresh to get New Joke</p>
          <div className="h-auto sm:h-[70%] w-full sm:w-[70%] bg-sky-500 rounded-xl sm:rounded-4xl flex flex-col justify-around p-4 sm:p-0">
            <div className="flex flex-col justify-center py-4 sm:py-0">
              <p className="text-lg sm:text-4xl font-bold text-white text-center px-2 sm:px-0">{joke.setup}</p>
              <p className="text-sm sm:text-lg mt-2 sm:mt-4 text-white text-center px-2 sm:px-0">{joke.delivery}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-x-1 py-4 sm:py-0 mx-2">
              <button
                className="bg-sky-200 text-sky-900 px-3 sm:px-4 py-2 sm:py-1 rounded-2xl sm:rounded-3xl cursor-pointer border border-sky-950 text-sm sm:text-base"
                onClick={good}
              >
                Good Jokes
              </button>
              <button
                className="bg-sky-200 text-sky-900 px-3 sm:px-4 py-2 sm:py-1 rounded-2xl sm:rounded-3xl cursor-pointer border border-sky-950 text-sm sm:text-base"
                onClick={refersh}
              >
                REFRESH
              </button>
              <button
                className="bg-sky-200 text-sky-900 px-3 sm:px-4 py-2 sm:py-1 rounded-2xl sm:rounded-3xl cursor-pointer border border-sky-950 text-sm sm:text-base"
                onClick={dark}
              >
                Dark Jokes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;