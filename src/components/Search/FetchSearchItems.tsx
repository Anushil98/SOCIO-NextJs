import { useEffect, useState } from 'react';
import { searchApi } from '../../api/search/getSearchResults';
import { Group } from '../../types/group.type';
import { User } from '../../types/user.type';

export function FetchSearchItems(
	page: number,
	type: 'All' | 'User' | 'Group',
	searchText: string,
	flush: boolean,
	grpId?: string
): { items: { group: Group; user: User }[]; loading: boolean; hasMore: boolean } {
	const [ loading, setloading ] = useState(true);
	const [ hasMore, sethasMore ] = useState(false);
	const [ items, setgroups ] = useState<{ group: Group; user: User }[]>([]);
	useEffect(
		() => {
			if (flush) {
				setgroups([]);
			} else {
				setloading(true);

				searchApi(page, type, searchText, grpId).then((group) => {
					setgroups((prev) => [ ...prev, ...group ]);

					if (group.length === 3) {
						sethasMore(true);
					} else if (group.length < 3) {
						sethasMore(false);
					}
					setloading(false);
				});
			}
		},
		[ page, searchText, flush ]
	);

	return { loading, items, hasMore };
}
