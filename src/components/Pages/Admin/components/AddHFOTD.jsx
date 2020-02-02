import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withAuth } from '../../../Session/withAuth';

const AddHFOTD = props => {
	const { firebase, user } = props;

	const [hfotd, setHfotd] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		firebase.db
			.collection('hfotd')
			.get()
			.then(docsSnap => {
				firebase.db
					.collection('hfotd')
					.add({
						fact: hfotd,
						user: user.uid,
						timestamp: firebase.dbFunc.FieldValue.serverTimestamp(),
						toBeShown: new Date('02/02/2020').setDate(new Date('02/02/2020').getDate()+docsSnap.docs.length),
					})
					.then(res => {
						setHfotd('');
					})
					.catch(e => console.dir(e.message));
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
						}}></textarea>
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
