import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { IndividualGroupPosts } from '../../../api/Post/IndividualGroupPosts';
import Panel from '../../panelDiv';

const NotAMember = styled.div`
	p {
		width: 100%;
		height: max-content;
		color: var(--text-color);
		background-color: var(--div-color);
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
	a {
		outline: none;
	}
	svg {
		width: 100%;
		height: 100px;
		color: var(--div-color);
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
`;
export default function GroupPosts(props: { userId: string; grpId: string; children: any }) {
	if (props.grpId) {
		const [ page, setpage ] = useState(1);
		const { hasMore, loading, posts } = IndividualGroupPosts(page, props.grpId);
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
			<Panel
				feed={false}
				posts={posts}
				refProp={lastElement}
				hasMore={hasMore}
				loading={loading}
				children={props.children}
			/>
		);
	} else
		return (
			<NotAMember>
				<ErrorOutlineIcon fontSize={'inherit'} />
				<p>
					You are not a member of this group <p>Invite Only!</p>
					<p>
						Check out your invites{' '}
						<a href={'/invites'}>
							<u>here</u>
						</a>{' '}
					</p>
				</p>
			</NotAMember>
		);
}
