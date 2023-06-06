import { isEmpty } from 'lodash';

import Select, { StylesConfig } from 'react-select';
import { SearchIcon } from 'shared/components/icons/icons';
import {
	CITY_NAME_LIST,
	reactSelectStyles,
	weatherConditionMapper,
	weatherSafetyMapper
} from 'shared/constants/constant';
import { IDropDownOptions, IForecast } from '../interface/interface';
import hazeWeather from '../../../assets/weatherVideo/hazeWeather.mp4';
import { useState } from 'react';

const ForecastHeader: React.FC<IForecast> = ({ weatherData, getWeatherData, getWeeklyData, setCity }) => {
	const [selectedOption, setSelectedOption] = useState();
	const handleChange = (selectedOption: any) => {
		setSelectedOption(selectedOption);
		getWeatherData && getWeatherData(selectedOption?.value);
		getWeeklyData && getWeeklyData();
		setCity && setCity('');
	};
	return (
		<div className='width--70 '>
			<video
				src={hazeWeather}
				autoPlay
				loop
				muted
				className='background__weather position--absolute z-index--negative-1 width--70 height--full-viewport'
			/>
			<div className='flex justify-content--between m--35'>
				<p className='ml--20 font--bold '>
					WeatherNow <sup className='font--bold'>Tm</sup>
				</p>
				<div className='position--relative search_wrapper'>
					<Select
						value={selectedOption}
						onChange={handleChange}
						options={CITY_NAME_LIST}
						className='form-field no-padding width--206px cursor-pointer'
						isSearchable={true}
						isClearable={true}
						placeholder={'Search city name'}
						styles={reactSelectStyles as StylesConfig<IDropDownOptions, false>}
					/>
					<SearchIcon className='position--absolute search_icon' width='20' height='20' />
				</div>
			</div>
			{!isEmpty(weatherData) && (
				<div className='height--full flex align-items--center m--35'>
					<p className='font-size--128 ml--30 position--relative font--semi-bold'>
						{Math.trunc(weatherData.main?.temp)}
						<sup className='font-size--50 position--absolute top--10'>&deg;</sup>
					</p>
					<div className='flex flex--column'>
						<p className='font-size--30 ml--45 width--full '>
							{weatherConditionMapper[weatherData.weather[0]?.main]}
						</p>
						<span className='font-size--20 mt--20 ml--45 '>
							{weatherSafetyMapper[weatherData.weather[0]?.main]}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForecastHeader;
