import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { createGroup } from '../../api/Groups/createGroup';
import ErrorCard from '../ErrorCard';

const Create = styled.div`
	position: fixed;
	z-index: 99999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(10px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 50%;
	position: fixed;
	top: 25%;

	* {
		outline: none;
		font-family: shanti;
	}
`;
const Input = styled.input`
	color: var(--text-color);
	background-color: var(--div-color);
	border: 1px solid var(--text-color);
	border-radius: 4px;
	margin-bottom: 10px;
	height: 168px;
	font-weight: bolder;
	padding-left: 10px;

	::placeholder {
		color: var(--placeholder-color);
	}
`;
const Bio = styled.textarea`
	resize: none;
	color: var(--text-color);
	background-color: var(--div-color);
	border: 1px solid var(--text-color);
	border-radius: 4px;
	font-weight: bolder;
	padding-left: 10px;
	margin-bottom: 10px;
	height: 500px;
	::placeholder {
		color: var(--placeholder-color);
	}
`;
const Button =
	styled.button <
	{ bgColor: string, textColor: string } >
	`
	align-self: center;
	height: 200px;
	width:200px;
	margin: 10px;
	border: 1px solid var(--text-color);
	border-radius:5px;
	background-color:${(props) => {
		return `var(${props.bgColor})`;
	}};
	color:${(props) => {
		return `var(${props.textColor})`;
	}};
	
`;

export default function CreateGroupCard(props: {
	userId: string;
	close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [ GroupName, setGroupName ] = useState<string>(null);
	const [ GroupHandle, setGroupHandle ] = useState<string>(null);
	const [ bio, setbio ] = useState<string>(null);
	const [ showError, setshowError ] = useState<boolean>(null);
	const closeError = () => {
		setshowError((x) => !x);
	};

	const createGroupHandler = async () => {
		try {
			await createGroup(GroupName, GroupHandle, bio);
			Router.reload();
		} catch (err) {
			console.log(err);
			setshowError((x) => !x);
		}
	};

	return (
		<Create>
			<Form>
				<Input
					placeholder="Group Name"
					onChange={(e) => {
						setGroupName(e.currentTarget.value);
					}}
				/>
				<Input
					placeholder="Group Handle"
					onChange={(e) => {
						setGroupHandle(e.currentTarget.value);
					}}
				/>
				<Bio
					placeholder="Group bio"
					onChange={(e) => {
						setbio(e.currentTarget.value);
					}}
				/>
				<Button
					bgColor={'--text-color'}
					textColor={'--div-color'}
					onClick={(e) => {
						e.preventDefault();
						createGroupHandler();
					}}
				>
					Create
				</Button>
				<Button
					textColor={'--text-color'}
					bgColor={'--div-color'}
					onClick={(e) => {
						e.preventDefault();
						props.close((x: boolean) => !x);
					}}
				>
					Cancel
				</Button>
				{showError ? <ErrorCard message="Cannot Create Group" closebutton={closeError} /> : null}
			</Form>
		</Create>
	);
}
