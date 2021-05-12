import React from 'react';
import Invite from '../components/Invite/Invite';
import { MainLayout } from '../components/MainLayout';

export default function invites() {
	return <MainLayout Middle={<Invite />} />;
}
