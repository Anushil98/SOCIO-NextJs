import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout';
import Profile from '../../components/Profile.tsx/Profile';
import checkAuth from '../../helpers/checkAuth';

function UserProfile(props: { userId: string }) {
	const [ LoggedInUser, setLoggedInUser ] = useState(null);
	useEffect(() => {
		checkAuth().then((res) => {
			const { status, userId } = res;
			if (status) {
				setLoggedInUser(userId);
			} else {
				Router.push('/');
			}
		});
	}, []);
	return (
		<MainLayout
			loggedInUser={LoggedInUser}
			Middle={<Profile currentUser={props.userId === LoggedInUser} userId={props.userId} />}
		/>
	);
}

export default UserProfile;

export async function getServerSideProps({ params }) {
	const { userId } = params;
	return {
		props: { userId }
	};
}
