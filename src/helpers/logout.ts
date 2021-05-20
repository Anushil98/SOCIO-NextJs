import Router from 'next/router';

export default function logout() {
	localStorage.removeItem('RefreshAccessToken');
	localStorage.removeItem('AccessToken');
	Router.push('/');
}
