import http from './httpService';
import config from '../config/config.json';

const endPointApi = config.apiUrl + '/movies';

export function getMovies() {
	return http.get(endPointApi);
}
export function getMovie(id) {
	return http.get(endPointApi + '/' + id);
}
export function saveMovie(movie) {
	const body = { ...movie };
	delete body._id;
	if (movie._id.trim() !== '') {
		return http.put(endPointApi + '/' + movie._id, body);
	}
	return http.post(endPointApi, body);
}

export function deleteMovie(movie) {
	return http.delete(endPointApi + '/' + movie._id);
}
