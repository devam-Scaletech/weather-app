import { useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { GroupBase, NoticeProps, StylesConfig, components } from 'react-select';
import isEmpty from 'lodash/isEmpty';
import httpService from 'shared/services/http.service';
import { reactSelectStyles, weatherConditionMapper } from 'shared/constants/constant';
import { SearchIcon } from 'shared/components/icons/icons';
import { IDropDownOptions, IForecast } from '../interface/interface';

const ForecastHeader: React.FC<IForecast> = ({
	weatherData,
	getWeatherData,
	getWeeklyData,
	isLoading,
	selectedOption,
	setSelectedOption
}) => {
	const API_KEY_VALUE = process.env.REACT_APP_API_SEARCH_KEY;

	const loadOptions = useCallback((cityName: string, callback: (options: IDropDownOptions[]) => void) => {
		cityName &&
			httpService
				.get(`${'https://api.weatherapi.com/v1/search.json'}?key=${API_KEY_VALUE}&q=${cityName}`)
				.then((data) => {
					const options = data.map((item: any) => ({
						value: item.id,
						label: item.name + ',' + item.country
					}));
					callback(options);
				})
				.catch((error) => {
					console.error('Error fetching options:', error);
					callback([]);
				});
	}, []);

	const handleOnChange = useCallback(
		(selectedOption: IDropDownOptions | null) => {
			if (selectedOption) {
				setSelectedOption && setSelectedOption(selectedOption);
				getWeatherData && getWeatherData(selectedOption?.label.trim());
				getWeeklyData && getWeeklyData(selectedOption?.label.trim());
			} else {
				getWeatherData && getWeatherData('');
				getWeeklyData && getWeeklyData('');
			}
		},
		[getWeatherData, getWeeklyData]
	);

	const NoOptionsMessage = (props: NoticeProps<IDropDownOptions, false, GroupBase<IDropDownOptions>>) => {
		return (
			<components.NoOptionsMessage {...props}>
				<span className='custom-css-class'>No city found</span>
			</components.NoOptionsMessage>
		);
	};

	return (
		<div className='width--70 forecast_header__container'>
			{!isEmpty(weatherData) && !isLoading && (
				<video
					src={weatherConditionMapper[weatherData.weather[0]?.main].weatherVideo}
					autoPlay
					loop
					muted
					className='background__weather position--absolute z-index--negative-1 width--70 height--full-viewport'
				/>
			)}
			<div className='flex justify-content--between m--35 align-items--center web_name__container'>
				<p className='ml--20 font--extra-bold font-size--22 '>
					WeatherNow <sup className='font--bold'>Tm</sup>
				</p>
				<div className='position--relative search_wrapper'>
					<AsyncSelect
						cacheOptions
						isClearable
						loadOptions={loadOptions}
						defaultOptions
						value={selectedOption}
						onChange={handleOnChange}
						className='form-field no-padding width--206px cursor-pointer'
						styles={reactSelectStyles as StylesConfig<IDropDownOptions, false>}
						components={{ NoOptionsMessage }}
					/>
					<SearchIcon className='position--absolute search_icon' width='20' height='20' />
				</div>
			</div>
			{!isEmpty(weatherData) && (
				<div className='height--full flex align-items--center m--35 current_temp_wrapper'>
					<p className='font-size--128 ml--30 position--relative font--semi-bold current_temp__text'>
						{Math.trunc(weatherData.main?.temp)}
						<sup className='font-size--50 position--absolute top--10'>&deg;</sup>
					</p>
					<div className='flex flex--column weather_msg_text'>
						<p className='font-size--30 ml--45 width--full font--semi-bold'>
							{weatherConditionMapper[weatherData.weather[0]?.main].condition}
						</p>
						<span className='font-size--22 mt--20 ml--45 font--semi-bold'>
							{weatherConditionMapper[weatherData.weather[0]?.main].safetyMsg}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForecastHeader;
