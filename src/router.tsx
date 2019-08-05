import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Home } from 'home';
import { NotFound } from './not-found';

const Router: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Redirect exact from="/" to="/home" />
				<Route path="/home" component={Home} />
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	);
};

export default Router;
