import axios, { AxiosRequestConfig } from "axios";
import { invite, InviteStateEnum } from "../../types/invite.type";

export const actionOnInvite = async (action:InviteStateEnum,grpId:string,inviteId:string): Promise<invite> => {
	const querydata = JSON.stringify({
		query: `mutation($action:InviteStateEnum!,$grpId:String!,$inviteId:String!){
  ActionOnInvite(action:$action,grpId:$grpId,inviteId:$inviteId)
}`,variables:{action,grpId,inviteId}
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
		throw new Error('Invites Api error');
	}
	return data.ActionOnInvite;
};
