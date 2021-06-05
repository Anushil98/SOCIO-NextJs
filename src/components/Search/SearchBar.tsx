import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
	height: 60px;
	width: 100vw;
	display: flex;
	justify-content: flex-start;
	margin: 10px 5px 10px 0px;
	border: 2px solid var(--div-color);
	background-color: var(--navbar-color);
	align-items: center;

	svg {
		color: var(--text-color);
	}
	img {
		height: 50px;
		width: 50px;
	}
	textarea {
		resize: none;
		border: none;
		width: 100%;
		outline: none;
		padding: 15px 5px 0px 10px;
		font-family: shanti;
		font-size: large;
		background-color: transparent;
		color: var(--color1);

		::placeholder {
			color: var(--color1);
		}
	}
`;
export default function SearchBar(props: {
	type: 'User' | 'Group' | 'All';
	changeValue: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<Bar>
			<img src="/SearchIcon.svg" />
			<textarea
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck="false"
				placeholder={`Search for ${(props.type === 'All' && 'users or groups') ||
					(props.type === 'User' && 'users to invite ') ||
					(props.type === 'Group' && 'groups')}`}
				onChange={(e) => {
					if (e.currentTarget.value.length > 0) props.changeValue(e.currentTarget.value);
				}}
			/>
			<ArrowBackIcon
				fontSize="large"
				onClick={() => {
					console.log('jhuih');
					Router.back();
				}}
			/>

			<Head>
				<title>Search</title>
				<link rel="preload" href="/fonts/Skranji/Skranji-Bold.ttf" as="font" crossOrigin="" />
				<link rel="preload" href="/fonts/Skranji/Skranji-Regular.ttf" as="font" crossOrigin="" />
				<link rel="preload" href="/fonts/Shanti/Shanti-Regular.ttf" as="font" crossOrigin="" />
				<link rel="icon" href="/Full Logo.svg" />
			</Head>
		</Bar>
	);
}
