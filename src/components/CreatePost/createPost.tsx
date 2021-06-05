import { CircularProgress } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFilePicker } from 'use-file-picker';
import { uploadFiles } from '../../api/FileUpload/fileuploadRestApi';
import { createPostApi } from '../../api/Post/createPost';
import { CurrentGroupContext } from '../../helpers/CurrentGroupContext';
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
const Mid = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;
const Middle = styled.textarea`
	resize: none;
	border: none;
	box-shadow: inset 1px 8px 20px -4px var(--placeholder-color);
	padding: 18px;
	font-family: 'shanti';
	font-size: large;
	outline: 0;
	width: 100%;
	height: 100%;
	::placeholder {
		color: var(--placeholder-color);
	}
`;
const PreviewArea = styled.div`
	position: absolute;
	bottom: 0;
	height: 100px;
	display: flex;

	img {
		height: 100%;
		width: 100%;
		max-width: 100px;
		border-radius: 10px;
		object-fit: cover;
	}
`;
const Bottom = styled.div`
	height: 30%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 16px;
	padding-left: 16px;
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
		userId?: string;
		grpId?: string;
		options?: OptionType;
	};
}) {
	const [ text, settext ] = useState('');
	let fileBuffers: File[] = [];
	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		settext(e.target.value);
	};

	const createPost = async (userId: string, grpId: string) => {
		const data = await uploadFiles(fileBuffers);

		const post: PostInput = {
			text,
			userId,
			grpId,
			Media: data.map((file) => {
				console.log(file, 'check');
				return { filename: file.uploadfilename, baseurl: '' };
			})
		};
		console.log(props.data, text);
		await createPostApi(post);
		Router.reload();
	};

	const dataURLtoFile = (dataurl: string, filename: string): File => {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([ u8arr ], filename, { type: mime });
	};

	const [ openFileSelector, { filesContent, loading } ] = useFilePicker({
		accept: [ 'image/*' ],
		readAs: 'DataURL',
		multiple: true
	});
	return (
		<CurrentGroupContext.Consumer>
			{(grpId) => {
				return (
					<LoggedInUserContext.Consumer>
						{(val) => {
							console.log(grpId, 'grpId');
							console.log(val, 'userId');
							return (
								<Create>
									<Top userId={val} />
									<Mid>
										<Middle
											placeholder={'Put down your thoughts!'}
											value={text}
											onChange={(e) => onChangeHandler(e)}
										/>
										{!loading ? filesContent ? (
											<PreviewArea>
												{filesContent.map((file, index) => {
													console.log(file.name);
													fileBuffers = [
														...fileBuffers,
														dataURLtoFile(file.content, file.name)
													];
													return <img key={index} src={file.content} />;
												})}
											</PreviewArea>
										) : null : null}
									</Mid>

									<Bottom>
										<AttachFileIcon onClick={() => openFileSelector()} />
										{loading ? <CircularProgress /> : null}
										<PostButton onClick={() => createPost(val, grpId)}>Post</PostButton>
									</Bottom>
								</Create>
							);
						}}
					</LoggedInUserContext.Consumer>
				);
			}}
		</CurrentGroupContext.Consumer>
	);
}
