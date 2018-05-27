import React, { Component } from 'react';
import './layout.css';
import Header from 'components/Header/header';

class Layout extends Component {
	state = {
		showNav: false
	};

	toogleSideNav = action => {
		this.setState({
			showNav: action
		});
	};

	render() {
		return (
			<div>
				<Header
					showNav={this.state.showNav}
					onHideNav={() => {
						this.toogleSideNav(false);
					}}
					onOpenNav={() => {
						this.toogleSideNav(true);
					}}
				/>
				{this.props.children}
				<p>Footer</p>
			</div>
		);
	}
}

export default Layout;
