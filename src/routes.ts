import { Login } from './components/Pages/Login/Login';
import { Register } from './components/Pages/Register/Register';
import Forgot from './components/Pages/Forgot/Forgot';
import Forum from './components/Pages/Forum/Forum';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import User from './components/Pages/User/User';
import EditProfile from './components/Pages/EditProfile/EditProfile';
import Admin from './components/Pages/Admin/Admin';
import Records from './components/Pages/Records';
import About from './components/Pages/About';
import POTD from './components/Pages/POTD';
import JugglingTools from './components/Pages/JugglingTools/JugglingTools';
import SiteswapTools from './components/Pages/SiteswapTools/SiteswapTools';

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Dashboard,
		hidden: false,
	},
	{
		name: 'User',
		path: '/user',
		component: User,
		hidden: true,
	},
	{
		name: 'Login',
		path: '/login',
		component: Login,
		hidden: true,
	},
	{
		name: 'Register',
		path: '/register',
		component: Register,
		hidden: true,
	},
	{
		name: 'Forgot',
		path: '/forgot',
		component: Forgot,
		hidden: true,
	},
	{
		name: 'About',
		path: '/about',
		component: About,
		hidden: false,
	},
	{
		name: 'Forum',
		path: '/forum',
		component: Forum,
		hidden: false,
	},
	{
		name: 'POTD',
		path: '/potd',
		component: POTD,
		hidden: false,
	},
	{
		name: 'Records',
		path: '/record',
		component: Records,
		hidden: false,
	},
	{
		name: 'Siteswap Tools',
		path: '/siteswaptools',
		component: SiteswapTools,
		inProgress: true,
	},
	{
		name: 'Edit Profile',
		path: '/editprofile',
		component: EditProfile,
		hidden: true,
	},
	{
		name: 'Admin',
		path: '/admin',
		component: Admin,
		hidden: true,
	},
];

export default routes;
