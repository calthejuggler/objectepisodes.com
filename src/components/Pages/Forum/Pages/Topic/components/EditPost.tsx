import React, { FC, useState, useEffect, FormEvent, useCallback } from 'react';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import { Node } from 'slate';
import Firebase from './../../../../../Firebase/index';
import { withFirebase } from '../../../../../Firebase/context';
import $ from 'jquery';
import { withAuth } from '../../../../../Session';
import { UserContextInterface } from '../../../../../Session/context';

interface Props {
	type: string;
	data: firebase.firestore.DocumentData;
	id: string;
	firebase: Firebase;
	index: number;
	user: UserContextInterface;
}

const EditPost: FC<Props> = ({ type, data, id, firebase, index, user }) => {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<Node[]>([
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	]);

	const [error, setError] = useState<string | null>(null);

	const resetFields = useCallback(() => {
		if (type === 'comment') {
			setContent(data.comment);
		} else if (type === 'topic') {
			setContent(data.content);
			setTitle(data.title);
		}
	}, [data, type]);

	useEffect(() => {
		resetFields();
		return () => {
			$('#editPostModal' + index).modal('hide');
		};
	}, [resetFields, index]);

	const handleEditPost = (e: FormEvent) => {
		e.preventDefault();

		let parcel: {
			edited: boolean;
			content?: Node[];
			comment?: Node[];
			title?: string;
		} = {
			edited: true,
		};

		if (type === 'topic') {
			parcel = { ...parcel, content: content, title: title };
		} else {
			parcel = { ...parcel, comment: content };
		}

		(type === 'topic' && title === '') ||
		(content.length === 1 &&
			content[0].children.length === 1 &&
			content[0].children[0].text === '')
			? setError('All fields are required.')
			: data.user.id !== user?.uid
			? setError(
					"Something strange has happened... This doesn't seem to be your post! How did you even get here? Please email cal@objectepisodes.com and tell him the problem!"
			  )
			: firebase.db
					.collection(type === 'topic' ? 'forum' : 'forum-replies')
					.doc(id)
					.update(parcel)
					.catch((e: Error) => setError(e.message));
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-sm btn-primary'
				data-toggle='modal'
				data-target={'#editPostModal' + index}
			>
				Edit
			</button>

			<div
				className='modal fade'
				id={'editPostModal' + index}
				tabIndex={-1}
				role='dialog'
				aria-labelledby={'editPostModalLabel' + index}
				aria-hidden='true'
			>
				<div
					className='modal-dialog'
					role='document'
					data-backdrop='static'
				>
					<div className='modal-content'>
						<form onSubmit={handleEditPost}>
							<div className='modal-header'>
								<h5
									className='modal-title'
									id={'editPostModalLabel' + index}
								>
									Edit Post
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
								{type === 'topic' && (
									<div className='form-group'>
										<label htmlFor='editTitle'>
											Title:
										</label>
										<input
											type='text'
											className='form-control'
											id='editTitle'
											value={title}
											onChange={(e) =>
												setTitle(e.currentTarget.value)
											}
										/>
									</div>
								)}
								<div className='form-group'>
									<TextAreaInput
										setState={setContent}
										state={content}
										placeholder='Input your post content.'
									/>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Save changes
								</button>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'
									onClick={() => resetFields()}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default withAuth(withFirebase(EditPost));
