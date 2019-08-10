import axios from 'axios';
import { concatURL } from './link';
import { Response } from './interface';

const { get } = axios;

export const authorization = async (authCode: string = "") => {
	const { data: response } = await get(concatURL(`/api/v1/blog/auth`), {
		params: { "code": authCode }
	});
	const { data, code, detail } = response as Response<string>;
	if (code === 0) {
		return data;
	} else {
		throw Error(`error happend ${detail}`);
	}
}