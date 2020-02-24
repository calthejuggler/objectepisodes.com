import React from 'react';

const FiveStars = props => {
	const { rating, setRating, ratingCanChange, setRatingCanChange } = props;

	return (
		<>
			<link
				rel='stylesheet'
				href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
			/>
			<div className='row justify-content-center'>
				{rating.map((active, i) => (
					<div className='col-2' key={'star-' + i}>
						<span
							className={
								'fa-3x mb-2 fa fa-star' +
								(rating[i] ? ' text-dark' : ' text-muted')
							}
							onMouseEnter={() => {
								ratingCanChange &&
									setRating(
										rating.map((value, idx) =>
											idx <= i ? true : false
										)
									);
							}}
							onClick={() => {
								const newRating = rating.map((value, idx) =>
									idx <= i ? true : false
								);
								setRating(newRating);
								setRatingCanChange(false);
							}}></span>
					</div>
				))}
			</div>
		</>
	);
};

export default FiveStars;
