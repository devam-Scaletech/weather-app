import { useCallback, useEffect, useState } from 'react';
import { API_CONFIG } from 'shared/constants/api';
import httpService from 'shared/services/http.service';
import ForecastDetails from './forecastDetails';
import ForecastHeader from './forecastHeader';

const Forecast = () => {
	const [lat, setLat] = useState();
	const [long, setLong] = useState();
	const [weatherData, setWeatherData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const API_key = process.env.REACT_APP_API_KEY;

	const getCurrentLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(function (position: any) {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});
	}, [lat, long]);

	const getWeatherData = useCallback(() => {
		setIsLoading(true);
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
			<ForecastHeader />
			<ForecastDetails />
		</div>
	);
};

export default Forecast;
