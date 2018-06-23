import React, { Component } from 'react';

import Header from './header';

import axios from 'utils/axios';
class VideoArticle extends Component {
	state = {
		article: {},
		team: null
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
			});
	}

	render() {
		const { team, article } = this.state;
		return (
			<div>
				<Header team={team} />
			</div>
		);
	}
}

export default VideoArticle;
