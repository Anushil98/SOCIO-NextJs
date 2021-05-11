import { posts } from '../../staticData/posts';
import { users } from '../../staticData/users';
import { PostInput } from '../../types/post.type';
import { User } from '../../types/user.type';

export const createPostApi = async (data: PostInput) => {
	try {
		const { text, userId } = data;
		const user: User = users.filter((usr) => usr.id === userId)[0];
		posts.unshift({ postId: `${posts.length}`, userId, text, User: user, createdDate: new Date().toISOString() });
		console.log(posts[posts.length]);
	} catch (err) {
		throw new Error('Post Creation Failed');
	}
};
