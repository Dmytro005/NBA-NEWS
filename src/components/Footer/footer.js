import React from 'react';
import { Link } from 'react-router-dom';

import { CURRENT_YEAR } from 'config';
import styles from './footer.css';

const Footer = () => (
	<div className={styles.footer}>
		<Link to="/" className={styles.logo}>
			<img src="/images/nba_logo.png" alt="nba logo" />
		</Link>
		<div className={styles.right}>
			<p>@NBA {CURRENT_YEAR} All rights reserved.</p>
		</div>
	</div>
);

export default Footer;
