import React from 'react';
import 'icon';
import Header from 'header';
import Router from 'router';
import NavigationBar from 'navigation';

const App: React.FC = () => {
	return (
		<>
			<Header />
			<NavigationBar />
			<Router />
		</>
	);
};

export default App;
