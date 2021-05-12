import { posts } from "../../staticData/posts";
import { Post } from "../../types/post.type";

export const getPostApi = (page: number): Promise<Post[]> => {
	return new Promise((resolve, reject) => {
		const newPosts = posts.slice((page - 1) * 3, page * 3);
		setTimeout(() => resolve(newPosts), 1000);
	});
};
