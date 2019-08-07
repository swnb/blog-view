import * as React from 'react';
import { Breadcrumb, Separator } from 'office-ui-fabric-react';
import { Store } from 'store';
import { styles as commonStyles, redirect } from 'common';

interface NavigationType {
	type: 'Tag' | 'About' | 'Paper' | 'Archive' | 'Home' | 'Init';
	value: string;
	paperLink?: string;
}

export const dataStore = new Store<NavigationType>();

function useNavigationData() {}

const NavigationBar: React.FC = () => {
	const [navigationData, setNavigationData] = React.useState({
		type: 'Init',
		value: ''
	} as NavigationType);
	const { type, value, paperLink } = navigationData;
	React.useEffect(() => {
		dataStore.subscribe(navigationData => {
			setNavigationData(navigationData);
		});
		return () => {
			dataStore.unSubscribe();
		};
	}, [navigationData]);

	let item;
	switch (type) {
		case 'Archive':
		case 'Home': {
			item = [{ text: type, key: type }];
			break;
		}
		default: {
			item = [{ text: type, key: type }, { text: value, key: value }];
			break;
		}
	}

	switch (type) {
		case 'Paper': {
			redirect(paperLink as string);
			break;
		}
		case 'Tag': {
			redirect(`/${type.toLowerCase()}/${value}`);
			break;
		}
		case 'Init': {
			break;
		}
		default: {
			redirect(`/${type.toLowerCase()}`);
		}
	}

	return (
		<Separator
			styles={{
				root: {
					...commonStyles.navigationBar
				}
			}}
			alignContent="start"
		>
			<Breadcrumb onReduceData={returnUndefined} items={item} />
		</Separator>
	);
};

const returnUndefined = () => undefined;

export default NavigationBar;
