import axios, { AxiosRequestConfig } from 'axios';
import { Group } from '../../types/group.type';

export const createGroup = async (grpName: string, grpHandle: string, grpBio: string): Promise<Group> => {
	try {
		const querydata = JSON.stringify({
			query: `mutation($grpName:String!,$grpHandle:String!,$grpBio:String!){
                    createGroup(data:{
                        grpName:$grpName
                        grpHandle:$grpHandle
                        grpBio:$grpBio
                    }){
                        grpId
                        grpName
                        grpHandle
                        grpBio
                        ownerId
                    }
                    }`,
			variables: { grpName, grpHandle, grpBio }
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
		if (errors) {
			throw new Error(errors.message);
		}
		return data.createGroup;
	} catch (err) {
		throw err;
	}
};
