import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../../types/user.type';
export const updateUserImage = async (filename:string,type:"Avatar" | "Cover"): Promise<User> => {
	try {
		const querydata = JSON.stringify({
			query: `mutation($filename:String!,$type:UserImageEnum){
                updateUserImage(data:{media:{
                    filename:$filename
                    baseurl:""
                },type:$type})
                }`,
			variables: { filename,type }
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
		const user = data.updateUserImage;

		return user;
	} catch (err) {
		throw new Error('User Not Found');
	}
};
