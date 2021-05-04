import Head from 'next/head';
import React, { useState } from 'react';
import { NavBarContext, OptionType } from '../helpers/NavBarContext';
import Navbar from './Navbar';

export const MainLayout = (props) => {
	const [ showCreatePost, setshowCreatePost ] = useState(0);
	const showCreatePostModal = () => {
		setshowCreatePost(showCreatePost === 0 ? 1 : 0);
	};
	const [ InputPropsForNavBar, setInputPropsForNavBar ] = useState<{
		postId?: string;
		userId?: String;
		grpId?: string;
		options?: OptionType;
	}>({});

	const changeOptions = (data: { postId?: string; userId?: string; grpId?: string; options?: OptionType }) => {
		setInputPropsForNavBar((x) => {
			// console.log(x, data);
			return { ...data };
		});
	};
	return (
		<NavBarContext.Provider value={{ changeOptions }}>
			<div className="MainLayout">
				<Head>
					<link rel="preload" href="/fonts/Skranji/Skranji-Bold.ttf" as="font" crossOrigin="" />
					<link rel="preload" href="/fonts/Skranji/Skranji-Regular.ttf" as="font" crossOrigin="" />
					<link rel="preload" href="/fonts/Shanti/Shanti-Regular.ttf" as="font" crossOrigin="" />
					<link rel="icon" href="/Full Logo.svg" />
				</Head>
				{props.children}
				<NavBarContext.Consumer>
					{({ changeOptions }) => {
						return <Navbar data={InputPropsForNavBar} changeOptions={changeOptions} />;
					}}
				</NavBarContext.Consumer>
				<div className="ContentArea">
					<div className="leftSideBar">{props.leftSideBar}</div>
					<div className="Middle" id="MidArea">
						{props.Middle}
					</div>
					<div className="rightSideBar">{props.rightSideBar}</div>
				</div>
			</div>
		</NavBarContext.Provider>
	);
};
