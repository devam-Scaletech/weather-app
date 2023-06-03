import { SearchIcon } from 'shared/components/icons/icons';
import ForecastDetails from './forecastDetails';

const ForecastHeader = () => {
	return (
		<div className='flex'>
			<div className='width--70 m--20'>
				<div className='flex justify-content--between'>
					<p className='ml--20'>
						Weather <sup>Tm</sup>
					</p>
					<SearchIcon width={'20px'} height={'20px'} />
				</div>
			</div>
			<ForecastDetails />
		</div>
	);
};

export default ForecastHeader;
