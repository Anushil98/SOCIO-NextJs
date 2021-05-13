import { useEffect, useState } from 'react';
import { getMembersApi } from '../../../api/Groups/getMembersApi';
import { User } from '../../../types/user.type';

export function FetchMembers(
	page: number,
	grpId: string
): { members: Array<User>; loading: boolean; hasMore: boolean } {
	const [ loading, setloading ] = useState(true);
	const [ hasMore, sethasMore ] = useState(false);
	const [ members, setposts ] = useState([]);
	useEffect(
		() => {
			setloading(true);
			getMembersApi(page).then((members) => {
				setposts((prev) => [ ...prev, ...members ]);
				if (members.length === 3) {
					sethasMore(true);
				} else if (members.length < 3) {
					sethasMore(false);
				}
				setloading(false);
			});
		},
		[ page ]
	);
	return { loading, members, hasMore };
}
