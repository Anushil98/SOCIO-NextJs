import React from 'react';
import { Post } from '../types/post.type';
import SideCard from './SideCards';

export default function Panel(props: {
	posts?: Post[];
	children?: any;
	refProp?: any;
	hasMore?: boolean;
	loading?: boolean;
}) {
	return (
		<div className="Panel">
			{props.posts ? (
				props.posts.map((post, index) => {
					if (props.posts.length - 1 === index) {
						return <SideCard key={post.postId} post={post} refProp={props.refProp} />;
					}
					return <SideCard key={post.postId} post={post} />;
				})
			) : null}
			{props.loading ? <SideCard loading={true} key={'Laoding'} /> : null}
			{!props.hasMore && !props.loading ? <SideCard end={true} key={'LastKey'} /> : null}
		</div>
	);
}
