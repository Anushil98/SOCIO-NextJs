import axios, { AxiosRequestConfig } from 'axios';
import { AuthPayload } from '../../types/user.type';

export const getAccessToken = async (token: string): Promise<AuthPayload> => {
	const queryData = JSON.stringify({
		query: `mutation($token:String!){
        getAccessToken(token:$token){
            accessToken
            refreshAccessToken
            userId
        }
        }`,
		variables: { token: token }
	});

	const config: AxiosRequestConfig = {
		method: 'post',
		url: 'http://localhost:5000/graphql',
		headers: {
			'Content-Type': 'application/json'
		},
		data: queryData
	};

	const response = await axios(config);
	const { data, errors } = response.data;
	if (errors) {
		throw new Error('Refres Token Error');
	}
	const res: AuthPayload = {
		accessToken: data.getAccessToken.accessToken,
		refreshAccessToken: data.getAccessToken.refreshAccessToken,
		userId: data.getAccessToken.userId
	};
	return res;
};
