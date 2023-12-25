import React from 'react'
import desk from "../assets/desk.jpg"
import team2 from "../assets/teamwork2.jpg"
import Footer from "../components/Footer"

export default function About() {
  return (
    <>
      <section className="bg-secondary min-h-[500px] pt-16 px-16 flex flex-col items-center justify-center md:flex-row md:px-10">
        <div className="text-center md:w-1/2 md:px-4 lg:px-20 xl:px-32 2xl:px-52">
            <h1 className="text-5xl font-serif lg:text-6xl">So how did <span className="text-front-500">Edge Up Learning</span> come to be?</h1>
        </div>
        <div className="mt-16 font-serif text-lg px-2 md:mt-0 md:w-1/2 lg:px-12 xl:px-32 2xl:px-56">
            <h2>Well for us, it came from the heart and soul of co-founders with a deep passion for education and the desire to help accelerate learning through artifical intelligence.</h2>
        </div>
      </section>

      <section className="h-[700px]">
          <img src={team2} alt="team work image 1" className="h-full w-full object-cover"/>
      </section>

      <section className="min-h-[500px] bg-secondary flex flex-col items-center justify-center px-16 py-16 md:flex-row lg:px-20 xl:px-32 2xl:px-52">
        <h2 className="text-lg font-serif mb-10 md:mb-0 md:w-1/2 md:px-10 lg:px-16">Our mission is to build the framework for AI to be accessible in medical education in way that is effective and maximizes learning for the student.</h2>
        <img src={desk} alt="team work image 1" className="md:w-1/2 max-h-72 object-contain"/>
      </section>
      <Footer />
    </>
  )
}
