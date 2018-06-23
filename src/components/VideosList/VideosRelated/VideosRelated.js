import React from 'react';

import styles from '../VideosList.css';
import VideosListTemplate from '../VideosListTemplate';

const VideosRealted = props => {
	return (
		<div className={styles.relatedWrapper}>
			<VideosListTemplate data={props.data} teams={props.teams} />
		</div>
	);
};

export default VideosRealted;
