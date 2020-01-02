import { Login } from './components/Pages/Login/Login';
import { Register } from './components/Pages/Register/Register';
import Forgot from './components/Pages/Forgot/Forgot';
import Forum from './components/Pages/Forum/Forum';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import User from './components/Pages/User/User';

const routes = [
	{
		name: 'Dashboard',
		path: '/',
		component: Dashboard,
	},
	{
		name: 'User',
		path: '/user',
		component: User,
	},
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
	{
		name: 'Forum',
		path: '/forum',
		component: Forum,
	},
];

export default routes;
