import React, { useRef, useState } from 'react';
import useOutsideAlerter from '../helpers/outsideClick';
import { timeAgo } from '../helpers/TimeAgoUtil';
import { Post } from '../types/post.type';

export default function PostCard(props: { post: Post }) {
	const [ optionsShow, setoptionsShow ] = useState(0);

	const wrapper = useRef(null);

	useOutsideAlerter(wrapper, setoptionsShow);
	const MenuOpenHandler = () => {
		console.log('menu event listener e', optionsShow);
		if (optionsShow) {
			setoptionsShow(0);
		} else {
			setoptionsShow(1);
		}
		// console.log('menu event listener ex', optionsShow);
	};
	// const [ showCanvas, setshowCanvas ] = useState(0);
	// const showCanvasHandler = () => {
	// 	props.showCanvasHandler();
	// };
	const { post } = props;

	return (
		<div className="postCard">
			<div className="UserInfo">
				<div className="UserAvatar">
					<div className="avatar">
						<img src={post.User.avatar} alt="" />
					</div>
				</div>
				<div className="UserDetails">
					<div className="FullName">{post.User.firstname + ' ' + post.User.lastname}</div>
					<div className="UserName">{'@' + post.User.username}</div>
					<div className="PostTime">
						<img src="/TimeIcon.svg" alt="" />
						<div className="Time">{timeAgo.format(new Date(post.createdDate), 'round')}</div>
					</div>
				</div>
			</div>
			<div className="PostDetails">
				<div className="postText" />
				<div className="ImageSlider" />
			</div>
		</div>
	);
}
