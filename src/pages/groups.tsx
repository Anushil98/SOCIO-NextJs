import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import Groups from '../components/Group/Groups';
import { MainLayout } from '../components/MainLayout';
import checkAuth from '../helpers/checkAuth';

export default function groups() {
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
				<MainLayout loggedInUser={LoggedInUser} Middle={<Groups />}>
					<Head>
						<title>My Groups</title>
					</Head>
				</MainLayout>
			);
		else return null;
	} else return null;
}
