import React from 'react';

function EmptyState({ message }) {
	return (
		<div>
			<h2>Oops! Not Found</h2>
			<h6>{ message }</h6>
		</div>
	);
}

export default EmptyState;
