import CloseIcon from '@material-ui/icons/Close';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLoggedInUser } from '../api/User/getLoggedInUser';
import { getUserDetails } from '../api/User/getUserDetails';
import { CurrentGroupContext } from '../helpers/CurrentGroupContext';
import { LoggedInUserContext } from '../helpers/LoggedInUserContext';
import logout from '../helpers/logout';
import { NavBarContext, OptionType } from '../helpers/NavBarContext';
import Navbar from './Navbar';

const Aside = styled.aside`
	height: 100%;
	width: 250px;
	float: left;
	background-color: var(--div-color);
	position: absolute;
	z-index: 999;
	overscroll-behavior: contain;
`;

const Close = styled.div`
	width: 100%;
	height: 65px;
	display: flex;
	justify-content: space-between;
	font-size: 50px;
	border-bottom: 2px solid var(--text-color);
`;

const Avatar =
	styled.div <
	{ bgImg: string } >
	`
    background-image:${(props) => {
		return `url(${props.bgImg})`;
	}};
	height: 48px;
	width: 48px;
	margin-left:10px;
	border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
	float:left;
`;

const Menu = styled.div`
	height: 100%;
	margin-top: 10px;
`;
const Option = styled.div`
	height: 50px;
	margin-bottom: 6px;
	font-family: shanti;
	font-size: large;
	color: var(--text-color);
	margin-left: 10px;
`;

const Option2 = styled.div`
	height: 30px;
	font-family: shanti;
	font-size: small;
	color: var(--text-color);
	margin: 35px 0 0 5px;
`;
const MyProfile = styled.div`
	display: flex;
	align-items: center;
`;

export const MainLayout = (props: {
	loggedInUser: string;

	Middle: any;
	showNavbar: boolean;
	currentGroup?: string;
	leftSideBar?: any;
	rightSideBar?: any;
	children?: any;
}) => {
	const [ showCreatePost, setshowCreatePost ] = useState(0);
	const [ loggedInUser, setloggedinuser ] = useState<string>(null);
	const [ loggedInUserAvatar, setloggedInUserAvatar ] = useState<string>(null);
	const [ sideBar, setsideBar ] = useState(0);
	const showCreatePostModal = () => {
		setshowCreatePost(showCreatePost === 0 ? 1 : 0);
	};
	const [ InputPropsForNavBar, setInputPropsForNavBar ] = useState<{
		postId?: string;
		userId?: string;
		grpId?: string;
		options?: OptionType;
	}>({});

	useEffect(() => {
		getLoggedInUser().then((user) => {
			setloggedinuser(user.id);
		});
	});

	useEffect(
		() => {
			if (sideBar === 1) {
				getUserDetails(props.loggedInUser).then((user) => {
					setloggedInUserAvatar(
						`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(user.avatar).filename}&type=${'LowRes'}`
					);
				});
			}
		},
		[ sideBar ]
	);

	const changeOptions = (data: {
		postId?: string;
		userId?: string;
		grpId?: string;
		options?: OptionType;
		children?: any;
	}) => {
		setInputPropsForNavBar((x) => {
			return { ...data };
		});
	};
	return (
		<CurrentGroupContext.Provider value={props.currentGroup}>
			<LoggedInUserContext.Provider value={props.loggedInUser}>
				<NavBarContext.Provider value={{ changeOptions, showSideBar: setsideBar }}>
					{sideBar ? (
						<Aside>
							<Close>
								<MyProfile
									onClick={() => {
										Router.push('/me');
									}}
								>
									<Avatar bgImg={loggedInUserAvatar || '/default/avatar.svg'} />
									<Option2>My Profile</Option2>
								</MyProfile>
								<CloseIcon
									fontSize="inherit"
									htmlColor="var(--text-color)"
									onClick={() => setsideBar((x) => (x == 1 ? 0 : 1))}
								/>
							</Close>
							<Menu>
								<Option
									onClick={() => {
										Router.push('/');
									}}
								>
									Home
								</Option>
								<Option
									onClick={() => {
										Router.push('/invites');
									}}
								>
									Invites
								</Option>
								<Option
									onClick={() => {
										Router.push('/groups');
									}}
								>
									Groups
								</Option>
								<Option onClick={() => logout()}>Logout</Option>
							</Menu>
						</Aside>
					) : null}
					<div className="MainLayout">
						<Head>
							<link rel="preload" href="/fonts/Skranji/Skranji-Bold.ttf" as="font" crossOrigin="" />
							<link rel="preload" href="/fonts/Skranji/Skranji-Regular.ttf" as="font" crossOrigin="" />
							<link rel="preload" href="/fonts/Shanti/Shanti-Regular.ttf" as="font" crossOrigin="" />
							<link rel="icon" href="/Full Logo.svg" />
						</Head>

						<NavBarContext.Consumer>
							{({ changeOptions, showSideBar }) => {
								return (
									<Navbar
										data={InputPropsForNavBar}
										changeOptions={changeOptions}
										showSideBar={showSideBar}
										showNavBar={props.showNavbar}
									/>
								);
							}}
						</NavBarContext.Consumer>

						<div className="ContentArea">
							<div className="leftSideBar">{props.leftSideBar}</div>
							<div className="Middle" id="MidArea">
								{props.Middle}
							</div>
							<div className="rightSideBar">{props.rightSideBar}</div>
						</div>
						{props.children}
					</div>
				</NavBarContext.Provider>
			</LoggedInUserContext.Provider>
		</CurrentGroupContext.Provider>
	);
};
