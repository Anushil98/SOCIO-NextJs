import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Router from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { LoggedInUserContext } from '../../helpers/LoggedInUserContext';
import Loader from '../Loaders/Loader';
import CreateGroupCard from './CreateGroupCard';
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
	@media only screen and (min-width: 840px) {
		width: 500px;
		::-webkit-scrollbar-thumb {
			display: inline;
		}
		::-webkit-scrollbar {
			width: 2px;
		}
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

const GroupSection = styled.div`height: fit-content;`;
const CreateGroup = styled.div`
	height: fit-content;
	padding: 10px 0px;
	color: var(--text-color);
	background-color: var(--div-color);
	display: flex;
	align-items: center;

	svg {
		margin: 0px 10px;
	}
`;
const NoGroups = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 100px 0 0 0;
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
export default function Groups() {
	const [ page, setpage ] = useState(1);
	const { hasMore, loading, groups } = FetchGroups(page);
	const observer = useRef(null);
	const [ showCreateClub, setshowCreateClub ] = useState(false);
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
					return (
						<GroupPosts
							userId={value}
							children={
								<GroupSection>
									<CreateGroup
										onClick={() => {
											console.log('chel');
											setshowCreateClub((x: boolean) => !x);
										}}
									>
										<AddIcon />
										Create a group
									</CreateGroup>
									{showCreateClub ? (
										ReactDOM.createPortal(
											<CreateGroupCard userId={value} close={setshowCreateClub} />,
											document.body
										)
									) : null}
									{groups.length > 0 ? (
										<GroupsScroll>
											{groups.map((group, index) => {
												return (
													<GroupCard
														bgImg={group.cover || '/default/cover.jpg'}
														key={index}
														ref={groups.length - 1 === index ? lastElement : null}
														onClick={() => {
															Router.push(`/groups/${group.grpId}`);
														}}
													>
														<p>{group.grpName}</p>
													</GroupCard>
												);
											})}
											{loading ? <Loader /> : null}
										</GroupsScroll>
									) : (
										<NoGroups>
											<ErrorOutlineIcon fontSize={'inherit'} />
											<p>
												You are not a member of any group
												<p>
													Check out your invites{' '}
													<a href={'/invites'}>
														<u>here</u>
													</a>
												</p>
												<p>or create a group</p>
											</p>
										</NoGroups>
									)}
								</GroupSection>
							}
						/>
					);
				}}
			</LoggedInUserContext.Consumer>
		</GroupsPanel>
	);
}
