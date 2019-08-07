import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from 'home';
import { Paper } from './paper';
import { NotFound } from './not-found';

const Router: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Redirect exact from="/" to="/home" />
				<Route path="/home" component={Home} />
				<Route path="/paper/:id" component={Paper} />
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	);
};

export default Router;
