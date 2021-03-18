import axios, { AxiosRequestConfig } from 'axios';
import Router from 'next/router';
import { useEffect, useState } from 'react';

export const Login = () => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ success, setSuccessState ] = useState(undefined);

	useEffect(
		() => {
			document.title = `LOGIN ${success === undefined ? '' : success ? 'Success' : 'Failed'}`;
		},
		[ username, success ]
	);
	const login = async () => {
		// console.log('Yohhoo');
		const data = JSON.stringify({
			query: `mutation{
            login(
                email:"${username}",
                password:"${password}"
            ){
                accessToken
                refreshAccessToken
                userId 
            }
            }`,
			variables: {}
		});

		const config: AxiosRequestConfig = {
			method: 'post',
			url: process.env.NEXT_PUBLIC_SERVER_URL,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		try {
			const response = await axios(config);
			// console.log(JSON.stringify(response.data));
			setSuccessState(response.data.data.login !== null ? true : false);
			if (response.data.data && response.data.data.login) {
				localStorage.setItem('Authentication', response.data.data.login.accessToken);
				Router.push('/HomePage');
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<form>
				<label>Enter Username:</label>
				<br />
				<input name="username" onChange={(e) => setUsername(e.target.value)} />
				<br />
				<label>Enter Password</label>
				<br />
				<input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
				<br />
				<input type="button" onClick={() => login()} value="Login" />
			</form>
		</div>
	);
};
