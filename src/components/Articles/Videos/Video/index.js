import React, { Component } from 'react';

import Header from './header';
import VideosRelated from 'components/VideosList/VideosRelated/VideosRelated';

import styles from './../../articles.css';

import {
	firebaseDB,
	firebaseTeams,
	firebaseVideos,
	firebaseLooper
} from 'firebaseConfig/firebase';

class VideoArticle extends Component {
	state = {
		article: {},
		team: null,
		teams: [],
		related: []
	};
	async componentWillMount() {
		firebaseDB
			.ref(`videos/${this.props.match.params.id}`)
			.once('value')
			.then(snapshot => {
				const article = snapshot.val();

				firebaseTeams
					.orderByChild('teamId')
					.equalTo(article.team)
					.once('value')
					.then(snapshot => {
						const team = firebaseLooper(snapshot)[0];
						this.setState({
							article,
							team
						});
						this.getRelated();
					});
			});
	}

	getRelated() {
		firebaseTeams.once('value').then(snapshot => {
			const teams = firebaseLooper(snapshot);

			firebaseVideos
				.orderByChild('team')
				.equalTo(this.state.article.team)
				.limitToFirst(3)
				.once('value')
				.then(snapshot => {
					const related = firebaseLooper(snapshot);
					this.setState({
						teams,
						related
					});
				});
		});
	}

	render() {
		const { team, article } = this.state;
		return (
			<div>
				<Header team={team} />
				<div className={styles.videoWrapper}>
					<h1>{article.title}</h1>
					<iframe
						title="videoplayer"
						width="100%"
						height="300px"
						src={`https://www.youtube.com/embed/${article.url}`}
					/>
				</div>
				<VideosRelated data={this.state.related} teams={this.state.teams} />
			</div>
		);
	}
}

export default VideoArticle;
