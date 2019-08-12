import axios from 'axios';
import { concatURL } from './link';
import { Response } from './interface';

const { get } = axios;

export const authorization = async (authCode: string = "") => {
	const { data: response } = await get(concatURL(`/api/v1/blog/auth`), {
		params: { "code": authCode }
	});
	return response as Response<string>;
}

export const checkAuthInit = async () => {
	const { data: response } = await get(concatURL(`/api/v1/blog/check-auth-init`));
	const { code, data } = response as Response<boolean>;
	return code === 0 && data
}
