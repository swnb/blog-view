import React from 'react';
import { Text, Separator, IStackTokens, Link } from 'office-ui-fabric-react';
import { PaperInfos } from './bar';
import { Page } from './page';

const props: IStackTokens = {
	childrenGap: 10,
	padding: 10
};

const Title = ({ text }: { text: string }) => {
	return (
		<Separator>
			<Link
				styles={{
					root: {
						fontSize: 30
					}
				}}
			>
				{text}
			</Link>
		</Separator>
	);
};

const styles = {
	article: {
		width: '70%',
		margin: '50px auto'
	}
};

const Item = () => {
	return (
		<>
			<Title text="monad" />
			<PaperInfos />
			<Text>`some content is simple to see how to do this works `</Text>
		</>
	);
};
export class Home extends React.Component<{}, {}> {
	public render = () => {
		const { article } = styles;
		return (
			<>
				<article style={article}>
					<Item />
					<Item />
					<Item />
					<Item />
					<Item />
				</article>
				<Page />
			</>
		);
	};
}
