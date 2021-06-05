import axios, { AxiosRequestConfig } from 'axios';
export const follow = async (userId: string): Promise<boolean> => {
	try {
		const querydata = JSON.stringify({
			query: `mutation($userId:String!){
                FollowUser(userId:$userId)
                }`,
			variables: { userId: userId }
		});

		var config: AxiosRequestConfig = {
			method: 'post',
			url: 'http://localhost:5000/graphql',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
				'Content-Type': 'application/json'
			},
			data: querydata
		};

		const response = await axios(config);
		const { data, errors } = response.data;
		if (errors) {
			throw new Error(errors.message);
		}
		const user = data.FollowUser;

		return user;
	} catch (err) {
		throw new Error('User Not Found');
	}
};
