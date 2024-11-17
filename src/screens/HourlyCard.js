import React, {useState} from 'react';

const HourlyCard = ({dateTime, temperature, humidity, windSpeed}) => {
    const time = useState(dateTime.split("T")[1]);

    return (
        <div style={containerStyle}>
            <p><b>Time</b>: {time}</p>    
            <p><b>Temperture</b>: {temperature}</p>    
            <p><b>Humidity</b>: {humidity}</p>    
            <p><b>Windspeed</b>: {windSpeed}</p>
        </div>
    );
}

const containerStyle= {
    gap: '10px',
    color: '#13274F',
    backgroundColor: '#6CB4EE',
    padding: '20px',
    borderRadius: '8px',
};

export default HourlyCard;