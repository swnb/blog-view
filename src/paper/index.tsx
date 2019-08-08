import React, { Suspense } from 'react';
import { PaperStructure, queryPaperContent } from 'services';
import {
	Link,
	Text,
	Separator,
	Image,
	Label,
	MessageBar
} from 'office-ui-fabric-react';
import { match } from 'react-router';
import { Loading, redirect, styles as commonStyles } from 'common';
import { dataStore as navigationDataStore } from 'navigation';

const Code = React.lazy(() =>
	import('./code').then(({ Code }) => ({ default: Code }))
);
const Pre = React.lazy(() =>
	import('./code').then(({ Pre }) => ({ default: Pre }))
);

export interface ElementCommonProps {
	children: PaperStructure[];
}

interface H1Props extends ElementCommonProps {}
const H1 = ({ children }: H1Props) => (
	<Label>
		<Text
			variant="xxLarge"
			styles={{
				root: {
					marginBottom: '20px'
				}
			}}
			block
		>
			{renderElements(children)}
		</Text>
	</Label>
);

interface H2Props extends ElementCommonProps {}
const H2 = ({ children }: H2Props) => (
	<>
		<Label styles={{}}>
			<Text variant="xLarge" block>
				{renderElements(children)}
			</Text>
		</Label>
		<Hr />
	</>
);

interface H3Props extends ElementCommonProps {}
const H3 = ({ children }: H3Props) => (
	<Label
		styles={{
			root: {
				margin: '12px 0'
			}
		}}
	>
		<Text variant="large" block>
			{renderElements(children)}
		</Text>
	</Label>
);

const Hr = () => <Separator />;

interface BlockquoteProps extends ElementCommonProps {}
const Blockquote = ({ children }: BlockquoteProps) => {
	return (
		<MessageBar
			styles={{
				root: {
					margin: '12px 0'
				}
			}}
		>
			{renderElements(children)}
		</MessageBar>
	);
};

interface LiProps extends ElementCommonProps {}
const Li = ({ children }: LiProps) => {
	return (
		<li>
			<Text>{renderElements(children)}</Text>
		</li>
	);
};

export const renderElements = (
	structures: PaperStructure[]
): React.ReactNode[] => {
	return structures.map(({ tag, attrs, children }, key) => {
		switch (tag) {
			case 'a': {
				return <Link key={key}>{renderElements(children)}</Link>;
			}
			case 'h1': {
				return <H1 key={key} children={children} />;
			}
			case 'h2': {
				return <H2 key={key} children={children} />;
			}
			case 'h3': {
				return <H3 key={key} children={children} />;
			}
			case 'hr': {
				return <Hr key={key} />;
			}
			case 'img': {
				return <Image key={key} src={attrs['src']} alt={attrs['alt']} />;
			}
			case 'content': {
				return attrs['text'];
			}
			case 'p': {
				return <Text key={key}> {renderElements(children)}</Text>;
			}
			case 'strong': {
				return (
					<Text key={key} variant="mediumPlus">
						{renderElements(children)}
					</Text>
				);
			}
			case 'blockquote': {
				return <Blockquote key={key} children={children} />;
			}
			case 'br': {
				return <br key={key} />;
			}
			case 'ol': {
				return <ol key={key}>{renderElements(children)}</ol>;
			}
			case 'li': {
				return <Li key={key} children={children} />;
			}
			case 'ul': {
				return <ul key={key}>{renderElements(children)}</ul>;
			}
			case 'pre': {
				return <Pre key={key} children={children} />;
			}
			case 'code': {
				return <Code key={key} children={children} lanType={attrs['class']} />;
			}
			default: {
				console.error(`uncover tag -> ${tag}`);
				return <></>;
			}
		}
	});
};

interface PaperProps {
	match: match<{ name: string; id: string }>;
}
interface PaperState {
	isReady: boolean;
	structure: PaperStructure[];
}
export class Paper extends React.Component<PaperProps, PaperState> {
	private styles = {
		article: {
			...commonStyles.body
		}
	};

	public state = {
		isReady: false,
		structure: [] as PaperStructure[]
	};

	public componentDidMount = async () => {
		const {
			params: { name, id: paperID },
			url: paperLink
		} = this.props.match;
		navigationDataStore.set({
			type: 'Paper',
			value: name,
			paperLink
		});
		try {
			const structure = await queryPaperContent(paperID);
			this.setState({ structure, isReady: true });
		} catch (error) {
			console.error(error);
			redirect('/not-found');
		}
	};

	public render = () => {
		const {
			state: { structure, isReady },
			styles: { article }
		} = this;

		return (
			<article style={article}>
				{isReady ? (
					<Suspense fallback={<Loading />}>
						{renderElements(structure)}
					</Suspense>
				) : (
					<Loading />
				)}
			</article>
		);
	};
}
