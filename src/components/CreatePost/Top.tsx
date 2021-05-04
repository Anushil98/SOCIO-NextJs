import React, { useState } from 'react';
import styled from 'styled-components';
import UserLoader from '../Loaders/UserLoader';

const TopPart = styled.div`
	height: 30%;
	margin-top: 15px;
`;

const UserInfo = styled.div``;
export default function Top() {
	const [ showLoader, setshowLoader ] = useState(true);
	return (
		<TopPart>
			{showLoader ? <UserLoader /> : null}
			{!showLoader ? <UserInfo /> : null}
		</TopPart>
	);
}
