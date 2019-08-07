import axios from 'axios';
import { protol, host } from './link';
import { Response, PaperStructure, PaperInfoList } from './interface';
const { get } = axios;

const concatURL = (path: string) => `${protol}://${host}${path}`

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

