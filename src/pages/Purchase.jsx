import React from 'react'
import {RiArrowRightLine} from 'react-icons/ri'
import PricingCard from "../components/PricingCard"
import {FcFlowChart} from "react-icons/fc"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"


export default function Purchase() {
  return (
    <>
      <div className="min-h-screen py-16 px-16 flex flex-col items-center sm:px-20">
        <h1 className="text-4xl text-center font-serif mb-10 mt-6">Supercharge your learning. Try for 
            <Link to="/register">
                <span className="text-front-500 cursor-pointer transition ease-in-out delay-75 hover:text-front-600"> free.
                </span>
            </Link>
        </h1>
        <Link to="/register">
            <div className="w-36 flex items-center bg-front-500 rounded-2xl h-12 p-2 cursor-pointer mb-14 transition ease-in-out delay-75 hover:bg-front-600">
                <p className="mr-auto text-white font-serif text-md">Get started</p>
                <span className="text-white text-xl"><RiArrowRightLine/></span>
            </div>
        </Link>
        <div className="flex flex-col lg:flex-row lg:gap-x-10 xl:gap-x-16">
            <PricingCard 
                id='Standard'
                type='Standard'
                price='$5'
                seat='seat /'
                month='month'
                students='Up to 30 students'
                teachers='1 teacher'
                dataUse='10 hours of data per user each month'
            />
            <PricingCard 
                id='Pro'
                type='Pro'
                price='$8'
                seat='seat /'
                month='month'
                students='Up to 100 students'
                teachers='5 teachers'
                dataUse='15 hours of data per user each month'
            />
            <PricingCard 
                id='Enterprise'
                type='Enterprise'
                price={<FcFlowChart/>}
                seat=''
                month=''
                students='Unlimited students'
                teachers='Unlimited teachers'
                dataUse='20 hours of data per user each month'
            />
        </div>
      </div>
      <Footer />
    </>
  )
}
