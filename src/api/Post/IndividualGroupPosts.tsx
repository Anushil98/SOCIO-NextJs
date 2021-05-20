import { useEffect, useState } from 'react';
import { Post } from '../../types/post.type';
import { getGroupPosts } from './getGroupPosts';

export function IndividualGroupPosts(
	page: number,
	grpId: string
): { posts: Array<Post>; loading: boolean; hasMore: boolean } {
	const [ loading, setloading ] = useState(true);
	const [ hasMore, sethasMore ] = useState(false);
	const [ posts, setposts ] = useState([]);
	useEffect(
		() => {
			setloading(true);
			getGroupPosts(grpId, page).then((posts) => {
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
	return { loading, posts, hasMore };
}
