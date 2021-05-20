import axios, { AxiosRequestConfig } from 'axios';
import { AuthPayload } from '../../types/user.type';

export const login = async (email: string, password: string): Promise<AuthPayload> => {
	const queryData = JSON.stringify({
		query: `mutation($email:String!,$password:String!){
        login(email:$email,password:$password){
            accessToken
            refreshAccessToken
            userId
        }
        }`,
		variables: { email, password }
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
		throw new Error('Login Error');
	}
	const res: AuthPayload = {
		accessToken: data.login.accessToken,
		refreshAccessToken: data.login.refreshAccessToken,
		userId: data.login.userId
	};
	return res;
};
