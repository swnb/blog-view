export interface Response<T> {
	code: number;
	data: T;
	detail: string;
}

export type Tag =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'p'
	| 'strong'
	| 'content'
	| 'blockquote'
	| 'pre'
	| 'code'
	| 'hr'
	| 'ul'
	| 'li'
	| 'ol'
	| 'br'
	| 'a'
	| 'img';

export interface PaperStructure {
	tag: Tag;
	attrs: {
		[props: string]: string;
	};
	children: PaperStructure[];
}

export interface PaperInfo {
	id: string;
	title: string;
	author: string;
	create_at: string;
	change_records: string[];
	tags: string[];
}
