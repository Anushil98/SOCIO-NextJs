import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import React, { useRef } from 'react';
import { OptionType } from '../helpers/NavBarContext';
import useOutsideAlerter from '../helpers/outsideClick';
import { CreatePost } from './CreatePost/createPost';

export default function Navbar(props: {
	data: {
		postId?: string;
		userId?: string;
		grpId?: string;
		options?: OptionType;
	};
	showNavBar?: boolean;
	changeOptions: (data: { postId?: string; userId?: string; grpId?: string; options?: OptionType }) => void;
	showSideBar: React.Dispatch<React.SetStateAction<number>>;
}) {
	// const [ options, setoptions ] = useState(undefined);

	const wrapper = useRef(null);
	useOutsideAlerter(wrapper, props.changeOptions);
	return (
		<div className="NavBar">
			<div className="NavBarTop">
				<div className="NavBarTop-Left">
					<MenuIcon fontSize="large" onClick={() => props.showSideBar((x) => (x ? 0 : 1))} />
					<img src="/FullLogoVertical.svg" alt="Logo" className="Logo" />
				</div>
				<div className="NavBarTop-Right">
					<img
						src="/SearchIcon.svg"
						alt=""
						className="SearchButton"
						onClick={() => {
							Router.push('/search');
						}}
					/>
				</div>
			</div>
			{props.showNavBar ? (
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
							<img src="/Full Logo.svg" className="rotateCross" />
						</div>
					) : (
						<div
							className="ShowBottomBar"
							key="for"
							onClick={() => {
								props.changeOptions({
									userId: props.data.userId,
									grpId: props.data.grpId,
									options: OptionType.CreatePost
								});
							}}
						>
							<img src="/Full Logo.svg" />
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
			) : null}
		</div>
	);
}
