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
					<SideCard>hi</SideCard>
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
												'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
											id: 1
										},
										{
											url:
												'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
											id: 2
										},
										{
											url:
												'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
											id: 3
										},
										{
											url:
												'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
											id: 4
										}
									]
								}
							}}
						/>
					</SideCard>
					<SideCard>hi</SideCard>
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
