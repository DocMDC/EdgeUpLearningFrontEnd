import React from 'react'
import {GiTeacher, GiSandsOfTime} from 'react-icons/gi'
import {BsPersonCheckFill} from 'react-icons/bs'
import {SlControlPause} from "react-icons/sl"
import { Link } from "react-router-dom"

function PricingCard(props) {
    return (
        <div className="w-[300px] h-[600px] border-t-8 bg-secondary shadow-xl border-alternative rounded-xl py-4 mb-14 lg:mb-0">
            <h1 className="text-center text-4xl border-b border-gray-200 pb-2 font-serif">{props.type}</h1>
            <div className="flex flex-row items-center justify-start ml-5 mt-4">
                <h4 className="mr-5 text-6xl text-alternative">{props.price}</h4>
                <h5 className="leading-tight text-gray-500">{props.seat} <br/> {props.month}</h5>
            </div>
            <div className="ml-5 mt-5 mb-5">
                <h6 className="font-bold font-serif text-gray-700">Billed monthly</h6>
            </div>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="ml-5 mt-5">
                <h4 className="text-lg mb-4 font-bold">{props.type} includes:</h4>
                <div className="flex flex-row items-center text-gray-500 mb-3 font-serif text-sm">
                    <BsPersonCheckFill className="mr-4"/>
                    <h6>{props.students}</h6>
                </div>
                <div className="flex flex-row items-center text-gray-500 mb-3 font-serif text-sm">
                    <GiTeacher className="mr-4"/>
                    <h6>{props.teachers}</h6>
                </div>
                <div className="flex flex-row items-center text-gray-500 mb-3 font-serif text-sm">
                    <SlControlPause className="mr-4"/>
                    <h6>Unlimited administrative controls</h6>
                </div>
                <div className="flex flex-row items-center text-gray-500 mb-3 font-serif text-sm">
                    <GiSandsOfTime className="mr-4"/>
                    <h6>{props.dataUse}</h6>
                </div>
            </div>
            <Link to="/register">
                <button className="w-72 mx-auto mt-32 flex items-center justify-center bg-front-500 rounded-2xl h-12 p-2 cursor-pointer text-white font-serif transition ease-in-out delay-100 hover:bg-front-600">Select</button>
            </Link>
        </div>
    );
}

export default PricingCard;