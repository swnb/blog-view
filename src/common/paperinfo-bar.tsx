import * as React from 'react';
import { getTags, Calendar } from 'common';
import { CommandBarButton } from 'office-ui-fabric-react';

const tagItemsFilter = (tags: string[]) =>
	getTags()
		.filter(({ name }) => tags.includes(name))
		.map(({ name, iconName }) => ({
			key: name,
			text: name,
			iconProps: { iconName }
		}));

const trackItems = (tracks: string[]) =>
	tracks.map(record => ({
		key: record,
		text: record
	}));

interface PaperInfoBarProps {
	tags: string[];
	tracks: string[];
	date: Date;
}
export class PaperInfoBar extends React.Component<PaperInfoBarProps, {}> {
	public render = () => {
		const {
			props: { tags, tracks, date }
		} = this;

		return (
			<div style={{ display: 'flex', alignItems: 'stretch', height: '44px' }}>
				<Calendar date={date} />
				<CommandBarButton
					iconProps={{ iconName: 'Trackers' }}
					text="record"
					disabled={tracks.length === 0}
					menuProps={{
						items: trackItems(tracks)
					}}
				/>
				<CommandBarButton
					iconProps={{ iconName: 'Tag' }}
					text="tags"
					disabled={tags.length === 0}
					menuProps={{
						items: tagItemsFilter(tags)
					}}
				/>
				<CommandBarButton
					iconProps={{ iconName: 'PreviewLink' }}
					text="preview"
				/>
			</div>
		);
	};
}
