import React, { useState } from 'react';
import DisplayWeather from './DisplayWeather';
require('dotenv').config();

export default function Weather() {
  const [form, setForm] = useState({
    city: '',
  });
  const [weather, setWeather] = useState([]);

  const weatherData = async function (e) {
    e.preventDefault();
    if (form.city === ' ') {
      alert('Add a city for weather');
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${form.city}&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => data);
      setWeather({ data: data });
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    name === 'city' ? setForm({ ...form, city: value }) : setForm({ ...form });
  };

  return (
    <div className='weather'>
      <form>
        <input tyepe='text' name='city' placeholder='enter city' onChange={(e) => handleChange(e)} />
        <button onClick={(e) => weatherData(e)}>Submit</button>
      </form>
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}
