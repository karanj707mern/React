import React from 'react'
import { Link } from 'react-router-dom'
export const Contact = ({ cartItems, updateCart }) => {
	return (
		<>
 <div className="super_container">

	{/* <!-- Header --> */}

	<header className="header trans_300">	

		{/* <!-- Top Navigation --> */}

		<div className="top_nav">
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="top_nav_left">free shipping on all u.s orders over $50</div>
					</div>
					<div className="col-md-6 text-right">
						<div className="top_nav_right">
							<ul className="top_nav_menu">

								{/* <!-- Currency / Language / My Account --> */}

								<li className="currency">
									<a href="#">
										usd
										<i className="fa fa-angle-down"></i>
									</a>
									<ul className="currency_selection">
										<li><a href="#">cad</a></li>
										<li><a href="#">aud</a></li>
										<li><a href="#">eur</a></li>
										<li><a href="#">gbp</a></li>
									</ul>
								</li>
								<li className="language">
									<a href="#">
										English
										<i className="fa fa-angle-down"></i>
									</a>
									<ul className="language_selection">
										<li><a href="#">French</a></li>
										<li><a href="#">Italian</a></li>
										<li><a href="#">German</a></li>
										<li><a href="#">Spanish</a></li>
									</ul>
								</li>
								<li className="account">
									<a href="#">
										My Account
										<i className="fa fa-angle-down"></i>
									</a>
									<ul className="account_selection">
										<li><a href="#"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
										<li><a href="#"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* <!-- Main Navigation --> */}

		<div className="main_nav_container">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 text-right">
						<div className="logo_container">
							<a href="#">colo<span>shop</span></a>
						</div>
						<nav className="navbar">
							<ul className="navbar_menu">
								<li><Link to="/">home</Link></li>
								<li><a href="#">shop</a></li>
								<li><a href="#">blog</a></li>
							<Link to="/contact"></Link>
							</ul>
							<ul className="navbar_user">
								<li><a href="#"><i className="fa fa-search" aria-hidden="true"></i></a></li>
								<li><a href="#"><i className="fa fa-user" aria-hidden="true"></i></a></li>
								<li className="checkout">
									
									<Link to="/cart">
										<i className="fa fa-shopping-cart" aria-hidden="true"></i>
										<span id="checkout_items" className="checkout_items">{(cartItems || []).length}</span>
									</Link>
								</li>
							</ul>
							<div className="hamburger_container">
								<i className="fa fa-bars" aria-hidden="true"></i>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>

	</header>

	<div className="fs_menu_overlay"></div>

	{/* <!-- Hamburger Menu --> */}

	<div className="hamburger_menu">
		<div className="hamburger_close"><i className="fa fa-times" aria-hidden="true"></i></div>
		<div className="hamburger_menu_content text-right">
			<ul className="menu_top_nav">
				<li className="menu_item has-children">
					<a href="#">
						usd
						<i className="fa fa-angle-down"></i>
					</a>
					<ul className="menu_selection">
						<li><a href="#">cad</a></li>
						<li><a href="#">aud</a></li>
						<li><a href="#">eur</a></li>
						<li><a href="#">gbp</a></li>
					</ul>
				</li>
				<li className="menu_item has-children">
					<a href="#">
						English
						<i className="fa fa-angle-down"></i>
					</a>
					<ul className="menu_selection">
						<li><a href="#">French</a></li>
						<li><a href="#">Italian</a></li>
						<li><a href="#">German</a></li>
						<li><a href="#">Spanish</a></li>
					</ul>
				</li>
				<li className="menu_item has-children">
					<a href="#">
						My Account
						<i className="fa fa-angle-down"></i>
					</a>
					<ul className="menu_selection">
						<li><a href="#"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
						<li><a href="#"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
					</ul>
				</li>
				<Link to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</Link>
				<li className="menu_item"><a href="#">shop</a></li>
				<Link to ="#blog">blog</Link>
				<li className="menu_item"><a href="#">contact</a></li>
			</ul>
		</div>
	</div>

	<div className="container contact_container">
		<div className="row">
			<div className="col">

				{/* <!-- Breadcrumbs --> */}

				<div className="breadcrumbs d-flex flex-row align-items-center">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li className="active"><Link to="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Contact</Link></li>
					</ul>
				</div>

			</div>
		</div>

		{/* <!-- Map Container --> */}

		<div className="row">
			<div className="col">
				<div id="google_map">
					<div className="map_container">
						<iframe 
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d YOUR_COORDINATES!2d YOUR_LONGITUDE!3d YOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM23CsDE3JzI4LjAiTiA3McKwNTknMTAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
							width="100%"
							height="450"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</div>
		</div>

		{/* <!-- Contact Us --> */}

		<div className="row">

			<div className="col-lg-6 contact_col">
				<div className="contact_contents">
					<h1>Contact Us</h1>
					<p>There are many ways to contact us. You may drop us a line, give us a call or send an email, choose what suits you the most.</p>
					<div>
						<p>(800) 686-6688</p>
						<p>info.deercreative@gmail.com</p>
					</div>
					<div>
						<p>mm</p>
					</div>
					<div>
						<p>Open hours: 8.00-18.00 Mon-Fri</p>
						<p>Sunday: Closed</p>
					</div>
				</div>

				{/* <!-- Follow Us --> */}

				<div className="follow_us_contents">
					<h1>Follow Us</h1>
					<ul className="social d-flex flex-row">
						<li><a href="#" style={{"backgroundColor": "#3a61c9"}}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
						<li><a href="#" style={{"backgroundColor": "#41a1f6"}}><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
						<li><a href="#" style={{"backgroundColor": "#fb4343"}}><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
						<li><a href="#" style={{"backgroundColor": "#8f6247"}}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
					</ul>
				</div>

			</div>

			<div className="col-lg-6 get_in_touch_col">
				<div className="get_in_touch_contents">
					<h1>Get In Touch With Us!</h1>
					<p>Fill out the form below to recieve a free and confidential.</p>
					<form action="post">
						<div>
							<input id="input_name" className="form_input input_name input_ph" type="text" name="name" placeholder="Name" required="required" data-error="Name is required."/>
								<input id="input_email" className="form_input input_email input_ph" type="email" name="email" placeholder="Email" required="required" data-error="Valid email is required."/>
									<input id="input_website" className="form_input input_website input_ph" type="url" name="name" placeholder="Website" required="required" data-error="Name is required."/>
										<textarea id="input_message" className="input_ph input_message" name="message" placeholder="Message" rows="3" required data-error="Please, write us a message."></textarea>
									</div>
									<div>
										<button id="review_submit" type="submit" className="red_button message_submit_btn trans_300" value="Submit">send message</button>
									</div>
								</form>
						</div>
				</div>

			</div>
		</div>

		{/* <!-- Newsletter --> */}

		<div className="newsletter">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
							<h4>Newsletter</h4>
							<p>Subscribe to our newsletter and get 20% off your first purchase</p>
						</div>
					</div>
					<div className="col-lg-6">
						<form action="post">
							<div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
								<input id="newsletter_email" type="email" placeholder="Your email" required="required" data-error="Valid email is required."/>
									<button id="newsletter_submit" type="submit" className="newsletter_submit_btn trans_300" value="Submit">subscribe</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		{/* <!-- Footer --> */}

		<footer className="footer">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
							<ul className="footer_nav">
								<li><a href="#">Blog</a></li>
								<li><a href="#">FAQs</a></li>
								<li><a href="contact.html">Contact us</a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
							<ul>
								<li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
								<li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
								<li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
								<li><a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
								<li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className="footer_nav_container">
							<div className="cr">©2018 All Rights Reserverd. Template by <a href="#">Colorlib</a> &amp; distributed by <a href="https://themewagon.com">ThemeWagon</a></div>
						</div>
					</div>
				</div>
			</div>
		</footer>

	</div>
	</>
  )
}



