import React, { useRef } from 'react';
import logout from '../helpers/logout';
import { OptionType } from '../helpers/NavBarContext';
import useOutsideAlerter from '../helpers/outsideClick';
import { CreatePost } from './CreatePost/createPost';

export default function Navbar(props: {
	data: {
		postId?: string;
		userId?: String;
		grpId?: string;
		options?: OptionType;
	};
	changeOptions: (data: { postId?: string; userId?: string; grpId?: string; options?: OptionType }) => void;
}) {
	// const [ options, setoptions ] = useState(undefined);

	const wrapper = useRef(null);
	useOutsideAlerter(wrapper, props.changeOptions);
	return (
		<div className="NavBar">
			<div className="NavBarTop">
				<div className="NavBarTop-Left">
					<img src="/FullLogoVertical.svg" alt="Logo" className="Logo" onClick={() => logout()} />
				</div>
				<div className="NavBarTop-Right">
					<img src="/SearchIcon.svg" alt="" className="SearchButton" />
				</div>
			</div>
			<div className="NavBarBottom">
				{props.data.options && <div className="ShowHaze" />}
				{props.data.options !== undefined ? (
					<div
						className="ShowBottomBar"
						key="rev"
						onClick={() => {
							props.changeOptions({ options: undefined });
						}}
					>
						<img src="./Full Logo.svg" className="rotateCross" />
					</div>
				) : (
					<div
						className="ShowBottomBar"
						key="for"
						onClick={() => {
							props.changeOptions({ userId: 'abcd', options: OptionType.CreatePost });
						}}
					>
						<img src="./Full Logo.svg" />
					</div>
				)}
				<div className="BottomBarMain" ref={wrapper}>
					{(props.data.options === 'postoptions' && (
						<div className="PostOptions">
							<div className="DeletePost">Delete</div>
							<div className="SharePost">Share</div>
							<div className="ReportPost">Report</div>
						</div>
					)) ||
						(props.data.options === 'createpost' && <CreatePost data={props.data} />)}
				</div>
			</div>
		</div>
	);
}
