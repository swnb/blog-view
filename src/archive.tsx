import * as React from 'react';
import { Separator, Link } from 'office-ui-fabric-react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { styles } from 'common';
import { queryArchive, PaperInfo } from 'services';

const stackTokens: IStackTokens = { childrenGap: 12 };

const VerticalSeparatorStack = (props: { children: JSX.Element[] }) => (
	<Stack>
		{React.Children.map(props.children, child => {
			return <Stack tokens={stackTokens}>{child}</Stack>;
		})}
	</Stack>
);

const verticalStyle = mergeStyles({
	height: '100px'
});

interface ArchiveState {
	papers: PaperInfo[];
}

export class SeparatorBasicExample extends React.Component<{}> {
	public state: ArchiveState = {
		papers: []
	};

	public componentDidMount = async () => {
		const papers = await queryArchive();
		console.log(papers);
		this.setState({ papers });
	};

	public render(): JSX.Element {
		return (
			<Stack tokens={stackTokens}>
				<Text>2019</Text>
				<VerticalSeparatorStack>
					{this.state.papers.map(({ id, title }) => (
						<Stack.Item key={id} align="center" className={verticalStyle}>
							<Separator vertical>
								<Link href={`#/paper/${title}/${id}`}>{title}</Link>
							</Separator>
						</Stack.Item>
					))}
				</VerticalSeparatorStack>
			</Stack>
		);
	}
}

const Archive = () => {
	return (
		<div style={{ ...styles.body }}>
			<SeparatorBasicExample />
		</div>
	);
};

export default Archive;
