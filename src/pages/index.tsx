import React, { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Login } from '../components/login';
import { MainLayout } from '../components/MainLayout';
import Panel from '../components/panelDiv';
import SideCard from '../components/SideCards';
import checkAuth from '../helpers/checkAuth';

export default function Home() {
	const [ Layout, setLayout ] = useState(0);
	useEffect(() => {
		if (checkAuth() === true) {
			setLayout(1);
		}
	});
	return Layout === 0 ? (
		<AuthLayout>
			<Login />
		</AuthLayout>
	) : (
		<MainLayout
			leftSideBar={
				<Panel>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
				</Panel>
			}
			Middle={
				<Panel>
					<SideCard>how are</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
				</Panel>
			}
			rightSideBar={
				<Panel>
					<SideCard>you</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
					<SideCard>hi</SideCard>
				</Panel>
			}
		/>
	);
}
