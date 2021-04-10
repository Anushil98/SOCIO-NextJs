import React, { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import SideCard from '../components/SideCards';
import checkAuth from '../helpers/checkAuth';
import { getDeviceInfo } from '../helpers/getDeviceInfo';
import { Post } from '../types/post.type';

export default function Home(props: { deviceInfo: any; posts: Post[] }) {
	const [ Layout, setLayout ] = useState(-1);
	const [ showCanvas, setshowCanvas ] = useState(0);
	const showCanvasHandler = () => {
		setshowCanvas(showCanvas === 0 ? 1 : 0);
	};
	// const wrapper = useRef(null);
	// useOutsideAlerter(wrapper);
	const { deviceInfo, posts } = props;
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
				deviceInfo === 'mobile' ? null : (
					<Panel>
						<SideCard>
							<div>click me</div>
						</SideCard>
						<SideCard>hi</SideCard>
						<SideCard>hi</SideCard>
					</Panel>
				)
			}
			Middle={<Panel posts={posts} />}
			rightSideBar={
				deviceInfo === 'mobile' ? null : (
					<Panel>
						<SideCard>you</SideCard>
						<SideCard>hi</SideCard>
						<SideCard>hi</SideCard>
						<SideCard>hi</SideCard>
					</Panel>
				)
			}
		/>
	) : null;
}

export async function getServerSideProps({ req }) {
	const getDeviceInformation = getDeviceInfo(req);
	const posts: Post[] = [
		{
			userId: 'abcdwfgkjniuhs',
			User: {
				id: 'abcdwfgkjniuhs',
				avatar:
					'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
				username: 'andrea',
				firstname: 'Andrea',
				lastname: 'JohnSon'
			},
			Media: [
				{ baseurl: '', filename: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg' },
				{
					baseurl: '',
					filename: 'https://i.pinimg.com/originals/d9/de/11/d9de112b2c4aedef6df31d05194adf21.jpg'
				},
				{
					baseurl: '',
					filename:
						'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
				}
			],
			postId: 'kjjkojoljpoi',
			createdDate: new Date().toString()
		},
		{
			userId: 'abcdwfgkjniuhs',
			User: {
				id: 'abcdwfgkjniuhs',
				avatar:
					'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
				username: 'andrea',
				firstname: 'Andrea',
				lastname: 'JohnSon'
			},
			postId: 'kjjkojoljpoi',
			Media: [],
			createdDate: new Date().toString()
		}
	];
	return {
		props: {
			deviceInfo: getDeviceInformation ? getDeviceInformation : null,
			posts
		}
	};
}
