import React from 'react'
import {MdSchool} from "react-icons/md"

export default function ReviewCard(props) {
  return (
    <div className="min-w-[320px] max-w-[320px] bg-white h-auto shadow-xl px-10 py-5 border-t border-front-500 z-10 flex flex-col items-center mb-14 sm:min-w-[400px] sm:max-w-[320px] lg:max-w-[280px] lg:min-w-[280px] lg:mx-6">
        <p className="text-center text-gray-500 font-serif mb-4">{props.review}</p>
        <img src={props.image} alt='first review' className="h-24 w-24 rounded-full object-cover object-top mb-4"/>
        <h2 className="text-xl mb-2">{props.name}</h2>
        <h4 className="text-sm text-gray-500 mb-4">{props.grade}</h4>
        <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
        <div className="flex flex-row w-52 items-center">
            <MdSchool className="mr-auto"/>
            <h4 className="text-front-500">{props.school}</h4>
        </div>
    </div>
  )
}
