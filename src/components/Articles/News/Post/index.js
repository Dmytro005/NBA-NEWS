import React, { Component } from 'react';
import axios from 'utils/axios';

import Header from './header';

import styles from './../../articles.css';
class NewsArticle extends Component {
	state = {
		article: {},
		team: null
	};

	async componentWillMount() {
		await axios
			.get(`/articles?id=${this.props.match.params.id}`)
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
		const { article, team } = this.state;
		return (
			<div>
				<Header teamData={team} date={article.date} author={article.author} />
				<div className={styles.articleBody}>
					<h1>{article.title}</h1>
					<div
						className={styles.articleImage}
						style={{
							background: `url(../images/articles/${article.image})`
						}}
					/>

					<div className={styles.articleText}>{article.body}</div>
				</div>
			</div>
		);
	}
}

export default NewsArticle;
