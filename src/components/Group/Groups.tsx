import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { LoggedInUserContext } from '../../helpers/LoggedInUserContext';
import Loader from '../Loaders/Loader';
import { FetchGroups } from './FetchGroup';
import GroupPosts from './GroupPosts';

const GroupsPanel = styled.div`
	margin-top: 10px;
	height: 100%;
	/* overflow-y: scroll; */
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

const GroupsScroll = styled.div`
	width: 100vw;
	height: 180px;
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-behavior: smooth;
	white-space: nowrap;
	padding: 10px;
	margin-bottom: 20px;
	::-webkit-scrollbar {
		width: 0px;
	}
	::-webkit-scrollbar-thumb {
		display: none;
	}
`;
const GroupCard =
	styled.div <
	{ bgImg: string } >
	`
	display: inline-block;
	height: 150px;
	width: 150px;
    font-family:shanti;
	color: var(--div-color);
    background-image:${(props) => {
		return `url(${props.bgImg})`;
	}}; 
    background-repeat: no-repeat;
    background-size: cover;

	border-radius: 25px;
	margin: 2px 10px;

	p {
		display: block;
		margin-top: 100px;
		backdrop-filter: blur(68px) contrast(1.1);
		height: 50px;
		border-radius: 0px 0px 25px 25px;
		color: white;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding:3px 3px 0px 5px;
	}
`;

export default function Groups() {
	const [ page, setpage ] = useState(1);
	const { hasMore, loading, groups } = FetchGroups(page);
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
		<GroupsPanel>
			<LoggedInUserContext.Consumer>
				{(value: string) => {
					console.log(value);
					return (
						<GroupPosts
							userId={value}
							children={
								<GroupsScroll>
									{groups.map((group, index) => {
										return (
											<GroupCard
												bgImg={group.cover || '/default/cover.jpg'}
												key={group.grpId}
												ref={groups.length - 1 === index ? lastElement : null}
											>
												<p>{group.grpName}</p>
											</GroupCard>
										);
									})}
									{loading ? <Loader /> : null}
								</GroupsScroll>
							}
						/>
					);
				}}
			</LoggedInUserContext.Consumer>
		</GroupsPanel>
	);
}
