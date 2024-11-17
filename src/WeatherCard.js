import React, { useState, useRef } from 'react';
import HourlyCard from './HourlyCard';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';

const WeatherCard = ({ weatherData, hourlyCheck }) => {
    const date = useState(weatherData.current.time.split("T")[0]);
    const navRef = useRef();
    const scrollAmount = 500;
    const currDateTime = new Date();
    const showTime = currDateTime.getHours().toString().padStart(2, '0') + ':' + currDateTime.getMinutes().toString().padStart(2, '0');

    const handleNav = (direction) => {
        if (direction === 'left') {
            if (navRef) {
                navRef.current.scrollLeft -= scrollAmount;
            }
        } else if (direction === 'right') {
            if (navRef) {
                navRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <div>
            <div style={cardstyle}>
                <h2>Current Weather</h2>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Temperature:</strong> { weatherData.current?.temperature ||"N/A" }
                    {weatherData.unit.current?.temperature || ""}</p>
                <p><strong>Wind Speed:</strong> {weatherData.current?.windSpeed || "N/A"}
                    {weatherData.unit.current?.windSpeed || ""} </p>
                <p><strong>Time:</strong> {weatherData.current?.time ? showTime : "Unavailable"}
                    {weatherData.unit.current?.time.split("T")[1] || ""}
                </p>
            </div>
            
            {hourlyCheck && 
                <div style={{...containerStyle}}>
                    <DoubleLeftOutlined onClick={() => handleNav('left')} style={buttonStyle}/>
                    <div style= {scrollStyle} ref={navRef}>
                        {Array.from({length: 24}).map((_, index) => (
                            <HourlyCard
                                key = {index}
                                dateTime={weatherData.hourly.time[index]}          
                                temperature={`${weatherData.hourly.temperature[index]} ${weatherData.unit.hourly?.temperature || ""}`} 
                                humidity={`${weatherData.hourly.humidity[index]} ${weatherData.unit.hourly?.humidity || ""}`}    
                                windSpeed={`${weatherData.hourly.windSpeed[index]} ${weatherData.unit.hourly?.windSpeed || ""}`}    
                            />
                        ))}
                    </div>
                    <DoubleRightOutlined onClick={() => handleNav('right')} style={buttonStyle}/>
                </div>
            }
        </div>
    );
};

const cardstyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    // padding: '5px',
    margin: '8px',
    // width: '50%',
    textAlign: 'center',
    backgroundColor: '#7CB9E8',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    borderRadius: '8px',
    backgroundColor: '#002244'
};

const scrollStyle = {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    gap: '1%',
};

const buttonStyle = {
    margin: '20px',
    padding: '90px 5px',
    width: '50px',
    backgroundSize: '100% auto',
    backgroundColor: '#7CB9E8',
    color: 'black',
    borderRadius: '10px',
    display: 'flatButton',
    border: '10px',
    cursor: 'pointer',
};

export default WeatherCard;