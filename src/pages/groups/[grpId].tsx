import React from 'react';
import GroupMainPage from '../../components/Group/GroupPage/group';
import { MainLayout } from '../../components/MainLayout';

function UserProfile(props: { grpId: string }) {
	return <MainLayout Middle={<GroupMainPage grpId={props.grpId} />} />;
}

export default UserProfile;

export async function getServerSideProps({ params }) {
	const { grpId } = params;
	return {
		props: { grpId }
	};
}
