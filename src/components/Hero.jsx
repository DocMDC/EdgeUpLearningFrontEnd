import React from 'react'
import backgroundImg from '../assets/BG.png'
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="min-h-[1000px] bg-front-200 flex flex-col items-center justify-center"> 
        <img src={backgroundImg} alt="histology image" className="h-[1000px] w-full bg-no-repeat object-cover" />
        <div className="absolute top-20 h-[1000px] w-full bg-gray-400 opacity-70 z-40"></div>
        <div className="absolute top-20 h-[1000px] w-full flex items-center justify-center z-50">
            <div className="w-full h-96 flex flex-col text-center mx-20 px-14 lg:mx-40 xl:mx-72 2xl:mx-96 2xl:px-40">
                <h1 className="text-5xl mb-4 tracking-wider md:text-6xl">Get an edge up on your boards</h1>
                <h2 className="text-xl text-gray-900 mt-8 md:text-2xl">The only question bank for medical students that is fully integrated with artificial intelligence</h2>
                <Link to="/register">
                  <button className="front-btn-1 mt-10 md:text-2xl py-8">Register</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
