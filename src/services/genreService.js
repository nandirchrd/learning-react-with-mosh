import http from './httpService';

const endPointApi = '/genres';

export function getGenres() {
	return http.get(endPointApi);
}
