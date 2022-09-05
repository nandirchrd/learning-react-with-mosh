export function sorting(items, sortColumn) {
	return items.sort((a, b) => {
		if (sortColumn.order === 'asc') {
			if (sortColumn.path === 'genre.name') {
				return a.genre.name > b.genre.name ? 1 : -1;
			}
			return a[sortColumn.path] > b[sortColumn.path] ? 1 : -1;
		}
		if (sortColumn.path === 'genre.name') {
			return a.genre.name < b.genre.name ? 1 : -1;
		}
		return a[sortColumn.path] < b[sortColumn.path] ? 1 : -1;
	});
}
