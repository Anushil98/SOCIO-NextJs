import React from 'react';

export default function Navbar(props) {
	return (
		<div className="NavBar">
			<div className="NavBarTop">
				<div className="NavBarTop-Left">
					<img src="/FullLogoVertical.svg" alt="Logo" className="Logo" />
				</div>
				<div className="NavBarTop-Right">
					<img src="/SearchIcon.svg" alt="" className="SearchButton" />
				</div>
			</div>
		</div>
	);
}
