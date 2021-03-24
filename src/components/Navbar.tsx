import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import React from 'react';
import logout from '../helpers/logout';

export default function Navbar(props) {
	return (
		<div className="NavBar">
			<div className="NavBar-left">
				<div>SOCIO</div>
			</div>
			<div className="NavBar-Right">
				<div className="NavBar-Buttons-Sub">
					<div>
						<div>
							<Link href="/error">
								<a className="NavBarButton">College</a>
							</Link>
							<Link href="/error">
								<a className="NavBarButton Mobile">C</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="NavBar-Buttons-Sub">
					<div>
						<Link href="/error">
							<a className="NavBarButton">Profile</a>
						</Link>
						<Link href="/error">
							<a className="NavBarButton Mobile">P</a>
						</Link>
					</div>
				</div>
				<div id="createPost-Button" onClick={() => props.showCreatePostModal()}>
					<AddIcon fontSize="large" />
				</div>
				<div className="NavBar-Buttons-Sub">
					<div>
						<Link href="/error">
							<a className="NavBarButton">Settings</a>
						</Link>
						<Link href="/error">
							<a className="NavBarButton Mobile">S</a>
						</Link>
					</div>
				</div>
				<div className="NavBar-Buttons-Sub">
					<div>
						<div>
							<button
								className="NavBarButton"
								onClick={() => {
									logout();
								}}
							>
								Logout
							</button>

							<button
								className="NavBarButton Mobile"
								onClick={() => {
									logout();
								}}
							>
								L
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
