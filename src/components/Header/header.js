import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import style from './header.css';
import SideNav from './SideNav/SideNav';

const Header = props => {
	const logo = () => {
		return (
			<Link to="/" className={style.logo}>
				<img src="/images/nba_logo.png" alt="nba logo" />
			</Link>
		);
	};

	const navBars = () => (
		<FontAwesome
			onClick={props.onOpenNav}
			name="bars"
			style={{
				color: 'white',
				padding: '10px',
				cursor: 'pointer',
				fontSize: '20px'
			}}
		/>
	);

	return (
		<header className={style.header}>
			<SideNav {...props} />
			<div className={style.headerOpt}>
				{navBars()}
				{logo()}
			</div>
		</header>
	);
};

export default Header;
