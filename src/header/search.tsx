import * as React from 'react';
import { SearchBox as FabricSearchBox } from 'office-ui-fabric-react';

const styles = {
	root: { width: '30%', marginRight: 24, maxWidth: 300, minWidth: 100 }
};

const SearchBox = () => {
	return (
		<FabricSearchBox
			placeholder="Search"
			styles={styles}
			onSearch={newValue => console.log('value is ' + newValue)}
			onFocus={() => console.log('onFocus called')}
			onBlur={() => console.log('onBlur called')}
			onChange={() => console.log('onChange called')}
		/>
	);
};

export { SearchBox };
