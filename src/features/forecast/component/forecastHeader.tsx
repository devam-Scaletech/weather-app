import { SearchIcon } from 'shared/components/icons/icons';
import hazeWeather from '../../../assets/weatherVideo/hazeWeather.mp4';
import { weatherConditionMapper, weatherSafetyMapper } from 'shared/constants/constant';
import { isEmpty } from 'lodash';

interface IForecastHeader {
	weatherData: Record<string, any>;
}
const ForecastHeader: React.FC<IForecastHeader> = ({ weatherData }) => {
	return (
		<div className='width--70 '>
			<video
				src={hazeWeather}
				autoPlay
				loop
				muted
				className='background__weather position--absolute z-index--negative-1 width--70'
			/>
			<div className='flex justify-content--between m--35'>
				<p className='ml--20 font--bold '>
					WeatherNow <sup className='font--bold'>Tm</sup>
				</p>
				<SearchIcon width={'20px'} height={'20px'} />
			</div>
			<div className='height--full flex align-items--center m--35'>
				<p className='font-size--128 ml--30 position--relative font--semi-bold'>
					{Math.trunc(weatherData.main?.temp)}
					{!isEmpty(weatherData) && <sup className='font-size--50 position--absolute top--10'>&deg;</sup>}
				</p>
				<div className='flex flex--column'>
					<p className='font-size--30 ml--45 width--full '>
						{!isEmpty(weatherData) && weatherConditionMapper[weatherData.weather[0]?.main]}
					</p>
					<span className='font-size--20 mt--20 ml--45 '>
						{!isEmpty(weatherData) && weatherSafetyMapper[weatherData.weather[0]?.main]}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ForecastHeader;
