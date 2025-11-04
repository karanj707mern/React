import React from 'react'
import { Link } from 'react-router-dom'
export const Banner = () => {
	return (
		<div className="banner">
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<div className="banner_item align-items-center" style={{ backgroundImage: 'url(images/banner_1.jpg)' }}>
							<div className="banner_category">
								<Link to="/categories" className='Nav-Link'>women's</Link>

							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="banner_item align-items-center" style={{ backgroundImage: 'url(images/banner_2.jpg)' }}>
							<div className="banner_category">
								<Link to="/categories" className='Nav-Link'>accessories's</Link>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="banner_item align-items-center" style={{ backgroundImage: 'url(images/banner_3.jpg)' }}>
							<div className="banner_category">
								<Link to="/categories" className='Nav-Link'>men's</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
