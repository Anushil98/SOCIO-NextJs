import axios, { AxiosRequestConfig } from 'axios';
import { Post } from '../../types/post.type';

export const getUsersGroupPosts = (page: number): Promise<Post[]> => {
	return new Promise((resolve, reject) => {
		const querydata = JSON.stringify({
			query: `query($page:Int!){
			getUsersGroupPosts(page:$page){
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
			variables: { page }
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
				console.log(data.getUsersGroupPosts);
				resolve(data.getUsersGroupPosts);
			})
			.catch(function(error) {
				console.log(error);
				reject('Feed Post fetch Error');
			});
	});
};
