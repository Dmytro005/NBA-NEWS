import React, { Component } from 'react';

import VideosListTemplate from './VideosListTemplate';
import Button from 'components/Buttons/Button';
import {
	firebaseTeams,
	firebaseVideos,
	firebaseLooper
} from 'firebaseConfig/firebase';

import styles from './VideosList.css';

class VideosList extends Component {
	state = {
		teams: [],
		videos: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	};

	componentWillMount() {
		this.request(this.state.start, this.state.end);
	}

	request = async (start, end) => {
		if (this.state.teams.length < 1) {
			firebaseTeams.once('value').then(snapshot => {
				const teams = firebaseLooper(snapshot);
				this.setState({
					teams
				});
			});
		}

		firebaseVideos
			.orderByChild('id')
			.startAt(start)
			.endAt(end)
			.once('value')
			.then(snapshot => {
				const articles = firebaseLooper(snapshot);
				this.setState({
					videos: [...this.state.videos, ...articles],
					start,
					end
				});
			})
			.catch(e => {
				console.log(e);
			});
	};

	loadMore = () => {
		const end = this.state.end + this.state.amount;
		this.request(this.state.end + 1, end);
	};

	renderVideos = type => {
		let template = null;
		switch (type) {
			case 'card':
				template = (
					<VideosListTemplate
						data={this.state.videos}
						teams={this.state.teams}
					/>
				);
				break;
			default:
				break;
		}
		return template;
	};

	renderTitle = title => {
		return title ? (
			<h3>
				<strong>NBA</strong> Videos
			</h3>
		) : null;
	};

	renderButton = () => {
		return this.props.loadMore ? (
			<Button
				type="loadMore"
				text="Load more videos"
				onLoadMore={() => this.loadMore()}
			/>
		) : (
			<Button type="linkTo" text="Go to videos" linkTo="/videos" />
		);
	};

	render() {
		return (
			<div className={styles.videoList__wrapper}>
				{this.renderTitle(this.props.title)}
				{this.renderVideos(this.props.type)}
				{this.renderButton()}
			</div>
		);
	}
}

export default VideosList;
