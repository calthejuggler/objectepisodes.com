import React from 'react';

const FiveStars = props => {
	const { rating, setRating, ratingCanChange, setRatingCanChange } = props;
	return (
		<>
			<link
				rel='stylesheet'
				href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
			/>

			<span
				className={
					'fa fa-star' + (rating >= 1 ? ' text-dark' : ' text-muted')
				}
				onMouseEnter={() => ratingCanChange && setRating(1)}
				onClick={() => {
					setRating(1);
					setRatingCanChange(false);
				}}></span>
			<span
				className={
					'fa fa-star' + (rating >= 2 ? ' text-dark' : ' text-muted')
				}
				onMouseEnter={() => ratingCanChange && setRating(2)}
				onClick={() => {
					setRating(2);
					setRatingCanChange(false);
				}}></span>
			<span
				className={
					'fa fa-star' + (rating >= 3 ? ' text-dark' : ' text-muted')
				}
				onMouseEnter={() => ratingCanChange && setRating(3)}
				onClick={() => {
					setRating(3);
					setRatingCanChange(false);
				}}></span>
			<span
				className={
					'fa fa-star' + (rating >= 4 ? ' text-dark' : ' text-muted')
				}
				onMouseEnter={() => ratingCanChange && setRating(4)}
				onClick={() => {
					setRating(4);
					setRatingCanChange(false);
				}}></span>
			<span
				className={
					'fa fa-star' + (rating >= 5 ? ' text-dark' : ' text-muted')
				}
				onMouseEnter={() => ratingCanChange && setRating(5)}
				onClick={() => {
					setRating(5);
					setRatingCanChange(false);
				}}></span>
		</>
	);
};

export default FiveStars;
