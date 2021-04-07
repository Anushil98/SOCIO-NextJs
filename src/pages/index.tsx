import React, { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import PostCard from '../components/PostCard';
import SideCard from '../components/SideCards';
import checkAuth from '../helpers/checkAuth';

export default function Home() {
	const [ Layout, setLayout ] = useState(-1);
	const [ showCanvas, setshowCanvas ] = useState(0);
	const showCanvasHandler = () => {
		// console.log('yo');
		setshowCanvas(showCanvas === 0 ? 1 : 0);
	};
	// const wrapper = useRef(null);
	// useOutsideAlerter(wrapper);
	useEffect(() => {
		if (checkAuth() === true) {
			setLayout(1);
		}
		if (!checkAuth()) {
			setLayout(0);
		}
	});
	return Layout === 0 ? (
		<AuthLayout>
			<Login />
		</AuthLayout>
	) : Layout === 1 ? (
		<MainLayout
			leftSideBar={
				<Panel>
					<SideCard>
						<div>click me</div>
					</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
				</Panel>
			}
			Middle={
				<Panel>
					<SideCard>
						<PostCard
							showCanvasHandler={showCanvasHandler}
							post={{
								postId: 'kajhkjh',
								user: {
									FirstName: 'Anushil',
									LastName: 'Ghosh Dastidar',
									username: 'agashi',
									id: 'someid'
								},
								postDetails: {
									text:
										'This is a post which is a very long post and it has to be a very long post because it is important forn the comany to grow.',
									media: [
										{
											url:
												'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
											id: 1
										},
										{
											url:
												'https://resi.ze-robot.com/dl/mo/moon-background-from-the-50k-shot-mosaic-1280%C3%97800.jpg',
											id: 2
										}
										// {
										// 	url:
										// 		'https://resi.ze-robot.com/dl/mo/moon-background-from-the-50k-shot-mosaic-1280%C3%97800.jpg',
										// 	id: 3
										// },
										// {
										// 	url:
										// 		'https://resi.ze-robot.com/dl/mo/moon-background-from-the-50k-shot-mosaic-1280%C3%97800.jpg',
										// 	id: 4
										// }
									]
								}
							}}
						/>
					</SideCard>
					<SideCard>
						<PostCard
							showCanvasHandler={showCanvasHandler}
							post={{
								user: { FirstName: 'Anushil', LastName: 'Ghosh Dastidar' },
								postDetails: {
									text: 'This is a post',
									media: [
										{
											url:
												'https://resi.ze-robot.com/dl/mo/moon-background-from-the-50k-shot-mosaic-1280%C3%97800.jpg',
											id: 1
										},
										{
											url:
												'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
											id: 2
										},
										{
											url:
												'https://resi.ze-robot.com/dl/mo/moon-background-from-the-50k-shot-mosaic-1280%C3%97800.jpg',
											id: 3
										}
										// {
										// 	url:
										// 		'https://resi.ze-robot.com/dl/mo/moon-background-from-the-50k-shot-mosaic-1280%C3%97800.jpg',
										// 	id: 4
										// }
									]
								}
							}}
						/>
					</SideCard>
					<SideCard>hi</SideCard>
				</Panel>
			}
			rightSideBar={
				<Panel>
					<SideCard>you</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
				</Panel>
			}
		>
			{/* <Canvas show={showCanvas} />
			<div id="canvas-cancel">
				<CancelOutlined
					onClick={() => showCanvasHandler()}
					style={{ display: showCanvas ? 'block' : 'none', height: '50px', width: '50px' }}
				/>
			</div> */}
		</MainLayout>
	) : null;
}
