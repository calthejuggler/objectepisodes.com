import React, { MouseEvent, FC, useState, useEffect } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import { withAuth } from '../../../../../Session';
import Firebase from './../../../../../Firebase/index';
import { UserContextInterface } from '../../../../../Session/context';

import $ from 'jquery';

interface Props {
	id: string;
	type: string;
	firebase: Firebase;
	user: UserContextInterface;
	postUser: { id: string; photoURL: string; name: string; username: string };
	index: number;
}

const DeletePostButton: FC<Props> = ({
	id,
	type,
	firebase,
	user,
	postUser,
	index,
}) => {
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		return () => {
			$('#deletePostModal' + index).modal('hide');
		};
	}, [index]);

	const handleDeleteButtonClick = (e: MouseEvent) => {
		e.preventDefault();
		if (!user) setError("You aren't logged in.");
		else if (user.uid !== postUser.id) setError("This isn't your post!");
		else {
			let deletedInfo = {};
			if (type === 'topic')
				deletedInfo = {
					content: [
						{
							children: [{ text: 'This post has been deleted.' }],
							type: 'paragraph',
						},
					],
					deleted: true,
					edited: false,
				};
			else
				deletedInfo = {
					comment: [
						{
							children: [{ text: 'This post has been deleted.' }],
							type: 'paragraph',
						},
					],
					deleted: true,
					edited: false,
				};

			firebase.db
				.collection(type === 'topic' ? 'forum' : 'forum-replies')
				.doc(id)
				.update(deletedInfo)
				.catch((e: Error) => setError(e.message));
		}
	};
	return (
		<>
			<button
				type='button'
				className='btn btn-sm btn-danger'
				data-toggle='modal'
				data-target={'#deletePostModal' + index}
			>
				Delete
			</button>

			<div
				className='modal fade'
				id={'deletePostModal' + index}
				tabIndex={-1}
				role='dialog'
				aria-labelledby={'deletePostModalLabel' + index}
				aria-hidden='true'
			>
				<div
					className='modal-dialog'
					role='document'
					data-backdrop='static'
				>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5
								className='modal-title'
								id={'deletePostModalLabel' + index}
							>
								Delete Post
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body text-left'>
							{error && (
								<div className='alert alert-danger'>
									{error}
								</div>
							)}
							<p>
								Are you sure you want to delete this post? This
								action cannot be undone.
							</p>
						</div>
						<div className='modal-footer'>
							<button
								type='submit'
								className='btn btn-danger'
								onClick={handleDeleteButtonClick}
							>
								Yes, Delete
							</button>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'
							>
								No, Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default withFirebase(withAuth(DeletePostButton));
