import React from 'react';
import { MainLayout } from '../../components/MainLayout';
import Profile from '../../components/Profile.tsx/Profile';

function UserProfile(props: { userId: string }) {
	return <MainLayout Middle={<Profile currentUser={false} userId={props.userId} />} />;
}

export default UserProfile;

export async function getServerSideProps({ params }) {
	const { userId } = params;
	return {
		props: { userId }
	};
}
