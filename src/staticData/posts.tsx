import { Post } from '../types/post.type';

export const posts: Post[] = [
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		Media: [
			{ baseurl: '', filename: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg' },
			{
				baseurl: '',
				filename: 'https://i.pinimg.com/originals/d9/de/11/d9de112b2c4aedef6df31d05194adf21.jpg'
			},
			{
				baseurl: '',
				filename:
					'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			}
		],
		postId: '1',
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '2',
		Media: [],
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '3',
		Media: [
			{
				baseurl: '',
				filename:
					'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			{ baseurl: '', filename: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg' }
		],
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '4',
		Media: [],
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '5',
		Media: [
			{
				baseurl: '',
				filename:
					'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			{ baseurl: '', filename: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg' }
		],
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '6',
		Media: [],
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '7',
		Media: [
			{
				baseurl: '',
				filename:
					'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			{ baseurl: '', filename: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg' }
		],
		createdDate: new Date().toString()
	},
	{
		userId: 'abcdwfgkjniuhs',
		User: {
			id: 'abcdwfgkjniuhs',
			avatar: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
			username: 'andrea',
			firstname: 'Andrea',
			lastname: 'JohnSon'
		},
		postId: '8',
		Media: [],
		createdDate: new Date().toString()
	}
];

export const getPostApi = (page: number): Promise<Post[]> => {
	return new Promise((resolve, reject) => {
		const newPosts = posts.slice((page - 1) * 3, page * 3);
		// console.log(newPosts, posts, page, posts.slice((page - 1) * 2, page * 2));
		setTimeout(() => resolve(newPosts), 1000);
	});
};
