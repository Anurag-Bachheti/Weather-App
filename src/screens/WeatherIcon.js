import { useState, useEffect } from 'react';
import { ReactComponent as Sunny } from '../assets/sunny.svg';
import { ReactComponent as Cloudy } from '../assets/cloudy.svg';
import { ReactComponent as Snowy } from '../assets/snowy.svg';

const WeatherIcon = ({ temperature }) => {
    const [WeatherComponent, setWeatherComponent] = useState(null);

    const getWeatherComponent = (temperature) => {
        if (temperature <= -2) {
            return <Snowy />;
        } else if (temperature >= -1 && temperature <= 29) {
            return <Cloudy />;
        } else if (temperature >= 30) {
            return <Sunny />;
        }
        return <Cloudy />; // Default to Cloudy
    };

    useEffect(() => {
        if (temperature !== undefined) {
            const component = getWeatherComponent(temperature);
            setWeatherComponent(component);
        }
    }, [temperature]); // Add temperature to the dependency array

    return <>{WeatherComponent}</>;
};

export default WeatherIcon;
