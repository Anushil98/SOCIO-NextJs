import React from 'react';
import Group from '../../components/Group/GroupPage/group';
import { MainLayout } from '../../components/MainLayout';

function UserProfile(props: { grpId: string }) {
	return <MainLayout Middle={<Group grpId={props.grpId} />} />;
}

export default UserProfile;

export async function getServerSideProps({ params }) {
	const { grpId } = params;
	return {
		props: { grpId }
	};
}
