import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		toast.error('AN EXPECTED ERROR OCCURRED!!');
		console.log('Error: ', error);
	}
	return Promise.reject(error);
});

const setJWT = (jwt) => {
	axios.defaults.headers.common['x-auth-token'] = jwt;
};

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJWT,
};
export default http;
