import React, { useCallback, useRef, useState } from 'react';
import { IndividualGroupPosts } from '../../../api/Post/IndividualGroupPosts';
import Panel from '../../panelDiv';

export default function GroupPosts(props: { userId: string; grpId: string; children: any }) {
	const [ page, setpage ] = useState(1);
	const { hasMore, loading, posts } = IndividualGroupPosts(page, props.grpId);
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
	return (
		<Panel
			feed={false}
			posts={posts}
			refProp={lastElement}
			hasMore={hasMore}
			loading={loading}
			children={props.children}
		/>
	);
}
