import { SearchIcon } from 'shared/components/icons/icons';
import hazeWeather from '../../../assets/weatherVideo/hazeWeather.mp4';

const ForecastHeader = () => {
	return (
		<div className='width--70 '>
			<video
				src={hazeWeather}
				autoPlay
				loop
				muted
				className='background__weather position--absolute z-index--negative-1 width--70'
			/>
			<div className='flex justify-content--between m--20'>
				<p className='ml--20'>
					WeatherNow <sup>Tm</sup>
				</p>
				<SearchIcon width={'20px'} height={'20px'} />
			</div>
		</div>
	);
};

export default ForecastHeader;
