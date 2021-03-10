import React, { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import PostCard from '../components/PostCard';
import SideCard from '../components/SideCards';
import checkAuth from '../helpers/checkAuth';

export default function Home() {
	const [ Layout, setLayout ] = useState(0);
	// const wrapper = useRef(null);
	// useOutsideAlerter(wrapper);
	useEffect(() => {
		if (checkAuth() === true) {
			setLayout(1);
		}
	});
	return Layout === 0 ? (
		<AuthLayout>
			<Login />
		</AuthLayout>
	) : (
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
							post={{
								user: { FirstName: 'Anushil', LastName: 'Ghosh Dastidar' },
								postDetails: {
									text: 'This is a post',
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
		/>
	);
}
