import React, { FC } from 'react';

const DonateButton:FC = () => {
	return (
		<form
			action='https://www.paypal.com/cgi-bin/webscr'
			method='post'
			target='_top'>
			<input type='hidden' name='cmd' value='_s-xclick' />
			<input
				type='hidden'
				name='hosted_button_id'
				value='7UWZXHZQSAA62'
			/>
			<input
				type='image'
				src='https://www.paypalobjects.com/en_US/NL/i/btn/btn_donateCC_LG.gif'
				// border='0'
				name='submit'
				title='PayPal - The safer, easier way to pay online!'
				alt='Donate with PayPal button'
			/>
			<img
				alt=''
				// border='0'
				src='https://www.paypal.com/en_NL/i/scr/pixel.gif'
				width='1'
				height='1'
			/>
		</form>
	);
};

export default DonateButton;
