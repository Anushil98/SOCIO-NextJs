import { CircularProgress } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Router from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFilePicker } from 'use-file-picker';
import { uploadFiles } from '../../api/FileUpload/fileuploadRestApi';
import { UserPostsFetch } from '../../api/Post/fetchUserposts';
import { getUserDetails } from '../../api/User/getUserDetails';
import { updateUserImage } from '../../api/User/updateUserImage';
import { User } from '../../types/user.type';
import Panel from '../panelDiv';
import Follow from './Follow';

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
	position: relative;
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
    background-size: contain;
	position: relative;

	img{
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
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

const ChangeAvatar = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: center;

	svg {
		margin: 2px;
		border: 1px solid white;
		border-radius: 50%;
		padding: 5px;
		backdrop-filter: contrast(0.5);
		font-size: xx-large;
	}
`;
const ChangeCover = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: flex-end;

	svg {
		margin: 2px;
		border: 1px solid white;
		border-radius: 50%;
		padding: 5px;
		backdrop-filter: contrast(0.5);
		font-size: xx-large;
	}
`;

export default function Profile(props: { currentUser: boolean; userId?: string }) {
	const [ userDetails, setuserDetails ] = useState<User>(null);
	const [ counts, setCounts ] = useState<{ followers: number; followings: number }>({ followers: 5, followings: 10 });
	// useEffect(() => {

	// }, [counts])
	const [ page, setpage ] = useState(1);
	const { hasMore, feedloading, posts } = UserPostsFetch(page, props.userId);
	const [ updateUserImageType, setupdateUserImageType ] = useState<'Avatar' | 'Cover'>(null);
	const observer = useRef(null);
	const lastElement = useCallback(
		(node) => {
			if (feedloading) return;
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
		[ feedloading, hasMore ]
	);

	const [ openFileSelector, { filesContent, loading } ] = useFilePicker({
		accept: [ 'image/*' ],
		readAs: 'DataURL',
		multiple: true
	});

	const dataURLtoFile = (dataurl: string, filename: string): File => {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([ u8arr ], filename, { type: mime });
	};
	const updateUserImageHandler = async (file: File, type: 'Avatar' | 'Cover'): Promise<boolean> => {
		const data = await uploadFiles([ file ]);
		const filename = data[0].uploadfilename;
		await updateUserImage(filename, type);
		return true;
	};
	if (!loading && filesContent.length > 0) {
		updateUserImageHandler(dataURLtoFile(filesContent[0].content, filesContent[0].name), updateUserImageType)
			.then((res) => {
				console.log('User Image update sucsess', res);
				Router.reload();
			})
			.catch((err) => {
				console.error(err);
			});
	}

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
							<Cover
								cover={
									userDetails && userDetails.cover ? (
										`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(userDetails.cover)
											.filename}&type=${'LowRes'}`
									) : (
										'/default/cover.jpg'
									)
								}
							>
								<Avatar
									bgImg={
										userDetails && userDetails.avatar ? (
											`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(userDetails.avatar)
												.filename}&type=${'LowRes'}`
										) : (
											'/default/avatar.svg'
										)
									}
								>
									<img
										src={
											userDetails && userDetails.avatar ? (
												`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(
													userDetails.avatar
												).filename}&type=${'LowRes'}`
											) : (
												'/default/avatar.svg'
											)
										}
									/>
									{props.currentUser ? (
										<ChangeAvatar>
											{!loading ? (
												<PhotoCameraIcon
													onClick={() => {
														setupdateUserImageType('Avatar');
														openFileSelector();
													}}
												/>
											) : (
												<CircularProgress />
											)}
										</ChangeAvatar>
									) : null}
								</Avatar>
								{props.currentUser ? (
									<ChangeCover>
										<PhotoCameraIcon
											onClick={() => {
												setupdateUserImageType('Cover');
												openFileSelector();
											}}
										/>
									</ChangeCover>
								) : null}
							</Cover>
							<UserDetails>
								<FullName>
									{userDetails ? `${userDetails.firstname} ${userDetails.lastname || ''}` : ''}
								</FullName>
								<UserName>@{userDetails ? `${userDetails.username}` : ''}</UserName>
								{!props.currentUser ? <Follow userId={props.userId} /> : null}

								<UserRelation>
									<FollowersButton>Followers {counts ? counts.followers : null}</FollowersButton>
									<FollowingsButton>Followings {counts ? counts.followings : null}</FollowingsButton>
								</UserRelation>
							</UserDetails>
						</UserDetailsSection>
					}
					refProp={lastElement}
					hasMore={hasMore}
					loading={feedloading}
				/>
			) : null}
		</ProfileSection>
	);
}
