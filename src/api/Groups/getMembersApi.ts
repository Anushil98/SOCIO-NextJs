import { users } from "../../staticData/users";
import { User } from "../../types/user.type";

export const getMembersApi= (page: number): Promise<User[]> => {
	return new Promise((resolve, reject) => {
		const Staticusers = users.slice((page - 1) * 3, page * 3);
		setTimeout(() => resolve(Staticusers), 1000);
	});
};
