import { useCallback, useEffect, useState } from 'react';
import { API_CONFIG } from 'shared/constants/api';
import httpService from 'shared/services/http.service';
import ForecastDetails from './forecastDetails';
import ForecastHeader from './forecastHeader';

const Forecast = () => {
	const [lat, setLat] = useState(28.6139);
	const [long, setLong] = useState(77.209);
	const [weatherData, setWeatherData] = useState<Record<string, any>>({});
	const [isLoading, setIsLoading] = useState(false);
	const API_key = process.env.REACT_APP_API_KEY;

	const getCurrentLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(function (position: any) {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});
	}, []);

	const getWeatherData = useCallback(() => {
		setIsLoading(true);
		(lat && long) > 0 &&
			httpService
				.get(
					`${'https://api.openweathermap.org/data/2.5'}/${
						API_CONFIG.path.weather
					}?lat=${lat}&lon=${long}&units=metric&APPID=${API_key}`
				)
				.then((response) => {
					setWeatherData(response);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					console.error('error', error);
				});
	}, [lat, long]);

	useEffect(() => {
		getWeatherData();
		getCurrentLocation();
	}, [lat, long]);

	return (
		<div className='flex position--relative'>
			<ForecastHeader weatherData={weatherData} />
			<ForecastDetails weatherData={weatherData} isLoading={isLoading} />
		</div>
	);
};

export default Forecast;
