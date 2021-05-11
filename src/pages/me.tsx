import React from 'react';
import { MainLayout } from '../components/MainLayout';
import Profile from '../components/Profile.tsx/Profile';

export default function me() {
	return <MainLayout Middle={<Profile />} />;
}
