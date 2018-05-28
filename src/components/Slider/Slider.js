import React, { Component } from 'react';
import axios from 'utils/axios';

import SliderTemplates from './SliderTemplates';

class Slider extends Component {
	state = {
		news: []
	};

	componentWillMount() {
		axios
			.get(`/articles?_start=${this.props.start}&_end=${this.props.amount}`)
			.then(({ data }) => {
				this.setState({
					news: [...data]
				});
			});
	}

	render() {
		return (
			<SliderTemplates
				data={this.state.news}
				type={this.props.type}
				settings={this.props.settings}
			/>
		);
	}
}

export default Slider;
