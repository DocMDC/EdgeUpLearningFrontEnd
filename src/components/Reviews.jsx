import React from 'react';
import {FaQuoteRight} from "react-icons/fa"
import ReviewCard from "./ReviewCard"
import review1 from "../assets/review1.jpg"
import review2 from "../assets/review2.png"
import review3 from "../assets/review3.jpg"

function Reviews() {
    return (
        <div className="min-h-[90vh] flex flex-col items-center px-20 relative">
            <FaQuoteRight className="text-[150px] text-gray-100 absolute z-0 top-0 motion-safe:animate-bounce-slow"/>
            <h1 className="text-4xl font-serif mb-20 mt-14 text-center md:text-5xl z-10">What our customers are saying</h1>
            <div className="lg:flex lg:flex-row">
                <ReviewCard 
                    image={review1}
                    review='Edge Up Learning is a gamechanger! Instead of AI feeling like a threat to education, now it has become an invaluable asset for learning.'
                    name='Jonathan Smith'
                    grade='MS I'
                    school='University of Utah'
                />
                <ReviewCard 
                    image={review2}
                    review='I love this! Now I have the ability to bring AI into my study plan seemlessly and help me prepare for my board exams with ease. Thank you!'
                    name='Emily VanDenBerghe'
                    grade='MS III'
                    school='Vanderbilt University'
                />
                <ReviewCard 
                    image={review3}
                    review='This has revolutionized the way I learn. I can now access AI with ease. If you are a medical student or a resident you have to try this!'
                    name='Raeshun Glover'
                    grade='Pathology resident'
                    school='Harvard'
                />
            </div>
        </div>
    );
}

export default Reviews;