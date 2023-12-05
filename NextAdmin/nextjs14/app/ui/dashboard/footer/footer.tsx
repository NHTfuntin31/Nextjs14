import styles from "./footer.module.css";
import React from 'react';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>Lama Dev</div>
			<div className={styles.text}>© All rights reserved.</div>
		</div>
	);
};

export default Footer;
