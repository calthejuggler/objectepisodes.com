import React, { FC } from 'react';

interface Props {
	rating: Array<number>;
	setRating: (value: Array<number>) => void;
	ratingCanChange: boolean;
	setRatingCanChange: (value: boolean) => void;
}

const FiveStars: FC<Props> = ({
	rating,
	setRating,
	ratingCanChange,
	setRatingCanChange
}) => {
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
											idx <= i ? 1 : 0
										)
									);
							}}
							onClick={() => {
								const newRating: number[] = rating.map(
									(value, idx) => (idx <= i ? 1 : 0)
								);
								setRating(newRating);
								setRatingCanChange(false);
							}}
						></span>
					</div>
				))}
			</div>
		</>
	);
};

export default FiveStars;
