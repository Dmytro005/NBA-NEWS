import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import styles from './SideNav.css';

const SideNavItems = () => {
	const items = [
		{
			type: styles.option,
			icon: 'home',
			text: 'Home',
			link: '/'
		},
		{
			type: styles.option,
			icon: 'file-text-o',
			text: 'News',
			link: '/news'
		},
		{
			type: styles.option,
			icon: 'play',
			text: 'Videos',
			link: '/videos'
		},
		{
			type: styles.option,
			icon: 'sign-in',
			text: 'Sign-in',
			link: '/sign-in'
		},
		{
			type: styles.option,
			icon: 'sign-out',
			text: 'Sign-out',
			link: '/sign-out'
		}
	];

	const showItems = () => {
		return items.map((el, i) => {
			return (
				<div className={el.type} key={i}>
					<Link to={el.link}>
						<FontAwesome name={el.icon} />
						{el.text}
					</Link>
				</div>
			);
		});
	};

	return <div>{showItems()}</div>;
};

export default SideNavItems;
