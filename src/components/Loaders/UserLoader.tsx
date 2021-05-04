import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	align-items: center;
`;
const Circle = styled.div`
	border-radius: 50%;
	display: inline-block;
	height: 100%;
	width: 30%;
	max-height: 80px;
	max-width: 80px;
	background-color: var(--loader-color);
`;
const Side = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 10px;
`;
const FullnameRect = styled.div`
	background-color: var(--loader-color);
	max-height: 40px;
	margin: 2px 0;
	border-radius: 11px;
`;
const UsernameRect = styled.div`
	background-color: var(--loader-color);
	margin: 2px 0;
	max-height: 40px;
	border-radius: 11px;
`;
const ClubRectName = styled.div`
	background-color: var(--loader-color);
	margin: 2px 0;
	max-height: 40px;
	border-radius: 11px;
`;
export default function UserLoader(props: { grpId?: boolean }) {
	return (
		<Loader>
			<Circle />
			<Side>
				<FullnameRect />
				<UsernameRect />
				{props.grpId ? <ClubRectName /> : null}
				<ClubRectName />
			</Side>
		</Loader>
	);
}
