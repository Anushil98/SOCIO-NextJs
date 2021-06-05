import axios, { AxiosRequestConfig } from 'axios';
import { PostInput } from '../../types/post.type';

export const createPostApi = async (postData: PostInput) => {
	try {
		const querydata = JSON.stringify({
			query: `mutation($text:String!,$grpId:String,$Media:[MediaInput]){
			createPost(data:{
				text:$text
				grpId:$grpId
				Media:$Media
			}){postId
			userId
			text
			Media{
				filename
				baseurl
			}
			}
			}`,
			variables: { ...postData }
		});

		const config: AxiosRequestConfig = {
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
		console.log(data)
		if (errors) {
			throw new Error(errors.message);
		}
	} catch (err) {
		throw new Error('Post Creation Failed');
	}
};
