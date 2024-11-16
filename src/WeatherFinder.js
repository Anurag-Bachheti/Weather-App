import './App.css';
import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import Checkbox from "react-custom-checkbox";
import { useGeolocated } from "react-geolocated";

const WeatherFinder = () => {
    const [hourlyCheck, setHourlyCheck] = useState(false);
    const [latitude, setLatitude] = useState('0');
    const [longitude, setLongitude] = useState('0');
    const [weatherData, setWeatherData ] = useState('');
    const [error, setError] = useState('');

    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
        userDecisionTimeout:5000,
    });

    const handleSubmit = async () => {
        if (!latitude || !longitude) {
            setError('Please enter both Latitude and Longitude');
            return;
        }

        try {
            const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
            
            fetch(apiUrl)
                .then(response => response.json())
                .then((data) => {
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
                                time:data.current_units.time,
                                temperature:data.current_units.temperature_2m,
                                windSpeed:data.current_units.wind_speed_10m
                            },
                            hourly: {
                                time:data.hourly_units.time,
                                temperature:data.hourly_units.temperature_2m,
                                windSpeed:data.hourly_units.wind_speed_10m,
                                humidity:data.hourly_units.relative_humidity_2m
                            }
                        }

                    });
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
    
    return(
        <div>
            <div style={{justifyContent: 'center'}}>
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
                            name='lat'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            /> 
                    </div>
                    <br/>
                    <div style={{fontSize:'100%', fontweight:'bold'}}>
                        <strong>LONGITUDE: </strong>
                        <input name='lng'
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            />
                    </div>
                    <br/>
                    <Checkbox style={{color: 'red', backgroundColor:'black'}}
                        name="hourly"
                        onChange={(value) => {
                            setHourlyCheck(value);
                        }}
                        label="Hourly Updates"
                    />
                    <br/>
                    <button style={btn} onClick = {handleSubmit}> Submit</button>
                </div>
            </div>

            {error && <p style ={{color:'red'}}>{error}</p>}

            {weatherData && 
                <WeatherCard 
                    weatherData={weatherData} 
                    hourlyCheck={hourlyCheck} 
                />
            }
        </div>
    );
}

const cardstyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1%',
    margin: '3% auto',
    width: '30%',
    textAlign: 'center',
    backgroundColor: '#dc962c',
    color: 'black',
};

const btn = {
    cursor:'pointer',
    color:'white',
    backgroundColor:'black',
    fontSize:'100%',
    padding:'1%'
}

export default WeatherFinder;