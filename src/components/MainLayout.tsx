import React from 'react';
import Navbar from './Navbar';

export const MainLayout = (props) => {
	return (
		<div className="MainLayout">
			<Navbar />
			<div className="ContentArea">
				<div className="leftSideBar">{props.leftSideBar}</div>
				<div className="Middle" id="MidArea">
					{props.Middle}
				</div>
				<div className="rightSideBar">{props.rightSideBar}</div>
			</div>
		</div>
	);
};
