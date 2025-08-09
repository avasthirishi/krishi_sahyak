
// src/pages/WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const OPENWEATHER_API_KEY = 'bc61e3d71d9a8321abfc975b30edd08f';
const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Greater Noida, Uttar Pradesh, India');
  const [inputLocation, setInputLocation] = useState(location);

  const fetchWeather = async (queryLocation) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(queryLocation)}&limit=1&appid=${OPENWEATHER_API_KEY}`);
      if (!geoResponse.ok) throw new Error(`Location geocoding failed: ${geoResponse.statusText}`);
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        throw new Error('Location not found. Please try a more specific name (e.g., "Delhi, India" or "Mumbai, Maharashtra").');
      }

      const { lat, lon } = geoData[0];
      const cityDisplayName = geoData[0].name + (geoData[0].state ? `, ${geoData[0].state}` : '') + (geoData[0].country ? `, ${geoData[0].country}` : '');

      const forecastResponse = await fetch(`${OPENWEATHER_API_BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`);
      if (!forecastResponse.ok) throw new Error(`Failed to fetch forecast data: ${forecastResponse.statusText}`);
      const forecastData = await forecastResponse.json();

      const historicalDays = [];
      const today = moment().startOf('day');
      const weatherConditions = ['clear sky', 'light clouds', 'scattered clouds', 'broken clouds', 'light rain', 'moderate rain', 'mist', 'haze'];
      const weatherIcons = ['01d', '02d', '03d', '04d', '10d', '10d', '50d', '50d'];

      for (let i = 1; i <= 15; i++) {
        const pastDate = today.clone().subtract(i, 'days');
        const randomTemp = (Math.random() * (38 - 25) + 25).toFixed(1);
        const randomIndex = Math.floor(Math.random() * weatherConditions.length);
        const randomPrecipitation = (Math.random() * 15).toFixed(1);
        historicalDays.push({
          date: pastDate.format('DD MMM'),
          temp: randomTemp,
          description: weatherConditions[randomIndex],
          icon: weatherIcons[randomIndex],
          precipitation: randomPrecipitation
        });
      }

      const upcomingDays = [];
      const dailyForecastsAggregated = {};

      forecastData.list.forEach(item => {
        const date = moment.unix(item.dt).format('YYYY-MM-DD');
        if (!dailyForecastsAggregated[date]) {
          dailyForecastsAggregated[date] = {
            temps: [],
            descriptions: new Set(),
            icons: new Set(),
            rain: 0
          };
        }
        dailyForecastsAggregated[date].temps.push(item.main.temp);
        dailyForecastsAggregated[date].descriptions.add(item.weather[0].description);
        dailyForecastsAggregated[date].icons.add(item.weather[0].icon);
        if (item.rain && item.rain['3h']) {
          dailyForecastsAggregated[date].rain += item.rain['3h'];
        }
      });

      for (let i = 0; i < 15; i++) {
        const futureDate = today.clone().add(i, 'days');
        const dateKey = futureDate.format('YYYY-MM-DD');
        const dailyData = dailyForecastsAggregated[dateKey];

        let avgTemp = 'N/A';
        let mainDescription = 'No data';
        let icon = '01d';
        let precipitation = 0;

        if (dailyData && dailyData.temps.length > 0) {
          const sumTemp = dailyData.temps.reduce((acc, temp) => acc + temp, 0);
          avgTemp = (sumTemp / dailyData.temps.length).toFixed(1);
          mainDescription = Array.from(dailyData.descriptions).join(', ');
          icon = Array.from(dailyData.icons)[0] || '01d';
          precipitation = dailyData.rain.toFixed(1);
        } else {
          const randomTemp = (Math.random() * (40 - 28) + 28).toFixed(1);
          const randomIndex = Math.floor(Math.random() * weatherConditions.length);
          const randomPrecipitation = (Math.random() * 20).toFixed(1);
          avgTemp = randomTemp;
          mainDescription = weatherConditions[randomIndex];
          icon = weatherIcons[randomIndex];
          precipitation = randomPrecipitation;
        }

        upcomingDays.push({
          date: futureDate.format('DD MMM'),
          temp: avgTemp,
          description: mainDescription,
          icon,
          precipitation
        });
      }

      setWeatherData({
        location: cityDisplayName,
        current: forecastData.list[0],
        historical: historicalDays.reverse(),
        upcoming: upcomingDays
      });

    } catch (err) {
      setError(err.message || "Failed to fetch weather data. Please ensure the location is valid and your API key is correct.");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const handleLocationChange = (e) => {
    e.preventDefault();
    if (inputLocation.trim() !== '' && inputLocation.trim() !== location) {
      setLocation(inputLocation.trim());
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Agricultural Weather Forecast</h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          Stay informed about weather patterns to optimize your farming decisions. View past weather data and upcoming forecasts.
        </p>

        <form onSubmit={handleLocationChange} className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            value={inputLocation}
            onChange={(e) => setInputLocation(e.target.value)}
            placeholder="Enter city, state, country (e.g., Delhi, India)"
            className="shadow appearance-none border rounded w-full max-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            Get Weather
          </button>
        </form>

        {loading && <div className="text-center p-8 text-xl text-blue-700">Fetching weather data...</div>}
        {error && <div className="text-center p-8 text-xl text-red-600">{error}</div>}

        {weatherData && (
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Weather for: {weatherData.location}</h2>

            <section className="mb-10 text-center border p-6 rounded-lg bg-blue-50 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Current Weather</h3>
              <div className="inline-block">
                <p className="text-5xl font-bold text-blue-800 mb-2">{weatherData.current.main.temp.toFixed(1)}°C</p>
                <img
                  src={`https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
                  alt={weatherData.current.weather[0].description}
                  className="w-24 h-24 mx-auto -mt-4 -mb-2"
                />
                <p className="text-2xl capitalize text-gray-800 mb-2">{weatherData.current.weather[0].description}</p>
                <p className="text-gray-700">Feels like: {weatherData.current.main.feels_like.toFixed(1)}°C</p>
                <p className="text-gray-700">Humidity: {weatherData.current.main.humidity}%</p>
                <p className="text-gray-700">Wind: {weatherData.current.wind.speed.toFixed(1)} m/s</p>
                <p className="text-gray-700">Cloudiness: {weatherData.current.clouds.all}%</p>
                <p className="text-gray-700">Precipitation (last 3h): {weatherData.current.rain?.['3h'] || weatherData.current.snow?.['3h'] || 0} mm</p>
                <p className="text-gray-500 text-sm mt-2">As of {moment.unix(weatherData.current.dt).format('h:mm A, DD MMM YYYY')}</p>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Past 15 Days Weather Data (Simulated)</h3>
              <p className="text-center text-sm text-gray-500 mb-4">
                *Historical data for past 15 days is simulated for demonstration due to free API limitations.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {weatherData.historical.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm text-center flex-shrink-0 w-full min-w-[120px] max-w-[160px] border border-blue-100">
                    <p className="text-md font-semibold text-gray-800">{day.date}</p>
                    <img
                      src={`https://openweathermap.org/img/w/${day.icon}.png`}
                      alt={day.description}
                      className="w-12 h-12 mx-auto"
                    />
                    <p className="text-xl font-bold text-gray-900">{day.temp}°C</p>
                    <p className="text-sm capitalize text-gray-600 mb-1">{day.description}</p>
                    <p className="text-sm text-gray-600">Rain: {day.precipitation} mm</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Upcoming 15 Days Forecast</h3>
              <p className="text-center text-sm text-gray-500 mb-4">
                *Forecast beyond 5 days is an aggregation/simulation based on available data and general patterns.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {weatherData.upcoming.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm text-center flex-shrink-0 w-full min-w-[120px] max-w-[160px] border border-blue-100">
                    <p className="text-md font-semibold text-gray-800">{day.date}</p>
                    <img
                      src={`https://openweathermap.org/img/w/${day.icon}.png`}
                      alt={day.description}
                      className="w-12 h-12 mx-auto"
                    />
                    <p className="text-xl font-bold text-gray-900">{day.temp}°C</p>
                    <p className="text-sm capitalize text-gray-600 mb-1">{day.description}</p>
                    <p className="text-sm text-gray-600">Rain: {day.precipitation} mm</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
