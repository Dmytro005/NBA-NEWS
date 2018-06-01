import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.css';

const Button = props => {
	const renderButton = type => {
		let template = null;
		switch (type) {
			case 'loadMore':
				template = (
					<button onClick={props.onLoadMore} className={styles.loadMoreBtn}>
						{props.text}
					</button>
				);
				break;
			case 'linkTo':
				template = (
					<div className={styles.loadMoreLink}>
						<Link to={props.linkTo} className={styles.loadMoreBtn}>
							{props.text}
						</Link>
					</div>
				);
				break;
			default:
				break;
		}
		return template;
	};

	return renderButton(props.type);
};

export default Button;
