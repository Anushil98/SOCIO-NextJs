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
