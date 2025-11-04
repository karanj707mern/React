import React from 'react'
import { Header } from './Header'
import { Slider } from './Slider'
// import { Banner } from './Banner'
import { Dealofweek } from './Dealofweek'
import { Bestsellers } from './Bestsellers'
import { Benefit } from './Benefit'
import { Blogs } from './Blogs'
import { Newsletters } from './Newsletters'
import { Footer } from './Footer'
import Newarrivals from './Newarrivals'

export const Home = ({ cartItems, updateCart }) => {
  return (
    <div className="super_container">
        <Header cartItems={cartItems} />
        <Slider/>
        {/* <Banner/> */}
        <Newarrivals updateCart={updateCart} />
        <Dealofweek/>
        <Bestsellers/>
        <Benefit/>
        <Blogs/>
        <Newsletters/>
        <Footer/>
    </div>
  )
}
