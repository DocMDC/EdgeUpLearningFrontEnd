import React, {useState, useRef} from 'react'
import { Link } from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"
import {AiFillCloseCircle} from "react-icons/ai"
import useToggleOnResize from "../hooks/useToggleOnResize"
import useClickOutNav from "../hooks/useClickOutNav"

export default function PublicNav() {

    const dropDownRef = useRef(null)
    const hamburgerRef = useRef(null)
    const [hamburgerIsClicked, setHamburgerIsClicked] = useState(false)

    useToggleOnResize(hamburgerIsClicked, setHamburgerIsClicked)

    useClickOutNav(dropDownRef, hamburgerRef, () => {
        setHamburgerIsClicked(false)
    })

  return (
    <>
        <Link to="/" className="mr-auto hover:text-front-600">
            <h1>Edge Up Learning</h1>
        </Link>
        <div className="flex items-center">
            <div 
                className="text-3xl text-gray-700 cursor-pointer md:hidden hover:text-front-600 transition ease-in-out delay-75"
                onClick={() => setHamburgerIsClicked(!hamburgerIsClicked)}
                ref={hamburgerRef}
            >
                <GiHamburgerMenu/>
            </div>
            <ul 
                className={hamburgerIsClicked ? "public-dropdown-nav bg-black" : "hidden md:flex md:justify-between md:items-center md:w-96"}
                ref={dropDownRef}
            >
                {/* {hamburgerIsClicked && <div className="bg-public-100 opacity-90 fixed mt-20 top-56 left-0 right-0 bottom-0"></div>} */}

                <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 cursor-pointer transition-all ease-in-out hover:text-public-300 md:hidden" 
                    onClick={() => setHamburgerIsClicked(false)}
                />
                <Link to="about" className="hover:text-front-500 transition ease-in-out delay-75" onClick={() => setHamburgerIsClicked(false)}>About</Link>
                <Link to="purchase" className="hover:text-front-500 transition ease-in-out delay-75" onClick={() => setHamburgerIsClicked(false)}>Pricing</Link>
                <Link to="login" className="hover:text-front-500 transition ease-in-out delay-75" onClick={() => setHamburgerIsClicked(false)}>Login</Link>
                <Link to="register" className="text-white text-center bg-front-500 p-2 w-24 rounded-lg border transition ease-in-out delay-75 border-front-500 hover:border hover:border-front-600 hover:bg-front-600" onClick={() => setHamburgerIsClicked(false)}>Register</Link>
            </ul>
        </div>
    </>
  )
}
