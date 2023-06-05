import { ReactNode } from 'react';

export interface IWeatherIcon {
	[key: string]: ReactNode;
}

export interface IForecast {
	weatherData: Record<string, any>;
	getWeatherData?: (cityName: string) => void;
	isLoading?: boolean;
}

export interface IDropDownOptions {
	label: string;
	value: string;
}
