import { CancelOutlined, CommentOutlined, Gesture, ThumbDownAlt, ThumbDownAltOutlined } from '@material-ui/icons';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import useOutsideAlerter from '../helpers/outsideClick';

export default function PostCard(props) {
	const [ optionsShow, setoptionsShow ] = useState(0);
	const [ Canvas, setCanvas ] = useState(0);
	const wrapper = useRef(null);
	let startDraw = 0;
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
	const draw = (X, Y) => {
		const can = document.getElementById('canvas') as HTMLCanvasElement;
		const ctx = can.getContext('2d');
		console.log(X, Y);
		ctx.beginPath();
		ctx.arc(X + 0.5, Y, 10.5, 0, 2 * Math.PI);
		ctx.stroke();
	};
	const changeState = () => {
		startDraw = startDraw === 0 ? 1 : 0;
	};
	useEffect(
		() => {
			console.log(Canvas);
			if (Canvas === 1) {
				document.getElementById('canvas').addEventListener('mousedown', (e) => {
					console.log('mousedown', startDraw);
					changeState();
				});
				document.getElementById('canvas').addEventListener('mouseup', (e) => {
					console.log(startDraw, 'mouseup');
					changeState();
				});
				document.getElementById('canvas').addEventListener('mousemove', (e) => {
					// console.log(e);
					if (startDraw === 1) {
						console.log('drawing');
						var rect = (e.target as HTMLElement).getBoundingClientRect();
						const can = document.getElementById('canvas') as HTMLCanvasElement;
						const scaleX = can.width / rect.width; // relationship bitmap vs. element for X
						const scaleY = can.height / rect.height; // relationship bitmap vs. element for Y
						let x = (e.clientX - rect.left) * scaleX;
						let y = (e.clientY - rect.top) * scaleY;
						draw(x, y);
					}
				});
				document.getElementById('canvas').addEventListener('touchstart', (e) => {
					console.log('mousedown', startDraw);
					changeState();
				});
				document.getElementById('canvas').addEventListener('touchend', (e) => {
					console.log(startDraw, 'mouseup');
					changeState();
				});
				document.getElementById('canvas').addEventListener('touchmove', (e) => {
					// console.log(e);
					if (startDraw === 1) {
						console.log('drawing');
						var rect = (e.target as HTMLElement).getBoundingClientRect();
						const can = document.getElementById('canvas') as HTMLCanvasElement;
						const scaleX = can.width / rect.width; // relationship bitmap vs. element for X
						const scaleY = can.height / rect.height; // relationship bitmap vs. element for Y
						let x = (e.clientX - rect.left) * scaleX;
						let y = (e.clientY - rect.top) * scaleY;
						draw(x, y);
					}
				});
			}
			if (Canvas === 0) {
				document.getElementById('canvas').removeEventListener('mouseup', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('mousedown', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('mousemove', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('touchstart', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('touchmove', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('touchend', () => {
					console.log('Event Over');
				});
				const can = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = can.getContext('2d');
				ctx.clearRect(0, 0, can.width, can.height);
			}
		},
		[ Canvas ]
	);
	const showCanvas = () => {
		setCanvas(Canvas === 0 ? 1 : 0);
	};

	return (
		<div className="postCard">
			<canvas id="canvas" style={{ display: Canvas ? 'block' : 'none' }} />
			<div id="canvas-cancel">
				<CancelOutlined
					onClick={() => showCanvas()}
					style={{ display: Canvas ? 'block' : 'none', height: '50px', width: '50px' }}
				/>
			</div>
			<div className="postCardtop">
				<div className="UserCard ">
					<div>
						<div>
							<img
								src={
									props.post.user.avatar ||
									'https://p1.hiclipart.com/preview/201/489/299/global-warming-icon-ozone-icon-world-circle-logo-earth-symbol-interior-design-png-clipart.jpg'
								}
							/>
						</div>
						<div />
					</div>
					<div>
						<Link href={`/${props.post.user.username}`}>
							<a>{props.post.user.FirstName + ' ' + props.post.user.LastName}</a>
						</Link>
					</div>
				</div>
				<div className="TripleDot">
					<div className={optionsShow ? 'BurgerOption show' : 'BurgerOption hide'} ref={wrapper}>
						<div>
							<div>Show</div>
						</div>
						<div>Delete</div>
						<div>Share</div>
					</div>
					<div className="BurgerArrow" onClick={() => MenuOpenHandler()}>
						<KeyboardArrowDownOutlinedIcon />
					</div>
				</div>
			</div>

			<div className="PostDetails">
				<div className="PostText wrap">{props.post.postDetails.text}</div>
				{props.post.postDetails.media.length % 2 == 0 ? (
					<div className="PostMedia">
						<div className="column">
							{props.post.postDetails.media.map((media, index) => {
								if ((index + 1) % 2 == 0) {
									return (
										<div
											key={media.id}
											style={{
												height: '310px',
												width: '310px',
												padding: '2%'
											}}
										>
											<img key={media.id} src={media.url} />
										</div>
									);
								}
							})}
						</div>
						<div className="column">
							{props.post.postDetails.media.map((media, index) => {
								if ((index + 1) % 2 != 0)
									return (
										<div
											key={media.id}
											style={{
												height: '310px',
												width: '310px',
												padding: '2%'
											}}
										>
											<img key={media.id} src={media.url} />
										</div>
									);
							})}
						</div>
					</div>
				) : (
					<div className="PostMediaEven">
						<div className="column">
							{props.post.postDetails.media.map((media, index) => {
								if (index + 1 == 1) {
									return (
										<div
											key={media.id}
											style={{
												height: '310px',
												width: '620px',
												padding: '2%'
											}}
										>
											<img key={media.id} src={media.url} />
										</div>
									);
								}
							})}
						</div>
						<div className="column">
							{props.post.postDetails.media.map((media, index) => {
								if (index + 1 > 1)
									return (
										<div
											key={media.id}
											style={{
												height: '310px',
												width: '310px',
												padding: '2%'
											}}
										>
											<img key={media.id} src={media.url} />
										</div>
									);
							})}
						</div>
					</div>
				)}
			</div>
			<div className="postCardBottom">
				<div className="Action">
					<div>{props.post.postDetails.isUpvoted ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}</div>
					<div>{props.post.postDetails.isUpvoted ? <ThumbDownAlt /> : <ThumbDownAltOutlined />}</div>
					<div>
						<Gesture onClick={() => showCanvas()} />
					</div>
				</div>
				<div className="CommentArea">
					<div>
						<CommentOutlined />
					</div>
					<div>
						<div>Comment</div>
					</div>
				</div>
			</div>
		</div>
	);
}
