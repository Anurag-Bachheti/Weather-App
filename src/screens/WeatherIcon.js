import { useState, useEffect } from 'react';
import { ReactComponent as Sunny } from '../assets/sunny.svg';
import { ReactComponent as Cloudy } from '../assets/cloudy.svg';
import { ReactComponent as Snowy } from '../assets/snowy.svg';
// import { ReactComponent as Rainy } from '../assets/rainy.svg';

const WeatherIcon = ({ temperature}) => {
    const [WeatherComponent, setWeatherComponent] = useState(null);

    const getWeatherComponent = (temperature) => {
        // if(humidity > 70){
        //     return <Rainy/>
        // } 
        if (temperature <= -2) {
            return <Snowy />;
        } else if (temperature >= -1 && temperature <= 29) {
            return <Cloudy />;
        } else if (temperature >= 30) {
            return <Sunny />;
        }
        return <Cloudy />;
    };

    useEffect(() => {
        if (temperature !== undefined
            //  && humidity !== undefined
            ) {
            const component = getWeatherComponent(temperature);
            setWeatherComponent(component);
        }
    }, [temperature]); 
    return <>{WeatherComponent}</>;
};

export default WeatherIcon;
