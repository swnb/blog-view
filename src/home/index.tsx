import React from 'react';
import { Text, Separator, Link } from 'office-ui-fabric-react';
import { PaperInfoBar } from './bar';
import { Page } from './page';
import { queryPaperInfos, PaperInfo } from 'services';
import { redirect, styles as commonStyles } from 'common';
import { dataStore as navigationDataStore } from 'navigation';

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
		const { link, text } = this.props;
		navigationDataStore.set({
			type: 'Paper',
			value: text,
			paperLink: link
		});
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
		<section style={{ marginBottom: '20px' }}>
			<Title text={title} link={`/paper/${title}/${id}`} />
			<PaperInfoBar tags={tags} tracks={change_records} />
			<Text>`some content is simple to see how to do this works `</Text>
		</section>
	);
};

interface HomeState {
	papers: PaperInfo[];
	pageSize: number;
}
export class Home extends React.Component<{}, HomeState> {
	private styles = {
		article: {
			...commonStyles.body
		}
	};

	public state: HomeState = {
		papers: [],
		pageSize: 0
	};

	public componentWillMount = async () => {
		navigationDataStore.set({
			type: 'Home',
			value: ''
		});
		await this.setPapersWithPageIndex(1);
	};

	public render = () => {
		const {
			styles: { article },
			state: { papers, pageSize },
			setPapersWithPageIndex
		} = this;

		return (
			<>
				<article style={article}>
					{papers.map(ele => (
						<Item {...ele} key={ele.id} />
					))}
				</article>
				<Page onPageSelected={setPapersWithPageIndex} size={pageSize} />
			</>
		);
	};

	private setPapersWithPageIndex = async (index: number) => {
		try {
			const {
				paper_info_list: papers,
				page_size: pageSize
			} = await queryPaperInfos(index);
			this.setState({ papers, pageSize });
		} catch (error) {
			console.error(error);
			redirect('/not-found');
		}
	};
}
