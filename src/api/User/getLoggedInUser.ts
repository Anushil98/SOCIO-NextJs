import { users } from '../../staticData/users';
import { User } from '../../types/user.type';
export const getLoggedInUser = async (): Promise<User> => {
	try {
		const user = users.filter((usr) => usr.id === 'abcd')[0];
		return user;
	} catch (err) {
		throw new Error('User Not Found');
	}
};
