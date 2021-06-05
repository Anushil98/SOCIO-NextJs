import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { CheckMembership } from '../../api/Groups/checkMemberStatusApi';
import GroupMainPage from '../../components/Group/GroupPage/GroupMainPage';
import { MainLayout } from '../../components/MainLayout';
import checkAuth from '../../helpers/checkAuth';

function UserProfile(props: { grpId: string }) {
	if (typeof window !== 'undefined') {
		const [ LoggedInUser, setLoggedInUser ] = useState(null);
		const [ ismember, setismember ] = useState<boolean>(null);
		useEffect(() => {
			checkAuth().then((res) => {
				const { status, userId } = res;
				if (status) {
					setLoggedInUser(userId);
				} else {
					Router.push('/');
				}
			});
			CheckMembership(props.grpId).then((res) => {
				if (res === false) {
					setismember(false);
				} else {
					setismember(true);
				}
			});
		});
		if (LoggedInUser)
			return (
				<MainLayout
					loggedInUser={LoggedInUser}
					currentGroup={props.grpId}
					Middle={<GroupMainPage grpId={props.grpId} ismember={ismember} />}
					showNavbar={true}
				/>
			);
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
