import React, { Component } from 'react';

import Header from './header';
import VideosRelated from 'components/VideosList/VideosRelated/VideosRelated';

import styles from './../../articles.css';
import axios from 'utils/axios';
class VideoArticle extends Component {
	state = {
		article: {},
		team: null,
		teams: [],
		related: []
	};
	async componentWillMount() {
		await axios
			.get(`/videos?id=${this.props.match.params.id}`)
			.then(article => {
				axios.get(`teams?id=${article.data[0].team}`).then(team => {
					this.setState({
						article: article.data[0],
						team: team.data[0]
					});
				});
				this.getRelated();
			});
	}

	getRelated() {
		axios.get('/teams').then(response => {
			const teams = response.data;
			axios
				.get(`/videos?q=${this.state.team.city}&_limit=6`)
				.then(({ data }) => {
					this.setState({
						teams,
						related: data
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
