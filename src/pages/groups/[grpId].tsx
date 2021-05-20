import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import GroupMainPage from '../../components/Group/GroupPage/GroupMainPage';
import { MainLayout } from '../../components/MainLayout';
import checkAuth from '../../helpers/checkAuth';

function UserProfile(props: { grpId: string }) {
	if (typeof window !== 'undefined') {
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
		});
		if (LoggedInUser)
			return <MainLayout loggedInUser={LoggedInUser} Middle={<GroupMainPage grpId={props.grpId} />} />;
		else return null;
	} else return null;
	return;
}

export default UserProfile;

export async function getServerSideProps({ params }) {
	const { grpId } = params;
	return {
		props: { grpId }
	};
}
