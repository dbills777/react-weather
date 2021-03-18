import React, { useState } from 'react';
import DisplayForecast from './DisplayForcast'

require('dotenv').config();

function DisplayWeather(props) {
  const { data } = props;
  const lat = props.data.city.coord.lat;
  const lon = props.data.city.coord.lon;
  const forecast = [...data.list];
  const currentDay = [...forecast];
  const [unit, setUnit] = useState(true);
  const [weather, setWeather] = useState([]);
  currentDay.length = 3;
  const weatherData = async function (e) {
    e.preventDefault();
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => data);
    setWeather({ data: data });
  };
  console.log("weather", weather.data)
  let celcius = Math.round(parseFloat(data.list[0].main.temp) - 273.15);
  let fahrenheit = Math.round((parseFloat(data.list[0].main.temp) - 273.15) * 1.8 + 32);
  const changeUnit = () => {
    console.log(unit);
    setUnit((unit) => !unit);
  };
  return (
    <div className="display-container">
      <p> Today in {data.city.name}</p>
      <button onClick={(e) => weatherData(e)}>Get Forcast</button>
      <div>
        Currently:{' '}
        <span>
          {unit ? (
            <p>
              {fahrenheit}
              <sup>o</sup>F
            </p>
          ) : (
            <p>
              {celcius}
              <sup>o</sup>C
            </p>
          )}
        </span>
        <button onClick={changeUnit}>Toggle F & C</button>
      </div>
      Todays 3 Hour Forecast
      <div className='today'>
        {currentDay.map((day) => {
          return (
            <div className='day' key={day.dt}>
              <p>
                {day.dt_txt}
                <br></br>
                low: {Math.round((parseFloat(day.main.temp_min) - 273.15) * 1.8 + 32)}
                high: {Math.round((parseFloat(day.main.temp_max) - 273.15) * 1.8 + 32)}
                <sup>o</sup>F {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>

      {weather.data !== undefined ? (
        <div>
          <DisplayForecast data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default DisplayWeather;

// return (
//   <div key={day.dt}>
//     <p>
//       {day.dt_txt}
//       <br></br>
//       {Math.round((parseFloat(day.main.temp) - 273.15) * 1.8 + 32)}
//       <sup>o</sup>F {day.weather[0].description}
//     </p>
//   </div>
// );
