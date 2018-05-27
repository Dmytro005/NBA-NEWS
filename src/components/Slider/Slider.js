import React, { Component } from 'react';
import axios from 'utils/axios';

class Slider extends Component {
	state = {
		news: []
	};

	componentWillMount() {
		axios.get('/articles?_end=5').then(({ data }) => {
			this.setState({
				news: [...data]
			});
		});
	}

	compo() {
		console.log(this.state);
	}

	render() {
		return (
			<div>
				{this.state.news.map((n, i) => {
					return <h1 key={i}>{`${i + 1}. ${n.title}`}</h1>;
				})}
			</div>
		);
	}
}

export default Slider;
