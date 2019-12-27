import React from 'react';

export const AddTopic = props => {
	return (
		<>
			<button
				className='btn btn-primary mb-3 d-block mx-auto'
				onClick={() => props.setAddTopic(true)}>
				+ Add Topic
			</button>
			{props.addTopic && (
				<div className='card mb-3'>
					<div className='card-body'>
						<form>
							<div className='form-group'>
								<label htmlFor='title'>Title:</label>
								<input
									name='title'
									type='text'
									className='form-control'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='content'>Content:</label>
								<textarea
									name='content'
									id=''
									cols='30'
									rows='10'
									className='form-control'></textarea>
							</div>
							<input
								type='submit'
								value='Post Topic'
								className='btn btn-primary d-block mx-auto'
							/>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
