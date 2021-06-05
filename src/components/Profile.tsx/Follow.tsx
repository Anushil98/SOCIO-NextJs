import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { follow } from '../../api/User/follow';
import { isFollow } from '../../api/User/isFollow';
import { Unfollow } from '../../api/User/unfollow';

const Folow = styled.div`
	height: 36px;
	width: 94px;
	background-color: var(--text-color);
	color: var(--div-color);
	align-self: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	font-family: shanti;
`;

const UnFollow = styled.div`
	height: 36px;
	width: 94px;
	background-color: var(--div-color);
	color: var(--text-color);
	border: 1px solid var(--text-color);
	align-self: center;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: shanti;
	border-radius: 16px;
`;

export default function Follow(props: { userId: string }) {
	const [ isfollowuser, setisfollow ] = useState<boolean>(null);
	useEffect(() => {
		isFollow(props.userId)
			.then((res) => {
				if (res) {
					setisfollow(true);
				} else {
					setisfollow(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const followHandler = async () => {
		follow(props.userId).then((res) => {
			if (res) {
				setisfollow(true);
			} else {
				setisfollow(false);
			}
		});
	};

	const unfollowHandler = async () => {
		Unfollow(props.userId).then((res) => {
			if (res) {
				setisfollow(false);
			} else {
				setisfollow(true);
			}
		});
	};
	if (isfollowuser) {
		return <UnFollow onClick={() => unfollowHandler()}>Unfollow</UnFollow>;
	} else {
		return <Folow onClick={() => followHandler()}>Follow</Folow>;
	}
}
