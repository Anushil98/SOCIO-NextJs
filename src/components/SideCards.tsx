import React from 'react';
import { Post } from '../types/post.type';
import PostCard from './PostCard';

export default function SideCard(props: { post?: Post; children?: any }) {
	return (
		<div className="SideCard">
			<PostCard post={props.post} />
		</div>
	);
}
