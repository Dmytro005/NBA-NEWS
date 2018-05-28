import React from 'react';

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
			default:
				break;
		}
		return template;
	};

	return renderButton(props.type);
};

export default Button;
