import React from 'react';
import styled from 'styled-components';
import { User } from '../../types/user.type';

const Loader = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	align-items: center;
`;
const Circle =
	styled.div <
	{ imageUrl: string } >
	`
	border-radius: 50%;
	display: inline-block;
    margin-left:4px;
	height: 100%;
	width: 30%;
	max-height: 80px;
	max-width: 80px;
    min-height: 80px;
	min-width: 80px;
	background-image: ${(props) => {
		console.log(props.imageUrl);
		return `url(${props.imageUrl || '/default/avatar.svg'})`;
	}};
    background-repeat: no-repeat;
    background-size: cover;
`;
const Side = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 10px;
`;
const FullnameRect = styled.div`
	max-height: 40px;
	margin: 2px 0;
	border-radius: 11px;
	padding-left: 10px;
`;
const UsernameRect = styled.div`
	margin: 2px 0;
	max-height: 40px;
	border-radius: 11px;
	padding-left: 10px;
`;
const ClubRectName = styled.div`
	margin: 2px 0;
	max-height: 40px;
	border-radius: 11px;
	padding-left: 10px;
`;
export default function UserDetails(props: { user: User; grpName?: string }) {
	return (
		<Loader>
			<Circle
				imageUrl={
					props.user.avatar ? (
						`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(props.user.avatar)
							.filename}&type=${'LowRes'}`
					) : null
				}
			/>
			<Side>
				<FullnameRect>{props.user.firstname + ' ' + props.user.lastname}</FullnameRect>
				<UsernameRect>{props.user.username}</UsernameRect>
				{props.grpName ? <ClubRectName>{props.grpName}</ClubRectName> : null}
			</Side>
		</Loader>
	);
}
