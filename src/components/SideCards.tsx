import React from 'react';
import { Post } from '../types/post.type';
import PostCard from './PostCard';

export default function SideCard(props: { post?: Post; end?: boolean; children?: any }) {
	return (
		<div className="SideCard">
			{props.post ? <PostCard post={props.post} /> : null}
			{props.end ? <div className="FeedEnd">You have reached the end of your feed</div> : null}
		</div>
	);
}
