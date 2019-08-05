import React from 'react';
import { CommandBar } from './nav-bar';
import { SearchBox } from './search';

const style = {
	width: '77%',
	height: '50px',
	margin: 'auto',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
};

const Header = () => (
	<header style={style}>
		<CommandBar />
		<SearchBox />
	</header>
);

export default Header;
