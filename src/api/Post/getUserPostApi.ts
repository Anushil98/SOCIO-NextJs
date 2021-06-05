import axios, { AxiosRequestConfig } from 'axios';
import { Post } from '../../types/post.type';

export const getUserPosts = (page: number,userId:string): Promise<Post[]> => {
	return new Promise((resolve, reject) => {
		const querydata = JSON.stringify({
			query: `query($page:Int!,$userId:String!){
			getUserPostApi(page:$page,userId:$userId){
				postId
				User{
				id
				UserType
				username
				firstname
				lastname
				avatar
				}
				userId
				Group{
				grpId
				grpName
				grpHandle
				}
				Media{
				filename
				baseurl
				}
				HasChildren
				text
				createdDate
				updateDate
			}
			}`,
			variables: { page,userId}
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

		axios(config)
			.then(function(response) {
				const { data, errors } = response.data;
				if (errors) {
					reject('Feed Post fetch Error');
				}
				resolve(data.getUserPostApi);
			})
			.catch(function(error) {
				console.log(error);
				reject('Feed Post fetch Error');
			});
	});
};
