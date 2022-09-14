import http from './httpService';
import config from '../config/config.json';

const endPointApi = config.apiUrl + '/genres';

export function getGenres() {
	return http.get(endPointApi);
}
