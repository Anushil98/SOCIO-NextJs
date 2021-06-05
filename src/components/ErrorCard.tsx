import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
	position: absolute;
	color: var(--text-color);
	background-color: var(--error-color);
	align-self: center;
	height: 150px;
	padding: 8px;
	border: 1px solid var(--text-color);
	border-radius: 10px;
	align-items: center;
	display: flex;
	flex-direction: column;
`;
export default function ErrorCard(props: { message: string; closebutton: any }) {
	return (
		<Error
			onClick={() => {
				props.closebutton();
			}}
		>
			<ErrorOutlineIcon fontSize={'large'} />
			<p>{props.message}</p>
		</Error>
	);
}
