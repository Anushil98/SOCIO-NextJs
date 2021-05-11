import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { MainLayout } from '../../components/MainLayout';

function Profile(props) {
	const [ Posts, setPosts ] = useState(props.posts);
	return <MainLayout Middle={<div>userId based page</div>} />;
}

export async function getServerSideProps(context) {
	let posts;
	const { userId } = context.params;
	console.log(userId);
	const data = JSON.stringify({
		query: `query($userId:String!){
                posts:getUserPosts(userId:$userId){
                    postId
                    userId
                    text
                    Media{
                    filename
                    baseurl
                    }
                    createdDate
                    updateDate
                }
                }`,
		variables: { userId }
	});

	const config: AxiosRequestConfig = {
		method: 'post',
		url: 'http://localhost:5000/graphql',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	try {
		const response = await axios(config);
		posts = response.data.posts;
	} catch (err) {
		console.error(err.message);
	}
	return {
		props: { userId: context.params.userId, posts: posts || null }
	};
}

export default Profile;
