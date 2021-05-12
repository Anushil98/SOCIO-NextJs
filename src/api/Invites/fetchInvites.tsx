import { useEffect, useState } from 'react';
import { invite } from '../../types/invite.type';
import { getInvitesApi } from './getInvites';

export function FetchInvites(page: number): { invites: invite[]; loading: boolean; hasMore: boolean } {
	const [ loading, setloading ] = useState(true);
	const [ hasMore, sethasMore ] = useState(false);
	const [ invites, setinvites ] = useState<invite[]>([]);
	useEffect(
		() => {
			setloading(true);
			getInvitesApi(page).then((invite) => {
				setinvites((prev) => [ ...prev, ...invite ]);
				if (invite.length === 3) {
					sethasMore(true);
				} else if (invite.length < 3) {
					sethasMore(false);
				}
				setloading(false);
			});
		},
		[ page ]
	);
	return { loading, invites, hasMore };
}
