import React from 'react';

const FiveStars = props => {
	const { rating, setRating, ratingCanChange, setRatingCanChange } = props;

	return (
		<>
			<link
				rel='stylesheet'
				href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
			/>
			{rating.map((active, i) => (
				<span
					className={
						'fa fa-star' +
						(rating[i] ? ' text-dark' : ' text-muted')
					}
					onMouseEnter={
						() => {
							ratingCanChange &&
								setRating(
									rating.map((value, idx) =>
										idx <= i ? true : false
									)
								);
						}
					}
					onClick={() => {
						const newRating = rating.map((value, idx) =>
							idx <= i ? true : false
						);
						setRating(newRating);
						setRatingCanChange(false);
					}}></span>
			))}
		</>
	);
};

export default FiveStars;
