import React from 'react';
import spinner from './spinner.gif';
export default () => (
	<>
		<img
			src={spinner}
			style={{ margin: 'auto', display: 'block', width: '100px' }}
			alt='Loading...'
		/>
	</>
);
