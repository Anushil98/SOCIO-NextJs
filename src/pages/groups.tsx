import React from 'react';
import Groups from '../components/Group/Groups';
import { MainLayout } from '../components/MainLayout';

export default function groups() {
	return <MainLayout Middle={<Groups />} />;
}
