import React, { Component } from 'react';

import NewsSlider from 'components/Slider/Slider';
import NewsList from 'components/NewsList/NewsList';

class NewsView extends Component {
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
						autoplaySpeed: 3000,
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplay: true
					}}
				/>
				<NewsList type="mainCard" loadMore={false} start={0} amount={6} />
			</div>
		);
	}
}

export default NewsView;
