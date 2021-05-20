import { getAccessToken } from '../api/User/getAccessToken';

export default async function checkAuth(): Promise<{ status: boolean; userId?: string }> {
	const AccessToken = localStorage.getItem('AccessToken');
	const RefreshAccessToken = localStorage.getItem('RefreshAccessToken');

	if (AccessToken !== null && RefreshAccessToken !== null) {
		const Token = await getAccessToken(RefreshAccessToken);
		localStorage.setItem('AccessToken', Token.accessToken);
		localStorage.setItem('RefreshAccessToken', Token.refreshAccessToken);

		return { status: true, userId: Token.userId };
	}
	return { status: false };
}
