import http from './httpService';
import config from '../config/config.json';
import jwtDecode from 'jwt-decode';

const endPointapi = config.apiUrl + '/auth';

const login = async (username, password) => {
	const { data: jwt } = await http.post(endPointapi, {
		email: username,
		password,
	});
	localStorage.setItem('token', jwt);
};

const logout = () => {
	localStorage.removeItem('token');
};
const getCurrentUser = () => {
	const getToken = localStorage.getItem('token');
	if (getToken) return jwtDecode(getToken);
	return null;
};
const loginWithJwt = (jwt) => {
	localStorage.setItem('token', jwt);
};

const auth = { login, loginWithJwt, logout, getCurrentUser };
export default auth;
