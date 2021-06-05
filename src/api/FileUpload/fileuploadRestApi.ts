import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

export const uploadFiles = async (files: File[]) => {
	try {
		const data = new FormData();
		files.forEach((file) => {
			data.append('files', file);
		});
		console.log(data);

		const config: AxiosRequestConfig = {
			method: 'post',
			url: 'http://localhost:5000/Upload',
			headers: {
				'content-type': 'multipart/form-data'
			},
			data: data
		};

		const response = await axios(config);
		return response.data;
	} catch (err) {
		console.log(err);
		throw new Error('File Upload Error');
	}
};
