import { useEffect, useState } from 'react';
import { getMyGroupsApi } from '../../api/Groups/getMyGroups';
import { Group } from '../../types/group.type';

export function FetchGroups(page: number): { groups: Group[]; loading: boolean; hasMore: boolean } {
	const [ loading, setloading ] = useState(true);
	const [ hasMore, sethasMore ] = useState(false);
	const [ groups, setgroups ] = useState<Group[]>([]);
	useEffect(
		() => {
			setloading(true);
			getMyGroupsApi(page).then((group) => {
				setgroups((prev) => [ ...prev, ...group ]);
				if (group.length === 3) {
					sethasMore(true);
				} else if (group.length < 3) {
					sethasMore(false);
				}
				setloading(false);
			});
		},
		[ page ]
	);
	return { loading, groups, hasMore };
}
