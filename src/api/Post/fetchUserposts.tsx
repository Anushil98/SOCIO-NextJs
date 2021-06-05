import { useEffect, useState } from 'react';
import { Post } from '../../types/post.type';
import { getUserPosts } from './getUserPostApi';

export function UserPostsFetch(
	page: number,
	userId: string
): { posts: Array<Post>; feedloading: boolean; hasMore: boolean } {
	const [ loading, setloading ] = useState(true);
	const [ hasMore, sethasMore ] = useState(false);
	const [ posts, setposts ] = useState([]);
	useEffect(
		() => {
			setloading(true);
			getUserPosts(page, userId).then((posts) => {
				setposts((prev) => [ ...prev, ...posts ]);
				if (posts.length === 3) {
					sethasMore(true);
				} else if (posts.length < 3) {
					sethasMore(false);
				}
				setloading(false);
			});
		},
		[ page ]
	);
	return { feedloading: loading, posts, hasMore };
}
