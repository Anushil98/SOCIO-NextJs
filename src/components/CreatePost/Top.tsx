import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserDetails } from '../../api/User/getUserDetails';
import { User } from '../../types/user.type';
import UserLoader from '../Loaders/UserLoader';
import UserDetails from './userDetails';

const TopPart = styled.div`
	height: 30%;
	margin-top: 15px;
`;

function Top(props: { userId: string }) {
	const [ showLoader, setshowLoader ] = useState(true);
	const [ user, setuser ] = useState<User>(null);

	useEffect(() => {
		if (user === null)
			getUserDetails(props.userId).then((user) => {
				setuser(user);
				setshowLoader(false);
			});
	});
	return (
		<TopPart>
			{showLoader ? <UserLoader /> : null}
			{!showLoader ? <UserDetails user={user} /> : null}
		</TopPart>
	);
}

export default React.memo(Top);
