import axios from 'axios'

const $host = axios.create({
	baseURL: 'https://mycar-x95z.onrender.com/api',
})
const $authHost = axios.create({
	baseURL: 'https://mycar-x95z.onrender.com/api',
})
const authInterceptor = config => {
	config.headers.authorization = `Bearer ${JSON.parse(
		localStorage.getItem('token')
	)}`
	return config
}
$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
