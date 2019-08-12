import React from 'react';
import { Text, Separator, Link } from 'office-ui-fabric-react';
import { PaperInfo, queryPaperInfosByTags } from 'services';
import { match } from 'react-router';
import {
	redirect,
	styles as commonStyles,
	Pagination,
	PaperInfoBar,
	parseDate
} from 'common';
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
			<PaperInfoBar
				tags={tags}
				tracks={change_records}
				date={parseDate(create_at)!}
			/>
			<Text>`some content is simple to see how to do this works `</Text>
		</section>
	);
};

interface TagProps {
	match: match<{ name: string }>;
}
interface TagState {
	papers: PaperInfo[];
	pageSize: number;
}
export class Tag extends React.PureComponent<TagProps, TagState> {
	private styles = {
		article: {
			...commonStyles.body
		}
	};

	public state: TagState = {
		papers: [],
		pageSize: 0
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
				<Pagination onPageSelected={setPapersWithPageIndex} size={pageSize} />
			</>
		);
	};

	public componentDidMount = async () => {
		const { name } = this.props.match.params;
		navigationDataStore.set({
			type: 'Tag',
			value: name
		});
		await this.setPapersWithPageIndex(1);
	};

	public componentDidUpdate = async (preProps: TagProps) => {
		const preName = preProps.match.params.name;
		const curName = this.props.match.params.name;
		if (preName !== curName) {
			// when props update
			navigationDataStore.set({
				type: 'Tag',
				value: curName
			});
			await this.setPapersWithPageIndex(1);
		}
	};

	private setPapersWithPageIndex = async (index: number) => {
		const { name } = this.props.match.params;
		try {
			const {
				paper_info_list: papers,
				page_size: pageSize
			} = await queryPaperInfosByTags([name], index);
			this.setState({ papers, pageSize });
		} catch (error) {
			console.error(error);
			redirect('/not-found');
		}
	};
}
