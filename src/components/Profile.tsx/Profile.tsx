import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FeedPostFetch } from '../../api/Post/fetchFeedPosts';
import { getUserDetails } from '../../api/User/getUserDetails';
import { User } from '../../types/user.type';
import Panel from '../panelDiv';

const ProfileSection = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;
const UserDetailsSection = styled.div`height: fit-content;`;
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
const Avatar =
	styled.div <
	{ bgImg: string } >
	`
    background-image:${(props) => {
		return `url(${props.bgImg})`;
	}};
	background-color: var(--div-color);
	height: 100px;
	width: 100px;
	border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
`;
const UserDetails = styled.div`
	height: 40%;
	background-color: var(--div-color);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding-top: 10px;
`;
const FullName = styled.div`
	height: 30px;
	font-family: shanti;
	font-size: large;
	font-weight: bold;
	color: var(--text-color);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
const UserName = styled.div`
	height: 40px;
	font-family: shanti;
	font-size: medium;
	color: #772d2d;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const UserRelation = styled.div`
	display: grid;
	grid-template-columns: 100px 100px;
	grid-column-gap: 10px;
	margin: 10px auto 30px auto;
`;
const FollowersButton = styled.button`
	height: 40px;
	border: 2px solid var(--color1);
	background-color: var(--div-color);
	border-radius: 25px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: var(--text-color);
`;
const FollowingsButton = styled.button`
	height: 40px;
	border: 2px solid var(--color1);
	background-color: var(--div-color);
	border-radius: 25px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: var(--text-color);
`;
const FollowButton = styled.button`
	height: 40px;
	width: 100px;
	background-color: var(--color1);
	border: none;
	color: var(--div-color);
	border-radius: 25px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	align-self: center;
`;

export default function Profile(props: { currentUser: boolean; userId?: string }) {
	const [ userDetails, setuserDetails ] = useState<User>(null);
	const [ counts, setCounts ] = useState<{ followers: number; followings: number }>({ followers: 5, followings: 10 });
	const [ page, setpage ] = useState(1);
	const { hasMore, loading, posts } = FeedPostFetch(page);
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

	useEffect(() => {
		if (userDetails === null && props.userId) {
			getUserDetails(props.userId).then((user) => {
				console.log(user);
				setuserDetails(user);
			});
		}
	});
	return (
		<ProfileSection>
			{typeof window !== 'undefined' ? (
				<Panel
					feed={false}
					posts={posts}
					children={
						<UserDetailsSection>
							<Cover cover={userDetails && userDetails.cover ? userDetails.cover : '/default/cover.jpg'}>
								<Avatar
									bgImg={
										userDetails && userDetails.avatar ? userDetails.avatar : '/default/avatar.svg'
									}
								/>
							</Cover>
							<UserDetails>
								<FullName>
									{userDetails ? `${userDetails.firstname} ${userDetails.lastname || ''}` : ''}
								</FullName>
								<UserName>@{userDetails ? `${userDetails.username}` : ''}</UserName>
								{!props.currentUser ? <FollowButton>Follow</FollowButton> : null}

								<UserRelation>
									<FollowersButton>Followers {counts ? counts.followers : null}</FollowersButton>
									<FollowingsButton>Followings {counts ? counts.followings : null}</FollowingsButton>
								</UserRelation>
							</UserDetails>
						</UserDetailsSection>
					}
					refProp={lastElement}
					hasMore={hasMore}
					loading={loading}
				/>
			) : null}
		</ProfileSection>
	);
}
