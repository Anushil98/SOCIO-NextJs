import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
	height: 60px;
	width: 90vw;
	display: flex;
	justify-content: flex-start;
	margin: 10px 5px 10px 10px;
	border: 2px solid var(--div-color);
	background-color: var(--navbar-color);
	border-radius: 31px 0px 0px 31px;

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
					(props.type === 'All' && 'users ') ||
					(props.type === 'Group' && 'groups')}`}
				onChange={(e) => {
					props.changeValue(e.currentTarget.value);
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
