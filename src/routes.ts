import { Login } from './components/Pages/Login/Login';
import { Register } from './components/Pages/Register/Register';
import Forgot from './components/Pages/Forgot/Forgot';
import Forum from './components/Pages/Forum/Forum';
// import Dashboard from './components/Pages/Dashboard/Dashboard';
import User from './components/Pages/User/User';
import EditProfile from './components/Pages/EditProfile/EditProfile';
import Admin from './components/Pages/Admin/Admin';
import About from './components/Pages/About';
import POTD from './components/Pages/POTD';
import { FC } from 'react';
import Home from './components/Pages/Home/Home';
import Database from './components/Pages/Database/Database';
import AddPhoto from './components/Pages/Admin/components/AdminPhotos/components/AddPhoto';

interface Route {
	name: string;
	path: string;
	component: FC;
	hidden: boolean;
}

const routes = {
	nav: [
		{
			name: 'Home',
			path: '/',
			component: Home,
			hidden: false
		},
		{
			name: 'About',
			path: '/about',
			component: About,
			hidden: false
		},
		{
			name: 'Database',
			path: '/database',
			component: Database,
			hidden: false
		}
	],
	user: [
		{
			name: 'User',
			path: '/user',
			component: User,
			hidden: true
		},
		{
			name: 'Login',
			path: '/login',
			component: Login,
			hidden: true
		},
		{
			name: 'Register',
			path: '/register',
			component: Register,
			hidden: true
		},
		{
			name: 'Forgot',
			path: '/forgot',
			component: Forgot,
			hidden: true
		},
		{
			name: 'Edit Profile',
			path: '/editprofile',
			component: EditProfile,
			hidden: true
		}
	],
	forum: [
		{
			name: 'Forum',
			path: '/forum',
			component: Forum,
			hidden: false
		},
		{
			name: 'Forum Topic',
			path: '/forum/:paramCategory/:paramId',
			component: Forum,
			hidden: true
		}
	],
	database: [
		{
			name: 'Photos',
			path: '/photos',
			component: POTD,
			hidden: false
		},
		{
			name: 'Props',
			path: '/potd',
			component: POTD,
			hidden: false
		},
		{
			name: 'Literature',
			path: '/potd',
			component: POTD,
			hidden: false
		},
		{
			name: 'Tricks',
			path: '/potd',
			component: POTD,
			hidden: false
		},
		{
			name: 'Biographies',
			path: '/potd',
			component: POTD,
			hidden: false
		},
	],
	admin: [
		{
			name: 'Admin',
			path: '/admin',
			component: Admin,
			hidden: true
		},
	]
};

const createAllRouteArray = () => {
	let newRouteArray: Array<Route> = [];
	Object.values(routes).forEach((item: any) => {
		item.forEach((route: Route) => {
			newRouteArray.push(route);
		});
	});
	return newRouteArray;
};

const createDatabaseRouteArray = () => {
	let newRouteArray: Array<Route> = [];
	routes.database.forEach((route: Route) => {
		newRouteArray.push(route);
	});
	return newRouteArray;
};

export default routes;

export { createAllRouteArray, createDatabaseRouteArray };
