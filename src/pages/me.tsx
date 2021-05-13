import Head from 'next/head';
import React from 'react';
import { MainLayout } from '../components/MainLayout';
import Profile from '../components/Profile.tsx/Profile';

export default function me() {
	if (typeof window !== 'undefined') {
		return (
			<MainLayout Middle={<Profile currentUser={true} />}>
				<Head>
					<title>My Profile</title>
				</Head>
			</MainLayout>
		);
	} else return null;
}
