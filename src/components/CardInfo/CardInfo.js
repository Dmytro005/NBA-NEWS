import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './CardInfo.css';

const CardInfo = props => {
	const teamName = (teamId, teams) => {
		const { name } = teams.find(team => team.id === teamId);
		return name;
	};
	return (
		<div className={styles.cardInfo}>
			<span className={styles.teamName}>{teamName(props.team, props.teams)}</span>
			<span className={styles.date}>
				<FontAwesome name="clock-o" />
				{props.date}
			</span>
			<p className={styles.cardTitle}>{props.title}</p>
		</div>
	);
};

export default CardInfo;
