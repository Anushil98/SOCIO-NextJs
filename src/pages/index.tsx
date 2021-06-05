import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FeedPostFetch } from '../api/Post/fetchFeedPosts';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import checkAuth from '../helpers/checkAuth';
import { getDeviceInfo } from '../helpers/getDeviceInfo';

export default function Home(props: { deviceInfo: any }) {
	const [ Layout, setLayout ] = useState(-1);
	const [ page, setpage ] = useState(1);
	const [ loggedInUser, setLoggedInUser ] = useState<string>(null);
	// const wrapper = useRef(null);
	// useOutsideAlerter(wrapper);

	if (typeof window !== 'undefined') {
		const { hasMore, feedloading, posts } = FeedPostFetch(page);
		const observer = useRef(null);
		const lastElement = useCallback(
			(node) => {
				if (feedloading) return;
				if (observer.current) {
					observer.current.disconnect();
				}
				observer.current = new IntersectionObserver(
					(entries) => {
						if (entries[0].isIntersecting && hasMore) {
							setpage((x) => x + 1);
						}
					},
					{ root: document.querySelector('body'), threshold: 0.75 }
				);
				if (node) {
					observer.current.observe(node);
				}
			},
			[ feedloading, hasMore ]
		);

		const { deviceInfo } = props;
		useEffect(() => {
			checkAuth().then((res) => {
				const { status, userId } = res;
				if (status) {
					setLoggedInUser(userId);
					setLayout(1);
				} else {
					setLayout(0);
				}
			});
		});
		return Layout === 0 ? (
			<AuthLayout>
				<Head>
					<title>Login</title>
					{(document.body.style.backgroundColor = 'var(--lightBackground)')}
				</Head>
				<Login />
			</AuthLayout>
		) : Layout === 1 ? (
			<MainLayout
				loggedInUser={loggedInUser}
				leftSideBar={deviceInfo === 'mobile' ? null : <Panel feed={false} />}
				Middle={
					<Panel feed={true} posts={posts} refProp={lastElement} hasMore={hasMore} loading={feedloading} />
				}
				rightSideBar={deviceInfo === 'mobile' ? null : <Panel feed={false} />}
				showNavbar={true}
			>
				<Head>
					<title>SOCIO</title>
					{(document.body.style.backgroundColor = 'var(--darkBackground)')}
				</Head>
			</MainLayout>
		) : null;
	}
	return null;
}

export async function getServerSideProps({ req }) {
	const getDeviceInformation = getDeviceInfo(req);

	return {
		props: {
			deviceInfo: getDeviceInformation ? getDeviceInformation : null
		}
	};
}
