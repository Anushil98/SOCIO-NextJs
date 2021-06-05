import Router from 'next/router';
import React, { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { NavBarContext, OptionType } from '../helpers/NavBarContext';
import { timeAgo } from '../helpers/TimeAgoUtil';
import { Post } from '../types/post.type';

export default function PostCard(props: { post: Post; refProp?: any }) {
	const wrapper = useRef(null);

	const [ mainImage, setmainImage ] = useState({ position: 0, prev: null, next: null });
	const [ moveLeft, setmoveLeft ] = useState(false);
	const [ moveRight, setmoveRight ] = useState(false);

	const { post } = props;

	return (
		<div className="postCard" ref={props.refProp || null}>
			<div className="UserInfo">
				<div className="UserAvatar">
					<NavBarContext.Consumer>
						{({ changeOptions }) => (
							<div className="avatar">
								<img
									src={
										post.User.avatar ? (
											`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(post.User.avatar)
												.filename}&type=${'LowRes'}`
										) : (
											'/default/avatar.svg'
										)
									}
									alt=""
								/>
							</div>
						)}
					</NavBarContext.Consumer>
				</div>
				<div className="UserDetails">
					<div className="FullName" onClick={() => Router.push(`/profile/${post.User.id}`)}>
						{post.User.firstname + ' ' + post.User.lastname}
					</div>
					<div className="UserName" onClick={() => Router.push(`/profile/${post.User.id}`)}>
						{'@' + post.User.username}
					</div>

					{post.Group ? (
						<div className="UserName" onClick={() => Router.push(`/groups/${post.Group.grpId}`)}>
							{'>>' + post.Group.grpHandle}
						</div>
					) : null}
					<div className="PostTime">
						<img src="/TimeIcon.svg" alt="" />
						<div className="Time">{timeAgo.format(new Date(post.createdDate))}</div>
					</div>
				</div>
				<NavBarContext.Consumer>
					{({ changeOptions }) => (
						<div
							className="options"
							onClick={() =>
								changeOptions({
									postId: post.postId,
									userId: post.userId,
									grpId: post.grpId,
									options: OptionType.PostOptions
								})}
						>
							<img src="/Full Logo.svg" />
						</div>
					)}
				</NavBarContext.Consumer>
			</div>
			<div className="PostDetails">
				<div className="postText">{post.text}</div>
				{post.Media && post.Media.length > 0 ? (
					<div className="ImageSlider">
						{post.Media.length > 1 ? (
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
						) : null}
						<SwitchTransition mode={'out-in'}>
							<CSSTransition key={mainImage.position} timeout={{ exit: 300, enter: 500 }}>
								<img
									src={`${process.env.NEXT_PUBLIC_ImageUrl}?name=${JSON.parse(
										post.Media[mainImage.position].filename
									).filename}&type=${'LowRes'}`}
									className={`prev-${mainImage.prev} next-${mainImage.next}`}
								/>
							</CSSTransition>
						</SwitchTransition>

						{post.Media.length > 1 ? (
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
						) : null}
					</div>
				) : null}
				<div className="credSlider">
					<div className="leftSlide" />
					<div className="rightSlide" />
				</div>
			</div>
			{/* <div className="conversation">
				<img src="/chat.svg" />
			</div> */}
		</div>
	);
}
