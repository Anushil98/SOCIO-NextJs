import React, { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import useOutsideAlerter from '../helpers/outsideClick';
import { timeAgo } from '../helpers/TimeAgoUtil';
import { Post } from '../types/post.type';

export default function PostCard(props: { post: Post }) {
	const [ optionsShow, setoptionsShow ] = useState(0);

	const wrapper = useRef(null);

	const [ mainImage, setmainImage ] = useState({ position: 0, prev: null, next: null });
	const [ moveLeft, setmoveLeft ] = useState(false);
	const [ moveRight, setmoveRight ] = useState(false);

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
						<div className="Time">{timeAgo.format(new Date(post.createdDate))}</div>
					</div>
				</div>
			</div>
			<div className="PostDetails">
				<div className="postText">
					We are in this together. Lets us focus on this situation like an opportunuty and then we will all do
					it once again. It is time for us to win against this virus
				</div>
				{post.Media.length > 0 ? (
					<div className="ImageSlider">
						<div
							className="LeftImageSlide"
							onClick={() =>
								setmainImage((x) => {
									if (x.position + 1 >= post.Media.length) {
										x.position = 0;
									} else x.position = x.position + 1;
									if (x.next === 'left') {
										x.prev = 'left';
									}
									x.next = 'right';
									return { ...x };
								})}
						>
							<img src="/left-arrow.svg" />
						</div>
						<SwitchTransition mode={'out-in'}>
							<CSSTransition key={mainImage.position} timeout={{ exit: 300, enter: 500 }}>
								<img
									src={post.Media[mainImage.position].filename}
									className={`prev-${mainImage.prev} next-${mainImage.next}`}
								/>
							</CSSTransition>
						</SwitchTransition>

						<div
							className="RightImageSlide"
							onClick={() => {
								setmainImage((x) => {
									if (x.position - 1 < 0) {
										x.position = post.Media.length - 1;
									} else x.position = x.position - 1;
									if (x.next === 'right') {
										x.prev = 'right';
									}
									x.next = 'left';
									return { ...x };
								});
							}}
						>
							<img src="/arrow-point-to-right.svg" />
						</div>
					</div>
				) : null}
				<div className="credSlider">
					<div className="leftSlide" />
					<div className="mainSlide">{7.5}</div>
					<div className="rightSlide" />
				</div>
			</div>
			<div className="conversation">
				<img src="/chat.svg" />
			</div>
		</div>
	);
}
