import React, { Component } from 'react';

import NewsSlider from 'components/Slider/Slider';
import VideosList from 'components/VideosList/VideosList';

class VideosView extends Component {
	render() {
		return (
			<div>
				<NewsSlider
					type="featured"
					start={0}
					amount={5}
					settings={{
						dots: false,
						infinite: true,
						arrows: false,
						autoplaySpeed: 5000,
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplay: true
					}}
				/>
				<VideosList
					type="card"
					title={false}
					loadMore={true}
					start={0}
					amount={6}
				/>
			</div>
		);
	}
}

export default VideosView;
