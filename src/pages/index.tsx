import React, { useCallback, useEffect, useRef, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import SideCard from '../components/SideCards';
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
		// console.log(hasMore, loading, posts);
		const observer = useRef(null);
		const lastElement = useCallback(
			(node) => {
				// console.log(node, loading, hasMore, observer.current);
				if (loading) return;
				if (observer.current) {
					// console.log('disconnecting');
					observer.current.disconnect();
				}
				observer.current = new IntersectionObserver(
					(entries) => {
						// console.log(entries, 'this is entry', hasMore);
						if (entries[0].isIntersecting && hasMore) {
							// console.log('visible');
							setpage((x) => x + 1);
						}
					},
					{ root: document.querySelector('body'), threshold: 0.75 }
				);
				if (node) {
					// console.log('observing', node);
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
				Middle={<Panel posts={posts} refProp={lastElement} hasMore={hasMore} loading={loading} />}
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
