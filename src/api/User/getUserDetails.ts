import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../../types/user.type';
export const getUserDetails = async (userId: string): Promise<User> => {
	try {
		const querydata = JSON.stringify({
			query: `query($userId:String!){
				user:getUserDetails(userId:$userId){
				id
				username
				firstname
				lastname
				avatar
				}
				}`,
			variables: { userId: userId }
		});

		var config: AxiosRequestConfig = {
			method: 'post',
			url: 'http://localhost:5000/graphql',
			headers: {
				'Content-Type': 'application/json'
			},
			data: querydata
		};

		const response = await axios(config);
		const { data, errors } = response.data;
		if (errors) {
			throw new Error(errors.message);
		}
		const user = data.user;

		return user;
	} catch (err) {
		throw new Error('User Not Found');
	}
};
