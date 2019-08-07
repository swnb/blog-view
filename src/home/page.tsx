import React from 'react';
import {
	Pivot,
	PivotItem,
	PivotLinkFormat,
	IconButton
} from 'office-ui-fabric-react';

interface DirectButtonProps {
	iconName: string;
	onClick(): void;
}
const DirectButton = ({ iconName, onClick }: DirectButtonProps) => (
	<IconButton
		onClick={onClick}
		styles={{
			root: {
				marginTop: '6px'
			}
		}}
		disabled={false}
		checked={false}
		iconProps={{ iconName }}
	/>
);

interface PageProps {
	onPageSelected(index: number): void;
	size: number;
}
interface PageState {
	currentIndex: string;
}
export class Page extends React.Component<PageProps, PageState> {
	public state: PageState = {
		currentIndex: '1'
	};

	public componentDidUpdate = (_: PageProps, preStata: PageState) => {
		const { onPageSelected } = this.props;
		const { currentIndex } = this.state;
		if (currentIndex !== preStata.currentIndex) {
			onPageSelected(parseInt(currentIndex, 10));
		}
	};

	public render = () => {
		const { size } = this.props;
		const { currentIndex } = this.state;
		const { previousPage, forwardPage } = this;
		return (
			<footer
				style={{
					marginTop: '25px',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<DirectButton onClick={previousPage} iconName="ChevronLeft" />
				<Pivot
					selectedKey={currentIndex.toString()}
					onLinkClick={this.onLinkClick}
					linkFormat={PivotLinkFormat.links}
				>
					{Array(size)
						.fill(undefined)
						.map((_, index) => {
							const key = (index + 1).toString();
							return <PivotItem key={key} itemKey={key} headerText={key} />;
						})}
				</Pivot>
				<DirectButton onClick={forwardPage} iconName="ChevronRight" />
			</footer>
		);
	};

	private onLinkClick = (item?: PivotItem) => {
		if (!item) return;
		const { itemKey } = item.props;
		if (!itemKey) return;
		this.setState({
			currentIndex: itemKey
		});
	};

	private previousPage = () => {
		this.setState(({ currentIndex }) => {
			const nextIndex = parseInt(currentIndex, 10) - 1;
			if (nextIndex <= 0) return;
			return {
				currentIndex: nextIndex.toString()
			};
		});
	};

	private forwardPage = () => {
		this.setState(({ currentIndex }) => {
			const { size } = this.props;
			const nextIndex = parseInt(currentIndex, 10) + 1;
			if (nextIndex > size) return;
			return {
				currentIndex: nextIndex.toString()
			};
		});
	};
}
