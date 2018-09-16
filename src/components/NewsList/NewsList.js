import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import Button from 'components/Buttons/Button';
import CardInfo from 'components/CardInfo/CardInfo';

import {
	firebaseArticles,
	firebaseTeams,
	firebaseLooper
} from 'firebaseConfig/firebase';

import styles from './NewsList.css';

class NewsList extends Component {
	state = {
		teams: [],
		items: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	};

	componentWillMount() {
		this.request(this.state.start, this.state.end);
	}

	request = (start, end) => {
		if (this.state.teams.length < 1) {
			firebaseTeams.once('value').then(snapshot => {
				const teams = firebaseLooper(snapshot);
				this.setState({
					teams
				});
			});
		}

		firebaseArticles
			.orderByChild('id')
			.startAt(start)
			.endAt(end)
			.once('value')
			.then(snapshot => {
				const articles = firebaseLooper(snapshot);
				console.log(articles);

				this.setState({
					items: [...this.state.items, ...articles],
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

	renderNews(type) {
		let template = null;
		if (!!this.state.teams.length) {
			switch (type) {
				case 'card':
					template = this.state.items.map((el, i) => (
						<CSSTransition
							classNames={{
								enter: styles.newsList__wrapper,
								enterActive: styles.newsList__wrapper_enter
							}}
							timeout={500}
							key={i}
						>
							<div>
								<div className={styles.newsList__item}>
									<Link to={`/articles/${el.id}`}>
										<CardInfo {...el} teams={this.state.teams} />
									</Link>
								</div>
							</div>
						</CSSTransition>
					));
					break;

				case 'mainCard':
					template = this.state.items.map((el, i) => (
						<CSSTransition
							classNames={{
								enter: styles.newsList__wrapper,
								enterActive: styles.newsList__wrapper_enter
							}}
							timeout={500}
							key={i}
						>
							<div>
								<div className={styles.newsList__cardMain}>
									<Link
										to={`/articles/${el.id}`}
										className={styles.newsList__cardWrapper}
									>
										<img
											src={`../images/articles/${el.image}`}
											className={styles.newsList__cardWrapper__image}
											alt=""
										/>
										<div className={styles.newsList__cardMain__data}>
											<CardInfo {...el} teams={this.state.teams} />
										</div>
									</Link>
								</div>
							</div>
						</CSSTransition>
					));
					break;
				default:
					break;
			}
		}

		return template;
	}

	render() {
		return (
			<div>
				<TransitionGroup component="div" className="list">
					{this.renderNews(this.props.type)}
				</TransitionGroup>
				<Button
					type="loadMore"
					onLoadMore={() => this.loadMore()}
					text="Load more News"
				/>
			</div>
		);
	}
}

export default NewsList;
