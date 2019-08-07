import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from 'home';
import { Paper } from './paper';
import { NotFound } from './not-found';
import About from 'about';
import Archive from 'archive';

const Router: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Redirect exact from="/" to="/home" />
				<Route path="/home" component={Home} />
				<Route path="/paper/:name/:id" component={Paper} />
				<Route path="/about" component={About} />
				<Route path="/archive" component={Archive} />
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	);
};

export default Router;
