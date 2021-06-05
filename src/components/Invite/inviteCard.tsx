import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { actionOnInvite } from '../../api/Invites/actionOnInvite';
import { invite, InviteStateEnum } from '../../types/invite.type';

const InviteCard = styled.div`
	min-height: 100px;
	height: max-content;
	width: 100%;
	background-color: var(--div-color);
	margin: 5px 0px 10px 0px;
	display: flex;
	justify-content: flex-start;
`;
const Avatar =
	styled.div <
	{ bgImg: string } >
	`
    background-image:${(props) => {
		return `url(${props.bgImg})`;
	}};
	height: 70px;
	min-width: 70px;
	border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
	display:block;
`;
const Message = styled.div`
	margin-left: 10px;
	font-family: shanti;
	font-size: large;
	color: var(--text-color);
	margin-right: 10px;
	display: flex;
	flex-direction: column;

	span {
		font-weight: bold;
	}
`;
const ActionArea = styled.div`
	display: flex;
	justify-content: flex-end;
	font-family: shanti;
`;
const Action =
	styled.button <
	{ bgColor: string, txtColor: string } >
	`
    font-family: shanti;
	margin-right: 10px;
	height: 40px;
	width: 70px;
	outline: none;
	border: 2px solid var(--color1);
	background-color: ${(props) => {
		return props.bgColor;
	}};
    color: ${(props) => {
		return props.txtColor;
	}};
	border-radius: 25px;
`;

const State = styled.div`
	font-size: small;
	margin-right: 11px;
	.accept {
		background-color: var(--color1);
		color: var(--div-color);
		padding: 8px 12px;
		font-family: shanti;
		border-radius: 25px;
	}
	.reject {
		background-color: var(--div-color);
		color: var(--color1);
		border: 2px solid var(--color1);
		padding: 8px 12px;
		font-family: shanti;
		border-radius: 25px;
	}
`;

export default function InviteCardDiv(props: { key: string; propref: (node: any) => void; invite: invite }) {
	const { key, propref, invite } = props;
	const [ inviteState, setinviteState ] = useState<InviteStateEnum>(invite.InviteState);

	const actionHandler = async (action: InviteStateEnum) => {
		try {
			await actionOnInvite(action, invite.Group.grpId, invite.InviteId);
			if (action === InviteStateEnum.Accepted) {
				console.log('Accepted');
				setinviteState(InviteStateEnum.Accepted);
			} else {
				console.log('Rejected');
				setinviteState(InviteStateEnum.Rejected);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<InviteCard key={invite.InviteId} ref={propref}>
			<Avatar bgImg={invite.Host.avatar || '/default/avatar.jpg'} />
			<Message>
				<div>
					<span>
						<Link href={`/profile/${invite.hostId}`}>
							{invite.Host.firstname + ' ' + invite.Host.lastname}
						</Link>
					</span>
					&nbsp; invited you to join &nbsp;
					<span>
						<Link href={`/groups/${invite.Group.grpId}`}>{invite.Group.grpName}</Link>
					</span>
				</div>
				{inviteState === InviteStateEnum.Pending ? (
					<ActionArea>
						<Action
							bgColor="var(--color1)"
							txtColor={'var(--div-color)'}
							onClick={() => {
								actionHandler(InviteStateEnum.Accepted);
							}}
						>
							Join
						</Action>
						<Action
							bgColor="var(--div-color)"
							txtColor={'var(--color1)'}
							onClick={() => {
								actionHandler(InviteStateEnum.Rejected);
							}}
						>
							Cancel
						</Action>
					</ActionArea>
				) : (
					<ActionArea>
						<State>
							{inviteState === InviteStateEnum.Accepted ? (
								<span className="accept">Joined</span>
							) : (
								<span className="reject">Dismissed</span>
							)}
						</State>
					</ActionArea>
				)}
			</Message>
		</InviteCard>
	);
}
