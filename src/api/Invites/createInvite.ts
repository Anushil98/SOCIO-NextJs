import axios, { AxiosRequestConfig } from "axios";
import { invite } from "../../types/invite.type";

export const createInvite = async (grpId:string,guestId:string): Promise<invite> => {
	const querydata = JSON.stringify({
		query: `mutation($guestId:String!,$grpId:String!){
  createInvite(data:{
    guestId:$guestId
    grpId:$grpId
  }){
    InviteId
    hostId
    InviteState
    grpId
    guestId
    createdDate
  }
}`,variables:{grpId,guestId}
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
		throw new Error('Create invite Api error');
	}
	return data.createInvite;
};
