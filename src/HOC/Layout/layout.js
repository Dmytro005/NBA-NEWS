import React, { Component } from 'react';
import './layout.css';
import Header from 'components/Header/header';

class Layout extends Component {
	render() {
		return (
			<div>
				<Header />
				{this.props.children}
				<p>Footer</p>
			</div>
		);
	}
}

export default Layout;
