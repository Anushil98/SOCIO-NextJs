import Head from 'next/head';
import React from 'react';

export default function AuthLayout(props) {
	return (
		<div>
			<Head>
				<link rel="preload" href="/fonts/Skranji/Skranji-Bold.ttf" as="font" crossOrigin="" />
				<link rel="preload" href="/fonts/Skranji/Skranji-Regular.ttf" as="font" crossOrigin="" />
				<link rel="preload" href="/fonts/Shanti/Shanti-Regular.ttf" as="font" crossOrigin="" />
				<link rel="icon" href="/Full Logo.svg" />
			</Head>
			{props.children}
		</div>
	);
}
