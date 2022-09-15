import http from './httpService';
import config from '../config/config.json';

const endPointapi = config.apiUrl + '/users';

export const register = (user) => {
	return http.post(endPointapi, {
		email: user.username,
		password: user.password,
		name: user.name,
	});
};

export default { register };
