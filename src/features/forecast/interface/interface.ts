import { ReactNode } from 'react';

export interface IWeatherIcon {
	[key: string]: ReactNode;
}

export interface IForecast {
	weatherData: Record<string, any>;
	isLoading?: boolean;
}
