import React from 'react'
import MeetUsCarousel from './HomeComponents/MeetUsCarousel'
import HeroSection from './HomeComponents/HeroSection'
import '../Styles/HomeStyles/NameSection.css'
import "../Styles/HomeStyles/Carousel.css"
import ProductPage from './ProductComponents/ProductPage'
import ProductDisplay from './HomeComponents/ProductDisplay'

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <ProductDisplay/>
    </div>
  )
}
