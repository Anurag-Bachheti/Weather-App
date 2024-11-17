const HttpService = {
    getWeatherData: async (latitude, longitude) => {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        };
    },
    
    getTimeZone: async (latitude, longitude) => {
        const apiUrl = `https://timeapi.io/api/timezone/coordinate?latitude=${latitude}&longitude=${longitude}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch timezone');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Time Zone:', error);
            throw error;
        };
    }
};


export default HttpService;