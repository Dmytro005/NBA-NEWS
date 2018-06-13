import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout/layout';
import Home from './components/Home/home';

import NewsArticle from 'components/Articles/News/Post/index';
// import VideArticle from 'components/'

class Routes extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/articles/:id" exact component={NewsArticle} />
					{/* <Route path="videos/:id" exact component={VideArticle} /> */}
				</Switch>
			</Layout>
		);
	}
}

export default Routes;
