import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import checkAuth from '../helpers/checkAuth';
import { FeedPostFetch } from '../helpers/fetchFeedPosts';
import { getDeviceInfo } from '../helpers/getDeviceInfo';

export default function Home(props: { deviceInfo: any }) {
	const [ Layout, setLayout ] = useState(-1);
	const [ page, setpage ] = useState(1);
	// const [ showCanvas, setshowCanvas ] = useState(0);
	// const showCanvasHandler = () => {
	// 	setshowCanvas(showCanvas === 0 ? 1 : 0);
	// };
	// const wrapper = useRef(null);
	// useOutsideAlerter(wrapper);

	if (typeof window !== 'undefined') {
		const { hasMore, loading, posts } = FeedPostFetch(page);
		const observer = useRef(null);
		const lastElement = useCallback(
			(node) => {
				if (loading) return;
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
			[ loading, hasMore ]
		);

		const { deviceInfo } = props;
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
				<Head>
					<title>Login</title>
					{(document.body.style.backgroundColor = 'var(--lightBackground)')}
				</Head>
				<Login />
			</AuthLayout>
		) : Layout === 1 ? (
			<MainLayout
				leftSideBar={deviceInfo === 'mobile' ? null : <Panel feed={false} />}
				Middle={<Panel feed={true} posts={posts} refProp={lastElement} hasMore={hasMore} loading={loading} />}
				rightSideBar={deviceInfo === 'mobile' ? null : <Panel feed={false} />}
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
