import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const LoaderCard = styled.div`
	width: 100vw;
	height: 100px;
	color: var(--div-color);
	display: flex;
	align-items: center;
	justify-content: center;
`;
export default function Loader() {
	return (
		<LoaderCard>
			<CircularProgress color="inherit" />
		</LoaderCard>
	);
}
