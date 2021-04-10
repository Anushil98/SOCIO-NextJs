import React from 'react';
import { Post } from '../types/post.type';
import SideCard from './SideCards';

export default function Panel(props: { posts?: Post[]; children?: any }) {
	return <div className="Panel">{props.posts ? props.posts.map((post) => <SideCard post={post} />) : null}</div>;
}
