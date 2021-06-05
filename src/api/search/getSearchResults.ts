import axios, { AxiosRequestConfig } from 'axios';
import { Group } from '../../types/group.type';
import { User } from '../../types/user.type';

export const searchApi = async (
	page: number,
	type: 'All' | 'User' | 'Group',
	searchText: string,grpId?:string
): Promise<{ group: Group; user: User }[]> => {
	if (searchText === '') return [];
	const querydata = JSON.stringify({
		query: `query($searchText:String!,$page:Int!,$grpId:String){
                searchUser(searchText:$searchText,page:$page,grpId:$grpId){
                    user{
                    id
                    UserType
                    email
                    username
                    firstname
                    lastname 
                    avatar
					ismember
                    }
                    group{
                    grpId
                    grpName
                    grpHandle
                    grpBio
                    }
                }
                }`,
		variables: { searchText, page,grpId }
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
		throw new Error('Serach Api error');
	}
	return data.searchUser;
};
