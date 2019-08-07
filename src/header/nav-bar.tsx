import React from 'react';
import {
	CommandBar as FabricCommandBar,
	CommandBarButton,
	IButtonProps,
	ICommandBarItemProps
} from 'office-ui-fabric-react';
import { getTags, redirect } from 'common';
import { dataStore as navigationDataStore } from 'breadcrumb';

const createNavItem = (name: string, iconName: string) => ({
	key: name,
	name,
	cacheKey: name,
	iconProps: { iconName }
});

const CustomCommandBarButton = (fontSize: number) => (props: IButtonProps) => (
	<CommandBarButton
		{...props}
		styles={{
			...props.styles,
			textContainer: { fontSize }
		}}
	/>
);

class CommandBar extends React.Component {
	private styles = {
		root: {
			width: '70%'
		}
	};
	public render = () => {
		const { icon, home, about, tags, archive, styles } = this;

		return (
			<FabricCommandBar
				styles={styles}
				items={[icon(), home(), about(), tags(), archive()]}
			/>
		);
	};

	// symbol icon
	private icon = (): ICommandBarItemProps => {
		return {
			...createNavItem('Swnb', 'SymbolIcon'),
			commandBarButtonAs: CustomCommandBarButton(25)
		};
	};

	// index home page;
	private home = (): ICommandBarItemProps => {
		const name = 'Home';
		const iconName = 'Home';

		return {
			...createNavItem(name, iconName),
			onClick() {
				navigationDataStore.set({
					type: 'Home',
					value: ''
				});
				redirect('/home');
			}
		};
	};

	// user infos
	private about = (): ICommandBarItemProps => {
		const name = 'About';
		const iconName = 'Contact';

		return {
			...createNavItem(name, iconName),
			onClick() {
				navigationDataStore.set({
					type: 'About',
					value: 'Swnb'
				});
			}
		};
	};

	// show tags
	private tags = (): ICommandBarItemProps => {
		const name = 'Tags';
		const iconName = 'Tag';

		const items = getTags().map(({ name, iconName }) => ({
			...createNavItem(name, iconName),
			onClick() {
				navigationDataStore.set({
					type: 'Tag',
					value: name
				});
			}
		}));

		return {
			...createNavItem(name, iconName),
			subMenuProps: { items }
		};
	};

	private archive = (): ICommandBarItemProps => {
		return {
			...createNavItem('Archive', 'Archive'),
			onClick() {
				navigationDataStore.set({
					type: 'Archive',
					value: ''
				});
			}
		};
	};
}

export { CommandBar };
