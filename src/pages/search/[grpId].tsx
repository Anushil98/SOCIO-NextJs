import React from 'react';
import SearchPage from '../../components/Search/SearchPage';

export default function search(props: { grpId: string }) {
	return <SearchPage types={'All'} grpId={props.grpId} invite={true} />;
}

export async function getServerSideProps({ params }) {
	const { grpId } = params;
	return {
		props: { grpId }
	};
}
