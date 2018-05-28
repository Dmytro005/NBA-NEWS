import React from 'react';
import Slick from 'react-slick';

import { Link } from 'react-router-dom';
import styles from './slider.css';

const SliderTemplates = props => {
	let template = null;

	let baseSettings = {
		dotsClass: `slick-dots ${styles.featured_dots}`,
		...props.settings
	};

	switch (props.type) {
		case 'featured':
			template = props.data.map((el, i) => {
				return (
					<div key={i}>
						<div className={styles.featured_item}>
							<div
								className={styles.featured_image}
								style={{
									background: `url(../images/articles/${el.image})`
								}}
							/>
							<Link to={`/articles/${el.id}`}>
								<div className={styles.featured_caption}>{el.title}</div>
							</Link>
						</div>
					</div>
				);
			});
			break;

		default:
			template = null;
			break;
	}

	return <Slick {...baseSettings}>{template}</Slick>;
};

export default SliderTemplates;
