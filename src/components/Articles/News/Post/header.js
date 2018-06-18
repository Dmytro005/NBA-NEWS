import React from 'react';

import TeamInfo from '../../Elements/TeamInfo';
import PostData from '../../Elements/PostData';

const Header = props => {
	const teamInfoRender = team => (team ? <TeamInfo team={team} /> : null);

	const renderPostData = (date, author) => {
		return <PostData data={{ date, author }} />;
	};

	return (
		<div>
			{teamInfoRender(props.teamData)}
			{renderPostData(props.date, props.author)}
		</div>
	);
};

export default Header;
