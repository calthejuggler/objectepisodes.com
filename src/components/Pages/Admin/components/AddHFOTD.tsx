import React, { useState, FC, FormEvent } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withAuth } from '../../../Session/withAuth';
import Firebase from './../../../Firebase/index';

interface Props {
	firebase: Firebase;
	user: any;
}

const AddHFOTD: FC<Props> = props => {
	const { firebase, user } = props;

	const [hfotd, setHfotd] = useState('');

	const handleSubmit = (e:FormEvent) => {
		e.preventDefault();
		firebase.db
			.collection('hfotd')
			.get()
			.then(() => {
				firebase.db
					.collection('hfotd')
					.add({
						fact: hfotd,
						user: user.uid,
						timestamp: firebase.dbFunc.FieldValue.serverTimestamp()
					})
					.then(() => {
						setHfotd('');
					})
					.catch((e: { message: string }) => console.dir(e.message));
			});
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='newHFOTD'>Historical Fact</label>
					<textarea
						name='newHFOTD'
						id='newHFOTD'
						className='form-control'
						value={hfotd}
						onChange={e => {
							setHfotd(e.target.value);
						}}
					></textarea>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='Submit'
				/>
			</form>
		</>
	);
};

export default withAuth(withFirebase(AddHFOTD));
