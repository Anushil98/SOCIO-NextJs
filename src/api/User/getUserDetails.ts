import { users } from '../../staticData/users';
import { User } from '../../types/user.type';
export const getUserDetails = async (userId: string): Promise<User> => {
	try {
		const user = users.filter((usr) => usr.id === userId)[0];
		return user;
	} catch (err) {
		throw new Error('User Not Found');
	}
};
