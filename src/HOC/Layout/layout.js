import React, { Component } from 'react';
import './layout.css';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';

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
					user={this.props.user}
					showNav={this.state.showNav}
					onHideNav={() => {
						this.toogleSideNav(false);
					}}
					onOpenNav={() => {
						this.toogleSideNav(true);
					}}
				/>
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default Layout;
