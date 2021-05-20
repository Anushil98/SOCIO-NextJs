import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { login } from '../api/User/login';
import addAuthToken from '../helpers/addAuthToken';

export const Login = () => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ success, setSuccessState ] = useState(undefined);

	useEffect(
		() => {
			document.title = `LOGIN ${success === undefined ? '' : success}`;
		},
		[ success ]
	);
	const LoginHandler = () => {
		login(username, password)
			.then((res) => {
				addAuthToken(res);
				Router.push('/');
			})
			.catch((err) => {
				console.error(err);
				setSuccessState('Failed');
			});
	};
	return (
		<div id="Login">
			<div id="LogoMainPage">SOCIO</div>
			<form>
				<div>
					<input
						type="text"
						name="username"
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Email / Username"
					/>
					<input
						type="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
				</div>
				<div>
					<input type="button" onClick={() => LoginHandler()} value="Login" />
				</div>
			</form>
		</div>
	);
};
