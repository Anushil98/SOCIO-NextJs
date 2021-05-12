import { invites } from "../../staticData/invites";
import { invite } from "../../types/invite.type";

export const getInvitesApi = (page: number): Promise<invite[]> => {
	return new Promise((resolve, reject) => {
		const Staticinvites = invites.slice((page - 1) * 3, page * 3);
		setTimeout(() => resolve(Staticinvites), 1000);
	});
};
