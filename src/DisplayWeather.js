import React, { useState } from 'react';

function DisplayWeather(props) {
  const { data } = props;
  const forecast = [...data.list];
  const currentDay = [...forecast];
  const [unit, setUnit] = useState(true);

  currentDay.length = 3;

  let celcius = Math.round(parseFloat(data.list[0].main.temp) - 273.15);
  let fahrenheit = Math.round((parseFloat(data.list[0].main.temp) - 273.15) * 1.8 + 32);
  const changeUnit = () => {
    console.log(unit);
    setUnit((unit) => !unit);
  };
  return (
    <div>
      <p> Today in {data.city.name}</p>
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
        <button onClick={changeUnit}>Change</button>
      </div>
      Todays 3 Hour Forecast
      <div className='today'>
        {currentDay.map((day) => {
          return (
            <div className="day" key={day.dt}>
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
      <p>Outlook: </p>
      {forecast.map((day, index) => {
        // eslint-disable-next-line no-lone-blocks
        {
          if (index % 4 === 0) {
            return (
              <div key={day.dt}>
                <p>
                  {day.dt_txt}
                  <br></br>
                  {Math.round((parseFloat(day.main.temp) - 273.15) * 1.8 + 32)}
                  <sup>o</sup>F {day.weather[0].description}
                </p>
              </div>
            );
          } else {
            return null;
          }
        }
      })}
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
