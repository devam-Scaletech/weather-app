import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Forecast from 'features/forecast/component/forecast';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='*' element={<Navigate replace to='/forecast' />} />
			<Route path='/forecast' element={<Forecast />} />
		</Routes>
	);
};

export default App;
