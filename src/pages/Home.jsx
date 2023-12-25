import React from 'react'
import Hero from '../components/Hero'
import ProductDetails from '../components/ProductDetails'
import Reviews from '../components/Reviews'
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Hero/>
      <ProductDetails/>
      <Reviews />
      <Footer/>
    </>
  )
}
