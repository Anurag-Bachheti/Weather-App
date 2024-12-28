import React, { useState } from 'react';
import { useGeolocated } from "react-geolocated";
import HttpService from '../scripts/HttpService';   
import WeatherCard from './WeatherCard';

const WeatherFinder = () => {
    const [hourlyCheck, setHourlyCheck] = useState(false);
    const [latitude, setLatitude] = useState('28.70');
    const [longitude, setLongitude] = useState('77.10');
    const [weatherData, setWeatherData] = useState('');
    const [error, setError] = useState('');
    const currDateTime = new Date();
    const showTime = currDateTime.getHours().toString().padStart(2, '0') + ':' + currDateTime.getMinutes().toString().padStart(2, '0');
    const [timeStamp, setTimeStamp] = useState(showTime);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const handleSubmit = async () => {
        if (!latitude || !longitude) {
            setError('Please enter both Latitude and Longitude');
            return;
        }
        if (!(latitude >= -90 && latitude <= 90)) {
            setError('Please enter a valid Latitude');
            return;
        }
        if (!(longitude >= -180 && longitude <= 180)) {
            setError('Please enter a valid Longitude');
            return;
        }

        try {
            const data = await HttpService.getWeatherData(latitude, longitude);
            const timeZone = await HttpService.getTimeZone(latitude, longitude);

            setTimeStamp(timeZone.currentLocalTime.split("T")[1].slice(0, 5));
            setWeatherData({
                current: {
                    temperature: data.current.temperature_2m,
                    windSpeed: data.current.wind_speed_10m,
                    time: data.current.time
                },
                hourly: {
                    time: data.hourly.time,
                    temperature: data.hourly.temperature_2m,
                    humidity: data.hourly.relative_humidity_2m,
                    windSpeed: data.hourly.wind_speed_10m
                },
                unit: {
                    current: {
                        time: data.current_units.time,
                        temperature: data.current_units.temperature_2m,
                        windSpeed: data.current_units.wind_speed_10m
                    },
                    hourly: {
                        time: data.hourly_units.time,
                        temperature: data.hourly_units.temperature_2m,
                        windSpeed: data.hourly_units.wind_speed_10m,
                        humidity: data.hourly_units.relative_humidity_2m
                    }
                }
            });
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const autofillLocation = () => {
        if (coords) {
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
        }
    };
    const handleHourlyToggle = () => {
        setHourlyCheck((prev) => !prev);
    };

    return (
        <div>
            <div style={{ justifyContent: 'center' }}>
                <div style={cardstyle}>
                    <h1> Weather Finder</h1>
                    {!isGeolocationAvailable && (
                        <p>Your browser does not support GeoLocation</p>
                    )}
                    {!isGeolocationEnabled && (
                        <p>Geolocation is not enabled. Please enable it in your settings or enter Lat Lon manually.</p>
                    )}
                    {coords && (
                        <button style={btn} onClick={autofillLocation}>
                            Autofill Location
                        </button>
                    )}

                    <div><strong> LATITUDE: </strong>
                        <input
                            type='number'
                            name='lat'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>
                    <br />
                    <div style={{ fontSize: '100%', fontweight: 'bold' }}>
                        <strong>LONGITUDE: </strong>
                        <input name='lng'
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>
                    <br />

                    <button
                        style={{ ...btn, backgroundColor: hourlyCheck ? "green" : "red" }}
                        onClick={handleHourlyToggle}
                    >
                        {hourlyCheck ? "Disable Hourly Updates" : "Enable Hourly Updates"}
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <br />
                    <button style={btn} onClick={handleSubmit}> Submit</button>
                </div>
            </div>

            {weatherData &&
                <WeatherCard
                    weatherData={weatherData}
                    hourlyCheck={hourlyCheck}
                    showTime={timeStamp}
                />
            }
        </div>
    );
}

const cardstyle = {
    border: '1% solid #ddd',
    borderRadius: '8%',
    padding: '3%',
    margin: '3% auto',
    width: '25%',
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
    color: 'black',
};

const btn = {
    cursor: 'pointer',
    color: 'white',
    backgroundColor: 'black',
    fontSize: '100%',
    padding: '1%'
};

export default WeatherFinder;