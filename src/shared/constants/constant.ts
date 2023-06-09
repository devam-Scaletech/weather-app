import { CSSProperties } from 'react';
import moment from 'moment';
import { IWeatherCondition } from 'shared/interface';
import Thunderstorm from 'assets/weatherVideo/Thunderstorm.mp4';
import Rain from 'assets/weatherVideo/Rain.mp4';
import snow from 'assets/weatherVideo/snow.mp4';
import Fog from 'assets/weatherVideo/Fog.mp4';
import hazeWeather from 'assets/weatherVideo/hazeWeather.mp4';
import dust from 'assets/weatherVideo/dust.mp4';
import Tornado from 'assets/weatherVideo/Tornado.mp4';
import skyClear from 'assets/weatherVideo/skyClear.mp4';
import cloud from 'assets/weatherVideo/cloud.mp4';

export const metersToKilometers = (meters: number) => {
	return meters / 1000;
};

export const formatTime = (time: number) => {
	return moment(new Date(time * 1000), 'hh:mm:ss A').format('hh : mm A');
};

export const weatherConditionMapper: { [key: string]: IWeatherCondition } = {
	Thunderstorm: {
		condition: 'Expect thunderstorms today.',
		safetyMsg: 'Stay indoors and avoid open areas during thunderstorms.',
		weatherVideo: Thunderstorm
	},
	Drizzle: {
		condition: 'Expect light rain or drizzle today.',
		safetyMsg: 'Carry an umbrella or raincoat for light rain or drizzle.',
		weatherVideo: Rain
	},
	Rain: {
		condition: 'Expect rain showers today.',
		safetyMsg: 'Use an umbrella or raincoat to stay dry during rain showers.',
		weatherVideo: Rain
	},
	Snow: {
		condition: 'Expect snowfall today.',
		safetyMsg: 'Wear warm clothing and be cautious of slippery surfaces due to snowfall.',
		weatherVideo: snow
	},
	Mist: {
		condition: 'Expect misty conditions today.',
		safetyMsg: 'Drive with caution and use low-beam headlights in misty conditions.',
		weatherVideo: Fog
	},
	Smoke: {
		condition: 'Expect smoky conditions today.',
		safetyMsg: 'Avoid outdoor activities and stay indoors if there is smoke in the air.',
		weatherVideo: Fog
	},
	Haze: {
		condition: 'Expect hazy conditions today.',
		safetyMsg: 'Reduce outdoor activities and wear a mask in hazy conditions.',
		weatherVideo: hazeWeather
	},
	Dust: {
		condition: 'Expect dusty conditions today.',
		safetyMsg: 'Protect your eyes and respiratory system from dusty conditions.',
		weatherVideo: dust
	},
	Fog: {
		condition: 'Expect foggy conditions today.',
		safetyMsg: 'Drive with caution and use low-beam headlights in foggy conditions.',
		weatherVideo: Fog
	},
	Sand: {
		condition: 'Expect sandy conditions today.',
		safetyMsg: 'Cover your face and protect your eyes in sandy conditions.',
		weatherVideo: dust
	},
	Ash: {
		condition: 'Expect ash in the air today.',
		safetyMsg: 'Stay indoors and wear a mask if there is ash in the air.',
		weatherVideo: dust
	},
	Squall: {
		condition: 'Expect squally weather today.',
		safetyMsg: 'Take shelter and secure loose objects during squally weather.',
		weatherVideo: Thunderstorm
	},
	Tornado: {
		condition: 'Expect tornado-like conditions today.',
		safetyMsg: 'Seek shelter immediately and follow tornado safety protocols.',
		weatherVideo: Tornado
	},
	Clear: {
		condition: 'Expect clear skies today.',
		safetyMsg: 'Enjoy the clear skies and pleasant weather.',
		weatherVideo: skyClear
	},
	Clouds: {
		condition: 'Expect cloudy conditions today.',
		safetyMsg: 'Expect cloudy conditions but no specific safety measures required.',
		weatherVideo: cloud
	}
};

export const reactSelectStyles = {
	option: (base: CSSProperties, state: any) => ({
		...base,
		color: 'black',
		backgroundColor: state.isSelected ? '#297CC0' : state.isFocused ? '#297CC0' : '',
		':active': {
			backgroundColor: '#297CC0',
			color: 'white'
		},
		cursor: 'pointer'
	}),
	valueContainer: (base: CSSProperties) => {
		return {
			...base,
			marginLeft: 25
		};
	},
	menu: (base: CSSProperties) => ({
		...base,
		zIndex: 3,
		marginTop: 4,
		width: '150px'
	}),
	menuList: (base: CSSProperties) => ({
		...base,
		padding: 0,
		backgroundColor: '#ffffff !important',
		borderRadius: '8px',
		width: '300px'
	}),
	clearIndicator: (base: CSSProperties) => ({
		...base,
		cursor: 'pointer'
	}),
	dropdownIndicator: (base: CSSProperties, state: any) => ({
		...base,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
		color: '#081D34'
	}),
	indicatorSeparator: () => ({
		width: '0'
	}),
	control: () => ({
		// none of react-selects styles are passed to <View />
		display: 'flex',
		width: '300px',
		minHeight: '34px !important',
		padding: '0px !important',
		borderRadius: '8px',
		color: 'white',
		border: '1px solid #D4D6D9',
		backgroundColor: '#ffffff !important'
	}),
	singleValue: (base: CSSProperties, state: any) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';
		return { ...base, opacity: opacity, transition: transition };
	},
	noOptionsMessage: (base: CSSProperties) => {
		return { ...base };
	}
};
