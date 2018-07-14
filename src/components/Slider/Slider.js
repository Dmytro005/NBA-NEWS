import React, { Component } from 'react';

import { firebaseArticles, firebaseLooper } from 'firebaseConfig/firebase';

import SliderTemplates from './SliderTemplates';

class Slider extends Component {
	state = {
		news: []
	};

	componentWillMount() {
		firebaseArticles
			.limitToFirst(4)
			.once('value')
			.then(snapshot => {
				this.setState({
					news: firebaseLooper(snapshot)
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
