import React from 'react';
import {
	CommandBar as FabricCommandBar,
	CommandBarButton,
	IButtonProps,
	ICommandBarItemProps
} from 'office-ui-fabric-react';
import { getTags } from 'common/tags';

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
		const onClick = () => {};
		return {
			...createNavItem(name, iconName),
			onClick
		};
	};

	// user infos
	private about = (): ICommandBarItemProps => {
		const name = 'About';
		const iconName = 'Contact';
		const onClick = () => {};
		return {
			...createNavItem(name, iconName),
			onClick
		};
	};

	// show tags
	private tags = (): ICommandBarItemProps => {
		const name = 'Tags';
		const iconName = 'Tag';
		const onClick = () => {};
		const items = getTags().map(({ name, iconName }) =>
			createNavItem(name, iconName)
		);

		return {
			...createNavItem(name, iconName),
			onClick,
			subMenuProps: { items }
		};
	};

	private archive = (): ICommandBarItemProps => {
		return {
			...createNavItem('Archive', 'Archive')
		};
	};
}

export { CommandBar };
