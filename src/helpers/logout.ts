
export default function logout() {
	localStorage.removeItem('Authentication');
	window.location.href = "/";
}
