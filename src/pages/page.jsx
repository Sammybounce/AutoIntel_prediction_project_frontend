export const baseUrl = "http://127.0.0.1:1000";

export const convertStringToCurrencyString = (str) => {
	return `$${str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const convertDate = (dateTimeZone) => {
	const date = new Date(Date.parse(dateTimeZone));
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);
	const hour = `0${date.getHours()}`.slice(-2);
	const minute = `0${date.getMinutes()}`.slice(-2);

	return `${year}/${month}/${day} ${hour}:${minute}`;
};
