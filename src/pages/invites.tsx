import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import Invite from '../components/Invite/Invite';
import { MainLayout } from '../components/MainLayout';
import checkAuth from '../helpers/checkAuth';

export default function invites() {
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
				<MainLayout Middle={<Invite />} showNavbar={false} loggedInUser={LoggedInUser}>
					<Head>
						<title>My Invites</title>
					</Head>
				</MainLayout>
			);
		else return null;
	} else return null;
}
