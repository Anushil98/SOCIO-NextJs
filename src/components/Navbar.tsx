import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

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
							<div className="NavBarButton">
								<PeopleAltIcon fontSize="large" />
								<span>Groups</span>
							</div>

							<div className="NavBarButton Mobile">
								<PeopleAltIcon fontSize="large" />
							</div>
						</div>
					</div>
				</div>
				<div className="NavBar-Buttons-Sub">
					<div>
						<div className="NavBarButton">
							<SearchIcon fontSize="large" />
							<span>Search</span>
						</div>

						<div className="NavBarButton Mobile">
							<SearchIcon fontSize="large" />
						</div>
					</div>
				</div>
				<div id="createPost-Button" onClick={() => props.showCreatePostModal()}>
					<AddIcon fontSize="large" />
				</div>
				<div className="NavBar-Buttons-Sub">
					<div>
						<div className="NavBarButton">
							<NotificationsIcon fontSize="large" />
							<span>Notifications</span>
						</div>

						<div className="NavBarButton Mobile">
							<NotificationsIcon fontSize="large" />
						</div>
					</div>
				</div>
				<div className="NavBar-Buttons-Sub">
					<div>
						<div className="NavBarButton">
							<PersonIcon fontSize="large" />
							<span>Profile</span>
						</div>

						<div className="NavBarButton Mobile">
							<PersonIcon fontSize="large" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
