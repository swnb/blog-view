import React from 'react';
import { registerIcons } from '@uifabric/styling';
import SymbolIcon from './symbol.svg';

registerIcons({
	icons: {
		SymbolIcon: (
			<img
				src={SymbolIcon}
				style={{
					width: '23px',
					height: '23px'
				}}
			/>
		)
	}
});
