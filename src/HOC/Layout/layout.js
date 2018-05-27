import React, { Component } from 'react';
import './layout.css';

class Layout extends Component {
	render() {
		console.log(this.props.children);

		return (
			<div>
				<p>Header</p>
				{this.props.children}
				<p>Footer</p>
			</div>
		);
	}
}

export default Layout;
