import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { FetchInvites } from '../../api/Invites/fetchInvites';
import { InviteStateEnum } from '../../types/invite.type';
import SideCard from '../SideCards';

const Invites = styled.div`
	margin-top: 10px;
	height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	::-webkit-scrollbar {
		width: 0px;
	}
	::-webkit-scrollbar-thumb {
		display: none;
	}
`;
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
	.accept {
		background-color: var(--color1);
		color: var(--div-color);
		padding: 8px 12px;
		border-radius: 25px;
	}
	.reject {
		background-color: var(--div-color);
		color: var(--color1);
		border: 2px solid var(--color1);
		padding: 8px 12px;
		border-radius: 25px;
	}
`;

export default function Invite() {
	const [ page, setpage ] = useState(1);
	const { hasMore, loading, invites } = FetchInvites(page);
	const observer = useRef(null);
	const lastElement = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setpage((x) => x + 1);
					}
				},
				{ root: document.querySelector('body'), threshold: 0.75 }
			);
			if (node) {
				observer.current.observe(node);
			}
		},
		[ loading, hasMore ]
	);
	return (
		<Invites>
			{invites.map((invite, index) => {
				return (
					<InviteCard key={invite.InviteId} ref={invites.length - 1 === index ? lastElement : null}>
						<Avatar bgImg={invite.Host.avatar} />
						<Message>
							<div>
								<span>
									<Link href={`/profile/${invite.hostId}`}>
										{invite.Host.firstname + ' ' + invite.Host.lastname}
									</Link>
								</span>
								&nbsp; invited you to join &nbsp;
								<span>
									<Link href={`/group/${invite.grpId}`}>{invite.Group.grpName}</Link>
								</span>
							</div>
							{invite.InviteState === InviteStateEnum.Pending ? (
								<ActionArea>
									<Action bgColor="var(--color1)" txtColor={'var(--div-color)'}>
										Join
									</Action>
									<Action bgColor="var(--div-color)" txtColor={'var(--color1)'}>
										Cancel
									</Action>
								</ActionArea>
							) : (
								<ActionArea>
									<State>
										{invite.InviteState === InviteStateEnum.Accepted ? (
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
			})}
			{loading ? <SideCard loading={true} key={'Loading'} /> : null}
			{/* {!hasMore && !loading ? <SideCard end={true} key={'LastKey'} /> : null} */}
		</Invites>
	);
}
