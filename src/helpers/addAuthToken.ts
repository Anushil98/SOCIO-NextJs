import { AuthPayload } from '../types/user.type';

const addAuthToken = (data: AuthPayload) => {
	const { accessToken, refreshAccessToken, userId } = data;
	localStorage.setItem('AccessToken', accessToken);
	localStorage.setItem('RefreshAccessToken', refreshAccessToken);
};

export default addAuthToken;
