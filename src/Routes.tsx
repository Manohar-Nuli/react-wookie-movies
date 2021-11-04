import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import PageNotFound from './pages/PageNotFound';

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/detail/:slug">
				<Details />
			</Route>
			<Route path="*">
				<PageNotFound />
			</Route>
		</Switch>
	);
};

export default Routes;
