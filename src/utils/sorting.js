export function sorting(items, sortColumn) {
	return items.sort((a, b) => {
		if (sortColumn.order === 'asc') {
			if (sortColumn.path === 'genre.name') {
				return a.genre.name.toLowerCase() > b.genre.name.toLowerCase()
					? 1
					: -1;
			}
			return a[sortColumn.path].toLowerCase() >
				b[sortColumn.path].toLowerCase()
				? 1
				: -1;
		}
		if (sortColumn.path === 'genre.name') {
			return a.genre.name.toLowerCase() < b.genre.name.toLowerCase()
				? 1
				: -1;
		}
		return a[sortColumn.path].toLowerCase() <
			b[sortColumn.path].toLowerCase()
			? 1
			: -1;
	});
}
