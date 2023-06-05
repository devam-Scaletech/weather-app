import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Spinner from 'shared/components/spinner/spinner';
import {
	ThunderStormIcon,
	DrizzleIcon,
	RainIcon,
	SnowIcon,
	MistIcon,
	SmokeIcon,
	HazeIcon,
	DustIcon,
	FogIcon,
	AshIcon,
	SquallIcon,
	TornadoIcon,
	ClearSkyIcon,
	CloudIcon,
	CompassIcon,
	PressureIcon
} from 'shared/components/icons/icons';

import { IForecast, IWeatherIcon } from '../interface/interface';
import 'assets/styles/module/forecast.scss';

const ForecastDetails: React.FC<IForecast> = (props) => {
	const { weatherData, isLoading } = props;
	const metersToKilometers = (meters: number) => {
		return meters / 1000;
	};

	const visibilityInKm = metersToKilometers(weatherData.visibility);

	const weatherConditionIconMapper: IWeatherIcon = {
		ThunderStormIcon: <ThunderStormIcon />,
		Drizzle: <DrizzleIcon />,
		Rain: <RainIcon />,
		Snow: <SnowIcon />,
		Mist: <MistIcon />,
		Smoke: <SmokeIcon />,
		Haze: <HazeIcon />,
		Dust: <DustIcon />,
		Fog: <FogIcon />,
		Sand: <DustIcon />,
		Ash: <AshIcon />,
		Squall: <SquallIcon />,
		Tornado: <TornadoIcon />,
		Clear: <ClearSkyIcon />,
		Clouds: <CloudIcon />
	};
	return (
		<div className='forecast__container width--30 height--full-viewport overflow--auto'>
			{!isLoading && (
				<React.Fragment>
					<div className='flex justify-content--between align-items--center'>
						<p className='m--25 font--semi-bold font-size--28 flex flex--column '>
							{weatherData?.name}
							<span className='font-size--md'>{weatherData.sys?.country}</span>
						</p>
						<div>{!isEmpty(weatherData) && weatherConditionIconMapper[weatherData.weather[0]?.main]}</div>
					</div>

					<div className='break__line' />
					<p className='m--25 pt--15 font--semi-bold font-size--24'>Weather Details</p>

					<p className='m--25 flex justify-content--between align-items--center'>
						<span className='font--semi-bold mr--10'>Feels like</span>
						{weatherData.main?.feels_like}&deg;C
					</p>

					<p className='m--25 flex justify-content--between align-items--center'>
						<span className='font--semi-bold mr--10'>Sunrise</span>
						{new Date(weatherData.sys?.sunrise * 1000).toLocaleTimeString('en-IN')}
					</p>

					<p className='m--25 flex justify-content--between align-items--center'>
						<span className='font--semi-bold mr--10'>Sunset</span>
						{new Date(weatherData.sys?.sunset * 1000).toLocaleTimeString('en-IN')}
					</p>

					<p className='m--25 flex justify-content--between align-items--center'>
						<span className='font--semi-bold mr--10'>Humidity</span>
						{weatherData.main?.humidity} %
					</p>

					<p className='m--25 flex justify-content--between'>
						<span className='font--semi-bold mr--10'>Visibility</span>
						{visibilityInKm} km
					</p>

					<div className='break__line' />
					<div className='flex justify-content--between m--10'>
						<div className='m--25 flex  flex--column'>
							<p className='font--semi-bold mr--10 font-size--22 flex align-items--center'>
								Wind
								{/* <span> */}
								<CompassIcon width='50' height='50' />
								{/* </span> */}
							</p>

							<h1 className='mt--30'>
								{weatherData.wind?.speed}
								<span className='ml--10 font--medium'>kph</span>
							</h1>
						</div>
						<div className='horizontal_break__line mt--20' />
						<div className='m--25 flex  flex--column'>
							<p className='font--semi-bold mr--10 font-size--22 flex align-items--center'>
								Pressure
								<PressureIcon width='50' height='50' />
							</p>
							<h1 className='mt--30'>
								{weatherData.main?.pressure}
								<span className='ml--10 font--medium'>hpa</span>
							</h1>
						</div>
					</div>
				</React.Fragment>
			)}
			{isLoading && <Spinner />}
		</div>
	);
};

export default ForecastDetails;
