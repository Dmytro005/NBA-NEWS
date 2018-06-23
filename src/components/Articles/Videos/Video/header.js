import React from 'react';
import TeamInfo from './../../Elements/TeamInfo';

const Header = props => {
	const teamInfoRender = team => (team ? <TeamInfo team={team} /> : null);

	return <div>{teamInfoRender(props.team)}</div>;
};

export default Header;
