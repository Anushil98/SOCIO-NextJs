import React from 'react';
import styled from 'styled-components';
import { OptionType } from '../../helpers/NavBarContext';
import Top from './Top';

const Create = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 90vh;
	width: 100%;
`;

const Middle = styled.div``;
const Bottom = styled.div`height: 30%;`;

export function CreatePost(props: {
	data: {
		postId?: string;
		userId?: String;
		grpId?: string;
		options?: OptionType;
	};
}) {
	return (
		<Create>
			<Top />
			<Middle />
			<Bottom />
		</Create>
	);
}
