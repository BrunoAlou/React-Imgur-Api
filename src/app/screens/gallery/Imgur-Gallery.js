import React from 'react';

import Filters from './filters/Filters';
import List from './list/List';

const ImgurGallery = () => {
	return (
		<section className="ig-wrapper">

			<Filters />
			<List />

		</section>
	);
};
export default ImgurGallery;
