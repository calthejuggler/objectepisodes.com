import React, { useState, FC, MouseEvent } from 'react';
import { withFirebase } from '../../../Firebase/context';
import $ from 'jquery';
import Firebase from './../../../Firebase/index';

interface Props {
	firebase: Firebase;
}

const AddPersonalRecord: FC<Props> = props => {
	const { firebase } = props;

	const [noOfProps, setNoOfProps] = useState<number>(3);
	const [propType, setPropType] = useState<string>('ball');
	const [otherProp, setOtherProp] = useState<string>('');
	const [pattern, setPattern] = useState<string>('cascade');
	const [otherPattern, setOtherPattern] = useState<string>('');
	const [recordType, setRecordType] = useState<string>('catches');
	const [catches, setCatches] = useState<number>(0);
	const [time, setTime] = useState<number>(0);
	const [videoURL, setVideoURL] = useState<string>('');

	const handleRecordSubmit = (e: MouseEvent) => {
		e.preventDefault();
		if (propType === 'other') {
			if (pattern === 'other') {
				if (recordType === 'catches') {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: otherProp,
							pattern: otherPattern,
							recordType: recordType,
							catches: catches,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				} else {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: otherProp,
							pattern: otherPattern,
							recordType: recordType,
							time: time,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				}
			} else {
				if (recordType === 'catches') {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: otherProp,
							pattern: pattern,
							recordType: recordType,
							catches: catches,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				} else {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: otherProp,
							pattern: pattern,
							recordType: recordType,
							time: time,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				}
			}
		} else {
			if (pattern === 'other') {
				if (recordType === 'catches') {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: propType,
							pattern: otherPattern,
							recordType: recordType,
							catches: catches,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				} else {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: propType,
							pattern: otherPattern,
							recordType: recordType,
							time: time,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				}
			} else {
				if (recordType === 'catches') {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: propType,
							pattern: pattern,
							recordType: recordType,
							catches: catches,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				} else {
					firebase.db
						.collection('records')
						.add({
							noOfProps: noOfProps,
							propType: propType,
							pattern: pattern,
							recordType: recordType,
							time: time,
							videoURL: videoURL,
							recorded: new Date(),
							userID: firebase.auth.currentUser.uid
						})
						.then(() => {
							$('#addPersonalRecord').modal('hide');
						})
						.catch((e: { message: string }) => console.dir(e));
				}
			}
		}
	};

	return (
		<div
			className='modal fade'
			id='addPersonalRecord'
			tabIndex={-1}
			role='dialog'
			aria-labelledby='addPersonalRecordLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='addPersonalRecordLabel'>
							Add Personal Record
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
						<div className='form-group'>
							<label htmlFor='numberOfProps'>No. of Props:</label>
							<input
								type='number'
								name='numberOfProps'
								className='form-control'
								value={noOfProps}
								onChange={e =>
									setNoOfProps(
										parseInt(e.currentTarget.value)
									)
								}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='propType'>Prop:</label>
							<select
								name='propType'
								className='form-control'
								value={propType}
								onChange={e => setPropType(e.target.value)}
							>
								<option value='ball'>Ball</option>
								<option value='club'>Club</option>
								<option value='ring'>Ring</option>
								<option value='other'>Other</option>
							</select>
						</div>
						{propType === 'other' && (
							<div className='form-group'>
								<label htmlFor='otherProp'>Other Prop:</label>
								<input
									type='text'
									name='otherProp'
									className='form-control'
									value={otherProp}
									onChange={e => setOtherProp(e.target.value)}
								/>
								<p className='small'>
									*Please write in singular form where
									possible.
								</p>
							</div>
						)}
						<div className='form-group'>
							<label htmlFor='pattern'>Pattern:</label>
							<select
								name='pattern'
								className='form-control'
								value={pattern}
								onChange={e => setPattern(e.target.value)}
							>
								<option value='cascade'>
									Cascade/Fountain
								</option>
								<option value='shower'>Shower</option>
								<option value='backcrosses'>Backcrosses</option>
								<option value='halfShower'>Half-Shower</option>
								<option value='other'>Other</option>
							</select>
						</div>
						{pattern === 'other' && (
							<div className='form-group'>
								<label htmlFor='otherPattern'>
									Other Pattern:
								</label>
								<input
									type='text'
									name='otherPattern'
									className='form-control'
									value={otherPattern}
									onChange={e =>
										setOtherPattern(e.target.value)
									}
								/>
							</div>
						)}
						<div className='form-group'>
							<label htmlFor='recordType'>Record Type:</label>
							<select
								name='recordType'
								className='form-control'
								value={recordType}
								onChange={e => setRecordType(e.target.value)}
							>
								<option value='catches'>
									Number of Catches
								</option>
								<option value='time'>Amount of Time</option>
							</select>
						</div>
						{recordType === 'catches' && (
							<div className='form-group'>
								<label htmlFor='catches'>No. of Catches:</label>
								<input
									type='number'
									name='catches'
									className='form-control'
									value={catches}
									onChange={e =>
										setCatches(parseInt(e.target.value))
									}
								/>
							</div>
						)}
						{recordType === 'time' && (
							<div className='form-group'>
								<label htmlFor='time'>Time (mm:ss):</label>
								<input
									type='time'
									name='time'
									className='form-control'
									value={time}
									onChange={e =>
										setTime(parseInt(e.target.value))
									}
								/>
							</div>
						)}
						<div className='form-group'>
							<label htmlFor='videoURL'>Video URL:</label>
							<input
								name='videoURL'
								type='url'
								className='form-control'
								value={videoURL}
								onChange={e => setVideoURL(e.target.value)}
							/>
						</div>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							data-dismiss='modal'
						>
							Close
						</button>
						<button
							type='button'
							className='btn btn-primary'
							onClick={handleRecordSubmit}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(AddPersonalRecord);
