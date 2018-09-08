import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import styles from './CardInfo.css';

const CardInfo = props => {
	const teamName = (teamId, teams) => {
		const { name } = teams.find(team => team.teamId === teamId);
		return name;
	};
	const formatDate = date => {
		return moment(date).format(' MM-DD-YYYY');
	};
	return (
		<div className={styles.cardInfo}>
			<span className={styles.teamName}>
				{teamName(props.team, props.teams)}
			</span>
			<span className={styles.date}>
				<FontAwesome name="clock-o" />
				{formatDate(props.date)}
			</span>
			<p className={styles.cardTitle}>{props.title}</p>
		</div>
	);
};

export default CardInfo;
