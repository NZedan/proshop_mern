import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
	// Fontawesome stars
	const empty = 'far fa-star';
	const half = 'fas fa-star-half-alt';
	const full = 'fas fa-star';

	return (
		<div className='rating'>
			<span>
				<i style={{ color }} className={value >= 1 ? full : value >= 0.5 ? half : empty} />
			</span>
			<span>
				<i style={{ color }} className={value >= 2 ? full : value >= 1.5 ? half : empty} />
			</span>
			<span>
				<i style={{ color }} className={value >= 3 ? full : value >= 2.5 ? half : empty} />
			</span>
			<span>
				<i style={{ color }} className={value >= 4 ? full : value >= 3.5 ? half : empty} />
			</span>
			<span>
				<i style={{ color }} className={value === 5 ? full : value >= 4.5 ? half : empty} />
			</span>
			<span>{text && text}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
};

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string,
	color: PropTypes.string,
};

export default Rating;
