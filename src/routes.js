import { Login } from './components/Pages/Login/Login';
import { Register } from './components/Pages/Register/Register';

const routes = [
	{
		name: 'Login',
		path: '/login',
		component: Login,
	},
	{
		name: 'Register',
		path: '/register',
		component: Register,
	},
];

export default routes;
