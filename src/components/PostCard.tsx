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
	const [ showCanvas, setshowCanvas ] = useState(0);
	const showCanvasHandler = () => {
		props.showCanvasHandler();
	};

	return (
		<div className="postCard">
			<div className="UserInfo">
				<div className="UserAvatar">
					<div className="avatar">
						<img
							src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg"
							alt=""
						/>
					</div>
				</div>
				<div className="UserDetails">
					<div className="FullName">Andrea JohnSon</div>
					<div className="UserName">@andrea</div>
					<div className="PostTime">
						<img src="/TimeIcon.svg" alt="" />
						<div className="Time">2 weeks ago</div>
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
