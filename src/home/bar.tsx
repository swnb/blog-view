import * as React from 'react';
import {
	CommandBarButton,
	IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { getTags } from 'common/tags';

const tagItems = getTags().map(({ name, iconName }) => ({
	key: name,
	text: name,
	iconProps: {
		iconName
	}
}));

export class PaperInfos extends React.Component {
	public render(): JSX.Element {
		const alertClicked = (): void => {
			alert('Clicked');
		};
		return (
			<div style={{ display: 'flex', alignItems: 'stretch', height: '44px' }}>
				<CommandBarButton iconProps={{ iconName: 'DateTime' }} text="date" />
				<CommandBarButton
					iconProps={{ iconName: 'Trackers' }}
					text="track"
					onClick={alertClicked}
					menuProps={{
						items: []
					}}
				/>
				<CommandBarButton
					iconProps={{ iconName: 'Tag' }}
					text="tags"
					menuProps={{
						items: []
					}}
				/>
			</div>
		);
	}
}
