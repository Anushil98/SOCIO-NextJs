import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import React, { useRef, useState } from 'react';
import useOutsideAlerter from '../helpers/outsideClick';

export default function PostCard(props) {
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

	return (
		<div className="postCard">
			<div className="postCardtop">
				<div className="UserCard truncate">
					<span>{props.post.user.FirstName}</span>
					<span>{props.post.user.LastName}</span>
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
				<div className="Action">action buttons</div>
				<div className="CommentArea">comments</div>
			</div>
		</div>
	);
}
