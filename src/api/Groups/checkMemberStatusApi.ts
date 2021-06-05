import axios, { AxiosRequestConfig } from 'axios';

export const CheckMembership = (grpId: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const querydata = JSON.stringify({
			query: `query($grpId:String!){
            CheckGroupMembership(grpId:$grpId)
            }`,
			variables: { grpId }
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
					reject(errors.message);
				}
				resolve(data.CheckGroupMembership);
			})
			.catch(function(error) {
				reject(error);
			});
	});
};
