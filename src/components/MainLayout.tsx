import Link from 'next/link';
export const MainLayout = (props) => {
	return (
		<div className="MainLayout">
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
								<Link href="/error">
									<a className="NavBarButton">College</a>
								</Link>
								<Link href="/error">
									<a className="NavBarButton Mobile">C</a>
								</Link>
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
					</div>
				</div>
			</div>
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
