import React  from 'react';
import './displayforcast.css'

require('dotenv').config();

function DisplayForecast(props) {
  const { data } = props;
  const forecast = [...data.daily];
  console.log(forecast);

  return (
    <div className="forcast">
      <h1>Forecast</h1>
      {forecast.map((day, index) => {
        // eslint-disable-next-line no-lone-blocks
       
        const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <div  className= {"forecast"} key={day.dt}>
            <p>Day: {index+1} <img src= {icon} alt="icon"></img></p>

              <p>Temp:
                {Math.round((parseFloat(day.temp.day) - 273.15) * 1.8 + 32)}
                <sup>o</sup>F Description: {day.weather[0].description}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default DisplayForecast;

// return (
//
// );
