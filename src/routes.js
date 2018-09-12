import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout/layout';
import Home from './components/Home/home';

import NewsArticle from 'components/Articles/News/Post/index';
import VideoArticle from 'components/Articles/Videos/Video/index';
import NewsView from 'components/NewsView/NewsView';
import VideosView from 'components/VideosView/VideosView';
import SignInView from 'components/SignIn/SignInView';
import DashboardView from 'components/Dashboard/DashboardView';

const Routes = props => {
	return (
		<Layout user={props.user}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/articles/:id" exact component={NewsArticle} />
				<Route path="/videos/:id" exact component={VideoArticle} />
				<Route path="/news" exact component={NewsView} />
				<Route path="/videos" exact component={VideosView} />
				<Route path="/sign-in" exact component={SignInView} />
				<Route path="/dashboard" exact component={DashboardView} />
			</Switch>
		</Layout>
	);
};

export default Routes;
