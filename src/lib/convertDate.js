export const convertDate = (string_date, addTime = true) => {
	let date_string = new Date(string_date);

	let date = date_string.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	if (addTime) {
		let time = date_string.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});
		return `${date} at ${time}`;
	}
	return date;
};
