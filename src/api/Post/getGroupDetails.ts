import axios, { AxiosRequestConfig } from 'axios';
import { Group } from '../../types/group.type';
export const getGroupDetails = async (grpId: string): Promise<Group> => {
	try {
		const querydata = JSON.stringify({
			query: `query($grpId:String!){
                    getGroupDetails(grpId:$grpId){
                        grpId
                        grpName
                        grpHandle
                        grpBio
                        ownerId
                    }
                    }`,
			variables: { grpId: grpId }
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
		const getGroupDetails = data.getGroupDetails;

		return getGroupDetails;
	} catch (err) {
		throw new Error('Group Not Found');
	}
};
