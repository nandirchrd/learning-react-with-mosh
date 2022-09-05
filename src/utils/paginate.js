export default function paginate(items, currentPage, pageSize) {
	if (!Array.isArray(items)) return [];
	const indexStart = (currentPage - 1) * pageSize;
	const indexEnd = indexStart + pageSize;

	console.log(indexStart, indexEnd);
	return [...items].slice(indexStart, indexEnd);
}
