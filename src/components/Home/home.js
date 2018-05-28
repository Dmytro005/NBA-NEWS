import React from 'react';

import Slider from 'components/Slider/Slider';

const Home = () => {
	return (
		<div>
			<Slider
				type="featured"
				start={0}
				amount={5}
				settings={{
					dots: true,
					infinite: true,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true
				}}
			/>
		</div>
	);
};

export default Home;
