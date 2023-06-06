import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { API_CONFIG } from 'shared/constants/api';
import httpService from 'shared/services/http.service';
import ForecastDetails from './forecastDetails';
import ForecastHeader from './forecastHeader';
import { IForecastChartData } from '../interface/interface';

const Forecast = () => {
	const [lat, setLat] = useState(28.6139);
	const [long, setLong] = useState(77.209);
	const [city, setCity] = useState<string | undefined>();
	const [weatherData, setWeatherData] = useState<Record<string, any>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [forecastData, setForecastData] = useState<IForecastChartData[]>([]);
	const API_key = process.env.REACT_APP_API_KEY;

	const getCurrentLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(function (position: any) {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});
	}, []);

	const getWeatherData = useCallback(
		(cityName?: string) => {
			setIsLoading(true);
			isEmpty(cityName) &&
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
			!isEmpty(cityName) &&
				httpService
					.get(
						`${'https://api.openweathermap.org/data/2.5'}/${
							API_CONFIG.path.weather
						}?q=${cityName}&units=metric&APPID=${API_key}`
					)
					.then((response) => {
						setWeatherData(response);
						setCity(cityName);
						setIsLoading(false);
					})
					.catch((error) => {
						setIsLoading(false);
						console.error('error', error);
					});
		},
		[lat, long]
	);

	const getWeeklyData = useCallback(() => {
		setIsLoading(true);
		isEmpty(city) &&
			httpService
				.get(
					`${'https://api.openweathermap.org/data/2.5'}/${
						API_CONFIG.path.forecast
					}?lat=${lat}&lon=${long}&units=metric&APPID=${API_key}`
				)
				.then((response) => {
					setForecastData(response.list);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					console.error('error', error);
				});
		!isEmpty(city) &&
			httpService
				.get(
					`${'https://api.openweathermap.org/data/2.5'}/${
						API_CONFIG.path.forecast
					}?q=${city}&units=metric&APPID=${API_key}`
				)
				.then((response) => {
					setForecastData(response.list);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					console.error('error', error);
				});
	}, [city, lat, long]);

	useEffect(() => {
		getWeatherData();
		getCurrentLocation();
	}, [lat, long]);

	useEffect(() => {
		getWeeklyData();
	}, [lat, long, city]);

	return (
		<div className='flex position--relative'>
			<ForecastHeader
				weatherData={weatherData}
				getWeatherData={getWeatherData}
				getWeeklyData={getWeeklyData}
				setCity={setCity}
			/>
			<ForecastDetails
				weatherData={weatherData}
				isLoading={isLoading}
				forecastData={forecastData}
				dt_txt={''}
				main={{
					temp: 0
				}}
			/>
		</div>
	);
};

export default Forecast;
