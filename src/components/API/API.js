import axios from "axios";

const basicURL = "https://api.stackexchange.com/2.3";
const pageSize = "10";
export const searchPosts = ({ value, sortValue, orderValue, page = 1 }) => {
	return axios.get(
		`${basicURL}/search?page=${page}&pagesize=${pageSize}&order=${orderValue}&sort=${sortValue}&intitle=${value}&site=stackoverflow`
	);
};
export const pageContent = (questionId) => {
	return axios.get(
		`${basicURL}/questions/${questionId}?&site=stackoverflow&filter=withbody`
	);
};
export const postComments = (questionId) => {
	return axios.get(
		`${basicURL}/questions/${questionId}/comments?&site=stackoverflow&filter=withbody`
	);
};
