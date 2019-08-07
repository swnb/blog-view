import * as React from 'react';
import {
	Breadcrumb,
	IBreadcrumbItem,
	TooltipHost,
	IDividerAsProps
} from 'office-ui-fabric-react';
import { Store } from 'store';

interface NavigationType {
	type: 'Tag' | 'About' | 'Paper' | 'Archive' | 'Home';
	value: string;
}

export const dataStore = new Store<NavigationType>();

function useNavigationData() {}

const NavigationBar: React.FC = () => {
	const [navigationData, setNavigationData] = React.useState({
		type: 'Home',
		value: ''
	} as NavigationType);
	const { type, value } = navigationData;
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

	return (
		<Breadcrumb
			items={item}
			maxDisplayedItems={2}
			overflowIndex={0}
			ariaLabel="Breadcrumb with maxDisplayedItems set to 2 and overflowIndex set to 1"
			overflowAriaLabel="More links"
		/>
	);
};

function _onBreadcrumbItemClicked(
	ev?: React.MouseEvent<HTMLElement>,
	item?: IBreadcrumbItem
): void {
	if (item) {
		console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
	}
}

function _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
	const tooltipText = dividerProps.item ? dividerProps.item.text : '';
	return (
		<TooltipHost
			content={`Show ${tooltipText} contents`}
			calloutProps={{ gapSpace: 0 }}
		>
			<span aria-hidden="true" style={{ cursor: 'pointer' }}>
				/
			</span>
		</TooltipHost>
	);
}

export default NavigationBar;
