import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { LoggedInUserContext } from '../../../helpers/LoggedInUserContext';
import { Group as GroupType } from '../../../types/group.type';
import Loader from '../../Loaders/Loader';
import { FetchMembers } from './FetchMembers';
import GroupPosts from './GroupPosts';

const GroupIdentifiers = styled.div`
	height: fit-content;
	min-height: 100px;
	width: 100%;
	background-color: var(--div-color);
	margin: 2px 0px 10px 0px;
	padding: 0px 0px 0px 10px;
	position: relative;
	.grpName {
		font-family: 'shanti';
		font-size: larger;
		font-weight: bold;
		color: var(--text-color);
	}
	.grpHandle {
		font-family: 'shanti';
		font-size: x-small;
		color: var(--text-color);
	}
	.join {
		position: absolute;
		right: 5px;
		top: 10px;
		height: 40px;
		width: 80px;
		background-color: var(--color1);
		border: none;
		color: var(--div-color);
		border-radius: 25px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-self: center;
	}
	.TotMem {
		position: absolute;
		left: 10px;
		bottom: 10px;
		height: 40px;
		width: fit-content;
		padding: 10px;
		background-color: var(--div-color);
		color: var(--color1);
		border: 2px solid var(--color1);
		border-radius: 25px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-self: center;
	}
`;
const GroupDetails = styled.div`height: fit-content;`;
const Cover =
	styled.div <
	{ cover: string } >
	`
	height: 200px;
    background-image:${(props) => {
		return `url(${props.cover})`;
	}};
    background-repeat: no-repeat;
    background-size: cover;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const GroupsScroll = styled.div`
	width: 100vw;
	height: max-content;
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-behavior: smooth;
	white-space: nowrap;
	padding: 10px;
	margin-bottom: 20px;
	display: flex;
	justify-content: flex-start;
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
const Collapse =
	styled.div <
	{ showMargin: boolean } >
	`
	height: 50px;
	font-family: shanti;
	align-items: center;
	display: flex;
	justify-content: space-between;
	color: var(--text-color);
	background-color: var(--div-color);
	margin-bottom:${(props) => (props.showMargin ? '30px' : '0')};

	.label {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;
export default function GroupMainPage(props: { grpId: string }) {
	const [ page, setpage ] = useState(1);
	const { hasMore, loading, members } = FetchMembers(page, props.grpId);
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
	const [ group, setgroup ] = useState<GroupType>(null);
	const [ showMember, setshowMember ] = useState(false);
	return (
		<LoggedInUserContext.Consumer>
			{(value) => {
				return (
					<GroupPosts
						userId={value}
						grpId={props.grpId}
						children={
							<GroupDetails>
								<Cover cover={group && group.cover ? group.cover : '/default/cover.jpg'} />
								<GroupIdentifiers>
									<div className="grpName">Group Name</div>
									<div className="grpHandle">@{'Group Handle'}</div>
									<button className="join">Join</button>
									<button className="TotMem">6 Members</button>
								</GroupIdentifiers>
								<Collapse onClick={() => setshowMember((x) => !x)} showMargin={!showMember}>
									<div className="label">Members</div>
									{!showMember ? <ExpandMoreIcon /> : <ExpandLessIcon />}
								</Collapse>

								{showMember ? (
									<GroupsScroll>
										{members.map((user, index) => {
											return (
												<GroupCard
													bgImg={user.avatar || '/default/cover.jpg'}
													key={user.id}
													ref={members.length - 1 === index ? lastElement : null}
												>
													<p>{user.firstname + ' ' + user.lastname}</p>
												</GroupCard>
											);
										})}
										{loading ? <Loader /> : null}
									</GroupsScroll>
								) : null}
							</GroupDetails>
						}
					/>
				);
			}}
		</LoggedInUserContext.Consumer>
	);
}
