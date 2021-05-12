import { invite, InviteStateEnum } from '../types/invite.type';

export const invites: invite[] = [
	{
		grpId: '1',
		InviteId: '1',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Accepted,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '2',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Pending,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '3',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Rejected,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '4',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Rejected,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '5',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Rejected,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '6',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Rejected,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '7',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Rejected,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	},
	{
		grpId: '1',
		InviteId: '8',
		hostId: 'abcd',
		Host: {
			id: 'abcd',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			firstname: 'Andrea',
			lastname: 'JohnSon',
			username: 'andrea'
		},
		InviteState: InviteStateEnum.Rejected,
		createdDate: new Date(),
		guestId: 'abcde',
		Group: {
			grpId: '1',
			grpBio: 'This is a bio',
			grpName: 'LearnWithME',
			grpHandle: 'learnWithMe',
			ownerId: 'abcd',
			createdDate: new Date()
		}
	}
];
