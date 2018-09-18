import React from 'react';
import { Link } from 'react-router-dom';

import CardInfo from 'components/CardInfo/CardInfo';
import styles from './VideosListTemplate.css';

const VideosListTemplate = props => {
	const { data, teams } = props;
	return data && teams
		? props.data.map((item, i) => {
				return (
					<Link
						to={`/videos/${item.id}`}
						key={i}
						style={{ textDecoration: 'none' }}
					>
						<div className={styles.videoListItem__wrapper}>
							<div
								className={styles.left}
								style={{
									background: `url(/images/videos/${item.image})`
								}}
							>
								<div />
							</div>
							<div className={styles.right}>
								<CardInfo {...item} teams={props.teams} />
							</div>
						</div>
					</Link>
				);
		  })
		: null;
};

export default VideosListTemplate;
