import axios from 'axios';
import { concatURL } from './link';
import { Response, PaperStructure, PaperInfoList, PaperInfo } from './interface';
const { get } = axios;

// query paper content json structure by paper id
export const queryPaperContent = async (paperID: string) => {
	const { data: response } = await get(concatURL(`/api/v1/blog/get/paper/content/${paperID}`));
	const { code, data, detail } = response as Response<string>;
	if (code === 0) {
		return JSON.parse(data) as PaperStructure[];
	} else {
		throw Error(detail);
	}
}

// paper info data struct
export const queryPaperInfos = async (page: number) => {
	const { data: response } = await get(concatURL(`/api/v1/blog/get/paper/infos/${page}`));
	const { code, data, detail } = response as Response<PaperInfoList>
	if (code === 0) {
		return data
	} else {
		throw Error(detail);
	}
}

export const queryPaperInfosByTags = async (tags: string[], index: number) => {
	const { data: response } = await get(concatURL(`/api/v1/blog/get/paper/tags/${index}`), {
		params: {
			tags: tags.join(','),
		}
	});
	const { code, data, detail } = response as Response<PaperInfoList>
	if (code === 0) {
		return data
	} else {
		throw Error(detail);
	}
}

export const queryArchive = async () => {
	const { data: response } = await get(concatURL(`/api/v1/blog/get/archive`));
	const { code, data, detail } = response as Response<PaperInfo[]>;
	if (code === 0) {
		return data
	} else {
		throw Error(detail)
	}
}
