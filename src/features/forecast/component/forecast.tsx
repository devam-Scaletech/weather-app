import ForecastDetails from './forecastDetails';
import ForecastHeader from './forecastHeader';
const Forecast = () => {
	return (
		<div className='flex position--relative'>
			<ForecastHeader />
			<ForecastDetails />
		</div>
	);
};

export default Forecast;
