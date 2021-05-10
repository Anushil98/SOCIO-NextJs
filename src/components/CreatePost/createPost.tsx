import React, { useState } from 'react';
import styled from 'styled-components';
import { createPostApi } from '../../api/Post/createPost';
import { LoggedInUserContext } from '../../helpers/LoggedInUserContext';
import { OptionType } from '../../helpers/NavBarContext';
import { PostInput } from '../../types/post.type';
import Top from './Top';

const Create = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 90vh;
	width: 100%;
`;

const Middle = styled.textarea`
	resize: none;
	border: none;
	box-shadow: inset 1px 8px 20px -4px var(--placeholder-color);
	padding: 18px;
	font-family: 'shanti';
	font-size: large;
	outline: 0;
	::placeholder {
		color: var(--placeholder-color);
	}
`;
const Bottom = styled.div`
	height: 30%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 16px;
`;
const PostButton = styled.button`
	height: 50px;
	width: 100px;
	border: none;
	background-color: var(--color1);
	border-radius: 10px;
	color: var(--loader-color);
	font-family: 'shanti';
	font-size: large;
`;

export function CreatePost(props: {
	data: {
		postId?: string;
		userId?: String;
		grpId?: string;
		options?: OptionType;
	};
}) {
	const [ text, settext ] = useState('');
	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		settext(e.target.value);
	};
	const createPost = async (userId: string) => {
		const post: PostInput = { text, userId };
		await createPostApi(post);
	};
	return (
		<LoggedInUserContext.Consumer>
			{(val) => {
				return (
					<Create>
						<Top userId={val} />
						<Middle
							placeholder={'Put down your thoughts!'}
							value={text}
							onChange={(e) => onChangeHandler(e)}
						/>
						<Bottom>
							<PostButton onClick={() => createPost(val)}>Post</PostButton>
						</Bottom>
					</Create>
				);
			}}
		</LoggedInUserContext.Consumer>
	);
}
