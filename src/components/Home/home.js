import React from 'react';

import NewsSlider from 'components/Slider/Slider';
import NewsList from 'components/NewsList/NewsList';
// import VideosList from 'components/VideosList/VideosList';

const Home = () => {
	return (
		<div>
			<NewsSlider
				type="featured"
				start={0}
				amount={5}
				settings={{
					dots: true,
					infinite: true,
					arrows: false,
					autoplaySpeed: 5000,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true
				}}
			/>
			<NewsList type="card" loadMore={true} start={3} amount={3} />
			{/* <VideosList type="card" title={true} loadMore={true} start={0} amount={3} /> */}
		</div>
	);
};

export default Home;
