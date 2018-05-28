import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import Button from 'components/Buttons/Button';

import axios from 'utils/axios';
import styles from './NewsList.css';

class NewsList extends Component {
	state = {
		items: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	};

	request = (start, end) => {
		axios
			.get(`/articles?_start=${start}&_end=${end}`)
			.then(({ data }) => this.setState({ items: [...this.state.items, ...data] }));
	};

	componentWillMount() {
		this.request(this.state.start, this.state.end);
	}

	loadMore = () => {
		const end = this.state.end + this.state.amount;
		this.request(this.state.end, end);
	};

	renderNews(type) {
		let template = null;

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
									<h2>{el.title}</h2>
								</Link>
							</div>
						</div>
					</CSSTransition>
				));
				break;
			default:
				break;
		}

		return template;
	}

	render() {
		return (
			<div>
				<TransitionGroup component="div" className="list">
					{this.renderNews(this.props.type)}
				</TransitionGroup>
				<Button type="loadMore" onLoadMore={() => this.loadMore()} text="Load more News" />
			</div>
		);
	}
}

export default NewsList;
