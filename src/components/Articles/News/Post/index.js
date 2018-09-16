import React, { Component } from 'react';
import Header from './header';

import {
	firebaseDB,
	firebaseTeams,
	firebaseLooper
} from 'firebaseConfig/firebase';

import styles from './../../articles.css';
class NewsArticle extends Component {
	state = {
		article: {},
		team: null
	};

	async componentWillMount() {
		firebaseDB
			.ref(`articles/${this.props.match.params.id}`)
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
					});
			});
	}

	render() {
		const { article, team } = this.state;
		return (
			<div>
				<Header teamData={team} date={article.date} author={article.author} />
				<div className={styles.articleBody}>
					<h1>{article.title}</h1>
					<div
						className={styles.articleImage}
						style={{
							background: `url(${article.image})`
						}}
					/>

					<div className={styles.articleText}>{article.body}</div>
				</div>
			</div>
		);
	}
}

export default NewsArticle;
