import React from 'react';
import { Text, Separator, Link } from 'office-ui-fabric-react';
import { redirect } from 'common';
import { PaperInfoBar } from './bar';
import { Page } from './page';
import { queryPaperInfos, PaperInfo } from 'services';

interface TitleProps {
	text: string;
	link: string;
}

class Title extends React.Component<TitleProps, {}> {
	private styles = {
		root: {
			fontSize: 30
		}
	};

	private onClick = () => {
		redirect(this.props.link);
	};

	public render = () => {
		const {
			styles,
			onClick,
			props: { text }
		} = this;

		return (
			<Separator>
				<Link onClick={onClick} styles={styles}>
					{text}
				</Link>
			</Separator>
		);
	};
}

type ItemProps = { [K in keyof PaperInfo]: PaperInfo[K] };

const Item = ({
	id,
	title,
	author,
	create_at,
	change_records,
	tags
}: ItemProps) => {
	return (
		<>
			<Title text={title} link={`/paper/${id}`} />
			<PaperInfoBar tags={tags} tracks={change_records} />
			<Text>`some content is simple to see how to do this works `</Text>
		</>
	);
};

interface HomeState {
	papers: PaperInfo[];
}
export class Home extends React.Component<{}, HomeState> {
	private styles = {
		article: {
			width: '70%',
			margin: '50px auto'
		}
	};

	public state = {
		papers: [] as PaperInfo[]
	};

	public componentDidMount = () => {
		queryPaperInfos(1).then(papers => {
			console.log(papers);
			this.setState({
				papers
			});
		});
	};

	public render = () => {
		const {
			styles: { article },
			state: { papers }
		} = this;

		return (
			<>
				<article style={article}>
					{papers.map(ele => (
						<Item {...ele} key={ele.id} />
					))}
				</article>
				<Page />
			</>
		);
	};
}