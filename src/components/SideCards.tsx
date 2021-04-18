import React from 'react';
import { Post } from '../types/post.type';
import PostCard from './PostCard';

export default function SideCard(props: {
	post?: Post;
	end?: boolean;
	children?: any;
	refProp?: any;
	loading?: boolean;
}) {
	return (
		<div className="SideCard">
			{props.post ? props.refProp ? (
				<PostCard post={props.post} refProp={props.refProp} />
			) : (
				<PostCard post={props.post} />
			) : null}
			{props.loading ? <div className="FeedEnd">Loading</div> : null}
			{props.end ? <div className="FeedEnd">You have reached the end of your feed</div> : null}
		</div>
	);
}
