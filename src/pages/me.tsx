import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import Profile from '../components/Profile.tsx/Profile';
import checkAuth from '../helpers/checkAuth';

export default function me() {
	if (typeof window !== 'undefined') {
		const [ LoggedInUser, setLoggedInUser ] = useState(null);
		useEffect(() => {
			checkAuth().then((res) => {
				const { status, userId } = res;
				if (status) {
					setLoggedInUser(userId);
				} else {
					Router.push('/');
				}
			});
		});
		if (LoggedInUser)
			return (
				<MainLayout loggedInUser={LoggedInUser} Middle={<Profile currentUser={true} userId={LoggedInUser} />}>
					<Head>
						<title>My Profile</title>
					</Head>
				</MainLayout>
			);
		else return null;
	} else return null;
}
