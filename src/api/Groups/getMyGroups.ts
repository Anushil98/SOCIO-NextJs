import axios, { AxiosRequestConfig } from 'axios';
import { Group } from '../../types/group.type';

export const getMyGroupsApi = (page: number): Promise<Group[]> => {
	return new Promise((resolve, reject) => {
		const querydata = JSON.stringify({
			query: `query($page:Int!){
			getUsersGroups(page:$page){
				grpId
				grpName
				grpHandle
				ownerId
			}
			}`,
			variables: { page: page }
		});

		const config: AxiosRequestConfig = {
			method: 'post',
			url: 'http://localhost:5000/graphql',
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYWJlYjljYi1lNDVhLTQ3MjAtYjNlZS0xMWUyMjQyZTQ2OWUiLCJlbWFpbCI6ImFiY0AxMDAwLmNvbSIsImlhdCI6MTYyMTQ5NDkwNCwiZXhwIjoxNjIyMDk5NzA0fQ.KqnZCCT7cfwXFZjGNGDvw7t8bwp5DhShzQIsspGsHAU',
				'Content-Type': 'application/json'
			},
			data: querydata
		};

		axios(config)
			.then(function(response) {
				const { data, errors } = response.data;
				if (errors) {
					reject(errors.message);
				}
				resolve(data.getUsersGroups);
			})
			.catch(function(error) {
				reject(error)
			});
	});
};
