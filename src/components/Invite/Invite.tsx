import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { FetchInvites } from '../../api/Invites/fetchInvites';
import Loader from '../Loaders/Loader';
import InviteCardDiv from './inviteCard';

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
					<InviteCardDiv
						invite={invite}
						key={invite.InviteId}
						propref={invites.length - 1 === index ? lastElement : null}
					/>
				);
			})}
			{loading ? <Loader /> : null}
			{/* {!hasMore && !loading ? <SideCard end={true} key={'LastKey'} /> : null} */}
		</Invites>
	);
}
