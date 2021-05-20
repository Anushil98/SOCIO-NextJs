import axios, { AxiosRequestConfig } from 'axios';

export const getGroupPosts = (grpId: string, page: number): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		const querydata = JSON.stringify({
			query: `query($grpId:String!,$page:Int!){
            getGroupPosts(grpId:$grpId,page:$page){
                postId
                grpId
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
			variables: { grpId: grpId, page: page }
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
					reject('Group Post fetch Error');
				}
				resolve(data.getGroupPosts);
			})
			.catch(function(error) {
				console.log(error);
				reject('Group Post fetch Error');
			});
	});
};
