import { Groups } from "../../staticData/groups";
import { Group } from "../../types/group.type";

export const getMyGroupsApi= (page: number): Promise<Group[]> => {
	return new Promise((resolve, reject) => {
		const Staticgroups = Groups.slice((page - 1) * 3, page * 3);
		setTimeout(() => resolve(Staticgroups), 1000);
	});
};
