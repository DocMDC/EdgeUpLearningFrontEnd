import React from "react"
import {MdOutlineDashboardCustomize} from "react-icons/md" 
import {AiOutlineFlag} from "react-icons/ai"
import {BsFillJournalBookmarkFill} from "react-icons/bs"
import {GiArtificialIntelligence} from "react-icons/gi"

export default function ProductDetails() {

    return (
        <div className="h-[1200px] relative bg-[#ebeff8] flex flex-col items-center justify-center md:h-[1000px]">
            <div className="w-screen font-serif px-10 max-w-sm md:max-w-2xl">
                <h4 className="text-xl text-front-600">Why Edge Up Learning</h4>
                <h1 className="text-4xl mt-8 mb-16">A technology-first approach to embracing AI on your medical journey</h1>
                
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:mb-12 md:space-x-12">
                        <div className="flex flex-col mb-10 space-y-3">
                            <MdOutlineDashboardCustomize className="text-front-600 text-4xl"/>
                            <h1>Flexible</h1>
                            <h2 className="text-gray-500 max-w-xs">Our dashboard is built with flexibility and customization in mind so that students can learn on their own terms</h2>
                        </div>
                        
                        <div className="flex flex-col mb-10 space-y-3">
                            <AiOutlineFlag className="text-front-600 text-4xl"/>
                            <h1>Automated</h1>
                            <h2 className="text-gray-500 max-w-xs">Our technology automatically intgrates the context of each question with AI so you can save time and focus on learning</h2>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:space-x-12">
                        <div className="flex flex-col mb-10 space-y-3">
                            <BsFillJournalBookmarkFill className="text-front-600 text-4xl"/>
                            <h1>Simple</h1>
                            <h2 className="text-gray-500 max-w-xs">Easily integrated with your medical school curricula</h2>
                        </div>
                        
                        <div className="flex flex-col mb-10 space-y-3">
                            <GiArtificialIntelligence className="text-front-600 text-4xl"/>
                            <h1>Powerful</h1>
                            <h2 className="text-gray-500 max-w-xs">Powered by the most cutting edge artificial intelligence technology from Open AI</h2>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}