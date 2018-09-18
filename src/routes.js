import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './HOC/Layout/layout';
import Home from './components/Home/home';

import NewsArticle from 'components/Articles/News/Post/index';
import VideoArticle from 'components/Articles/Videos/Video/index';
import NewsView from 'components/NewsView/NewsView';
import VideosView from 'components/VideosView/VideosView';
import SignInView from 'components/SignIn/SignInView';
import DashboardView from 'components/Dashboard/DashboardView';

import PrivatRoute from 'components/AuthRoutes/privatRoutes';
import PublicRoute from 'components/AuthRoutes/publicRoutes';

const Routes = props => {
	return (
		<Layout user={props.user}>
			<Switch>
				<PublicRoute
					{...props}
					restricted={false}
					path="/"
					exact
					component={Home}
				/>
				<PublicRoute
					{...props}
					restricted={false}
					path="/articles/:id"
					exact
					component={NewsArticle}
				/>
				<PublicRoute
					{...props}
					restricted={false}
					path="/news"
					exact
					component={NewsView}
				/>
				<PublicRoute
					{...props}
					restricted={false}
					path="/videos/:id"
					exact
					component={VideoArticle}
				/>

				<PublicRoute
					{...props}
					restricted={false}
					path="/videos"
					exact
					component={VideosView}
				/>
				<PublicRoute
					{...props}
					restricted={true}
					path="/sign-in"
					exact
					component={SignInView}
				/>

				<PrivatRoute
					{...props}
					path="/dashboard"
					exact
					component={DashboardView}
				/>
			</Switch>
		</Layout>
	);
};

export default Routes;
