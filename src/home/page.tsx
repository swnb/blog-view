import React from 'react';
import {
	Pivot,
	PivotItem,
	PivotLinkFormat,
	PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';

export class Page extends React.Component {
	public render = () => {
		return (
			<footer
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Pivot selectedKey={'1'} linkFormat={PivotLinkFormat.tabs}>
					<PivotItem itemIcon="ChevronLeft" />
					{Array(10)
						.fill(undefined)
						.map((_, index) => (
							<PivotItem
								key={index}
								headerText={index.toString()}
								onClick={console.log}
							/>
						))}
					<PivotItem itemIcon="ChevronRight" />
				</Pivot>
			</footer>
		);
	};
}
