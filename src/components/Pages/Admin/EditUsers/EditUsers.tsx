import React, {
	FC,
	useReducer,
	Reducer,
	useEffect,
	ReactFragment,
} from 'react';
import { withFirebase } from './../../../Firebase/context';
import Firebase from './../../../Firebase/config';
import Spinner from './../../../elements/Spinner';
import ProfilePicture from '../../../elements/ProfilePicture';
import UserTools from './components/UserTools';

interface State {
	loading: boolean;
	users: { id: string; data: firebase.firestore.DocumentData }[];
	numberOfRows: number;
	thereAreMore: boolean;
	selectedUser: { id: string; data: firebase.firestore.DocumentData } | null;
}
interface Action {
	type: string;
	payload?: any;
}

const initialState = {
	loading: true,
	users: [],
	numberOfRows: 0,
	thereAreMore: true,
	selectedUser: null,
};

const editUsersReducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'load-user':
			return { ...state, users: [...state.users, action.payload] };
		case 'finish-load':
			return { ...state, loading: false };
		case 'select-user':
			return { ...state, selectedUser: action.payload };
		default:
			return state;
	}
};

const EditUsers: FC<{ firebase: Firebase }> = ({ firebase }) => {
	const [{ users, loading, selectedUser }, dispatch] = useReducer(
		editUsersReducer,
		initialState
	);

	const SelectedUserListItem: FC<{ objKey: string; data: ReactFragment }> = ({
		objKey,
		data,
	}) => (
		<li className='list-group-item'>
			<div className='row align-items-center'>
				<div className='col-4'>
					<b>{objKey}: </b>
				</div>
				<div className='col-8'>{data}</div>
			</div>
		</li>
	);

	useEffect(() => {
		firebase.db
			.collection('users')
			.limit(10)
			.orderBy('created', 'desc')
			.get()
			.then(async (snap: firebase.firestore.QuerySnapshot) => {
				if (snap.empty) dispatch({ type: 'finish-load' });
				else
					await snap.docs.forEach((doc) =>
						dispatch({
							type: 'load-user',
							payload: { id: doc.id, data: doc.data() },
						})
					);
			})
			.then(() => {
				dispatch({ type: 'finish-load' });
			});
	}, [firebase.db]);

	return (
		<>
			<div className='col-12 col-md-9 text-center'>
				<h3 className=''>Edit User</h3>
				{!selectedUser ? (
					'Select a User'
				) : (
					<div className='row'>
						<div className='col-12 col-md-8'>
							<>
								<h5>Selected User</h5>
								{selectedUser.data.photoURL && (
									<ProfilePicture
										photoURL={selectedUser.data.photoURL}
										size={['8rem', '8rem']}
									/>
								)}
								<ul className='text-left list-group list-group-flush mt-2'>
									<SelectedUserListItem
										objKey='Name'
										data={`${selectedUser.data.firstname} ${selectedUser.data.lastname}`}
									/>
									<SelectedUserListItem
										objKey='Email'
										data={
											<a
												href={`mailto:${selectedUser.data.email}`}
											>
												{selectedUser.data.email}
											</a>
										}
									/>
									<SelectedUserListItem
										objKey='Created'
										data={selectedUser.data.created
											.toDate()
											.toUTCString()}
									/>
									<SelectedUserListItem
										objKey='Admin'
										data={
											selectedUser.data.admin
												? 'Yes'
												: 'No'
										}
									/>
									<SelectedUserListItem
										objKey='Golden Clubs'
										data={
											!selectedUser.data.goldenClubs
												? 'None'
												: selectedUser.data.goldenClubs
														.length
										}
									/>
								</ul>
							</>
						</div>
						<div className='col-12 col-md-4'>
							<UserTools />
						</div>
					</div>
				)}
			</div>
			<div className='col-12'>
				<h3 className='text-center'>User List</h3>
				<hr />
				<ul className='list-group list-group-flush text-center'>
					<li className='list-group-item'>
						<div className='row'>
							<div className='col'>Name</div>
							<div className='col'>Email</div>
							<div className='col'>Posts</div>
							<div className='col'>Likes</div>
							<div className='col'>Created</div>
							<div className='col'>Admin</div>
						</div>
					</li>

					{users.map(({ id, data }, i) => (
						<li
							className='list-group-item'
							key={id}
							onClick={() =>
								dispatch({
									type: 'select-user',
									payload: { id: id, data: data },
								})
							}
						>
							<div className='row'>
								<div className='col overflow-hidden'>{`${data.firstname} ${data.lastname}`}</div>
								<div className='col overflow-hidden'>
									{data.email}
								</div>
								<div className='col overflow-hidden'>
									{data.forumPosts}
								</div>
								<div className='col overflow-hidden'>
									{data.likes?.length}
								</div>
								<div className='col overflow-hidden'>
									{data.created.toDate().toUTCString()}
								</div>
								<div className='col overflow-hidden'>
									{data.admin ? 'Yes' : 'No'}
								</div>
							</div>
						</li>
					))}
					{loading && (
						<div className='row h-100'>
							<Spinner />
						</div>
					)}
				</ul>
			</div>
		</>
	);
};

export default withFirebase(EditUsers);
