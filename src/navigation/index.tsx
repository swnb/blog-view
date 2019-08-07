import * as React from 'react';
import {
	Breadcrumb,
	Separator,
	IBreadcrumbProps
} from 'office-ui-fabric-react';
import { Store } from 'store';
import { styles as commonStyles, redirect } from 'common';

interface NavigationType {
	type: 'Tag' | 'About' | 'Paper' | 'Archive' | 'Home' | 'Init';
	value: string;
	paperLink?: string;
}

export const dataStore = new Store<NavigationType>();

function type2Item({ type, value }: NavigationType): IBreadcrumbProps['items'] {
	switch (type) {
		case 'Archive':
		case 'Home': {
			return [{ text: type, key: type }];
		}
		default: {
			return [{ text: type, key: type }, { text: value, key: value }];
		}
	}
}

function type2redirect({ type, value, paperLink }: NavigationType) {
	switch (type) {
		case 'Paper': {
			redirect(paperLink as string);
			return;
		}
		case 'Tag': {
			redirect(`/${type.toLowerCase()}/${value}`);
			return;
		}
		case 'Init': {
			return;
		}
		default: {
			redirect(`/${type.toLowerCase()}`);
		}
	}
}

const getInitData = (): NavigationType => {
	let initData = dataStore.get();
	return initData
		? initData
		: {
				type: 'Init',
				value: ''
		  };
};

function useNavigationData() {
	const [navigationData, setNavigationData] = React.useState(getInitData());
	const scope = dataStore.clone();
	React.useEffect(() => {
		setNavigationData(getInitData());
		scope.subscribe(navigationData => {
			setNavigationData(navigationData);
		});
		return () => {
			scope.unSubscribe();
		};
	}, [navigationData]);
	type2redirect(navigationData);
	return type2Item(navigationData);
}

const NavigationBar: React.FC = () => {
	const item = useNavigationData();
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
