import Link from 'next/link';
import React from 'react';
import logout from '../helpers/logout';

export default function Navbar() {
	return (
		<div className="NavBar">
			<div className="NavBar-left">
				<div>
					<div>SOCIO</div>
				</div>
			</div>
			<div className="NavBar-Right">
				<div className="NavBar-Buttons">
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
		</div>
	);
}
