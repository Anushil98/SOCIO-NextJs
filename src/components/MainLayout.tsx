import Head from 'next/head';
import React, { useState } from 'react';
import { CreatePost } from './createPost';
import Navbar from './Navbar';

export const MainLayout = (props) => {
	const [ showCreatePost, setshowCreatePost ] = useState(0);
	const showCreatePostModal = () => {
		setshowCreatePost(showCreatePost === 0 ? 1 : 0);
	};
	return (
		<div className="MainLayout">
			<Head>
				<link rel="preload" href="/fonts/Skranji/Skranji-Bold.ttf" as="font" crossOrigin="" />
				<link rel="preload" href="/fonts/Skranji/Skranji-Regular.ttf" as="font" crossOrigin="" />
				<link rel="preload" href="/fonts/Shanti/Shanti-Regular.ttf" as="font" crossOrigin="" />
				<link rel="icon" href="/Full Logo.svg" />
			</Head>
			{props.children}
			<CreatePost show={showCreatePost} />

			<Navbar showCreatePostModal={showCreatePostModal} />
			<div className="ContentArea">
				<div className="leftSideBar">{props.leftSideBar}</div>
				<div className="Middle" id="MidArea">
					{props.Middle}
				</div>
				<div className="rightSideBar">{props.rightSideBar}</div>
			</div>
		</div>
	);
};
