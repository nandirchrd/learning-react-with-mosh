import http from './httpService';

const endPointapi = '/users';

export const register = (user) => {
	return http.post(endPointapi, {
		email: user.username,
		password: user.password,
		name: user.name,
	});
};

export default { register };
