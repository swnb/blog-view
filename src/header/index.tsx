import React from 'react';
import { CommandBar } from './nav-bar';
import { SearchBox } from './search';

const styles = {
	header: {
		width: '77%',
		height: '50px',
		margin: 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	hr: {
		margin: '0'
	}
};

const Header = () => {
	const { header, hr } = styles;
	return (
		<>
			<header style={header}>
				<CommandBar />
				<SearchBox />
			</header>
			<hr style={hr} />
		</>
	);
};

export default Header;
