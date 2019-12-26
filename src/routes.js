import { Login } from './components/Pages/Login/Login';
import { Register } from './components/Pages/Register/Register';
import Forgot from './components/Pages/Forgot/Forgot';

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
	{
		name: 'Forgot',
		path: '/forgot',
		component: Forgot,
	},
];

export default routes;
