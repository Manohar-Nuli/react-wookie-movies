import React from 'react';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
	return (
		<div className={styles.pageNotFound}>
			<p>
				Sorry, we can't find that page. You'll find lots to explore on the home
				page.
			</p>
		</div>
	);
};

export default PageNotFound;
