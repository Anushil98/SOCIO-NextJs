import axios, { AxiosRequestConfig } from 'axios';
import { Group } from '../../types/group.type';
import { User } from '../../types/user.type';

export const searchApi = async (
	page: number,
	type: 'All' | 'User' | 'Group',
	searchText: string
): Promise<{ group: Group; user: User }[]> => {
	if (searchText === '') return [];
	const querydata = JSON.stringify({
		query: `query($searchText:String!,$page:Int!){
                searchUser(searchText:$searchText,page:$page){
                    user{
                    id
                    UserType
                    email
                    username
                    firstname
                    lastname 
                    avatar
                    }
                    group{
                    grpId
                    grpName
                    grpHandle
                    grpBio
                    }
                }
                }`,
		variables: { searchText, page }
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
