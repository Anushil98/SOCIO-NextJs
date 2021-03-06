import axios, { AxiosRequestConfig } from "axios";
import { invite } from "../../types/invite.type";

export const getInvitesApi = async (page: number): Promise<invite[]> => {
	const querydata = JSON.stringify({
		query: `query($page:Int!){
  getInvites(page:$page){
    InviteId
   	 Host{
      id
      username
      firstname
      lastname
      avatar
    }
    guestId
    Guest{
      id
    }
    Group{
      grpId
      grpName
      grpHandle
      grpBio
    }
    createdDate
    InviteState
    
  }
}`,variables:{page}
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
	return data.getInvites;
};
