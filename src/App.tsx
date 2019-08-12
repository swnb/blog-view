import React from 'react';
import 'icon';
import Header from 'header';
import Router from 'router';
import NavigationBar from 'navigation';
import { Footer } from 'footer';

const App: React.FC = () => {
	return (
		<>
			<Header />
			<NavigationBar />
			<Router />
			<Footer />
		</>
	);
};

export default App;
