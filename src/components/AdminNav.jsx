import React, {useState, useRef} from 'react'
import { Link } from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"
import {AiFillCloseCircle} from "react-icons/ai"
import useToggleOnResize from "../hooks/useToggleOnResize"
import useClickOutNav from "../hooks/useClickOutNav"
import { useLogout } from "../hooks/useLogout"
import { IoIosCreate } from 'react-icons/io'
import { LuShieldQuestion } from "react-icons/lu";
import { MdQuiz } from "react-icons/md"
import { MdOutlineManageAccounts } from "react-icons/md"
import { MdOutlineAddCircle } from "react-icons/md";

// import { setExamNameModal, selectExamNameModal } from '../redux/slices/modalSlice'
// import { useDispatch, useSelector } from 'react-redux'

export default function AdminNav() {
    const logout = useLogout()
    const dropDownRef = useRef(null)
    const hamburgerRef = useRef(null)
    const [hamburgerIsClicked, setHamburgerIsClicked] = useState(false)
    
    useToggleOnResize(hamburgerIsClicked, setHamburgerIsClicked)

    useClickOutNav(dropDownRef, hamburgerRef, () => {
        setHamburgerIsClicked(false)
    })

    // const dispatch = useDispatch()
    // const examNameModalState = useSelector(selectExamNameModal) 
  
    // function toggleCreateExamModal() {
    //   dispatch(setExamNameModal(!examNameModalState))
    // }

  return (
    <>
        <Link to="/admin-dashboard" className="mr-auto md:min-h-[192px] md:flex md:items-center md:justify-center md:mr-0 md:w-full md:border-b md:border-600">
            <h1 className="hover:text-600">Edge Up Learning</h1>
        </Link>
        <div className="flex items-center md:w-full md:flex-grow md:flex-col md:justify-between">
            <div 
                className="text-3xl text-200 cursor-pointer md:hidden hover:text-600 transition ease-in-out delay-75"
                onClick={() => setHamburgerIsClicked(!hamburgerIsClicked)}
                ref={hamburgerRef}
            >
                <GiHamburgerMenu/>
            </div>
            <ul 
                className={hamburgerIsClicked ? "text-800 fixed top-0 mt-20 p-4 h-80 flex flex-col items-center justify-center space-y-4 rounded-b-md left-0 right-0 bg-200 shadow-lg transition-all ease-in-out z-40 md:flex md:justify-between md:items-center md:w-96" : "hidden md:flex md:flex-col md:w-full md:h-[450px] md:justify-between md:mt-20"}
                ref={dropDownRef}
            >
                <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 text-600 cursor-pointer transition-all ease-in-out hover:text-700 md:hidden" 
                    onClick={() => setHamburgerIsClicked(false)}
                />

                <Link to="add-questions" className="md:flex md:items-center md:space-x-4 md:px-4 md:hover:bg-600 md:h-12 md:text-xl" onClick={() => setHamburgerIsClicked(false)}>
                    <MdOutlineAddCircle className="hidden md:block md:text-200 md:text-lg"/>
                    <li className="hover:text-600 transition ease-in-out delay-75 md:hover:text-200">Add Question</li>
                </Link>

                <Link to="edit-questions" className="md:flex md:items-center md:space-x-4 md:px-4 md:hover:bg-600 md:h-12 md:text-xl" onClick={() => setHamburgerIsClicked(false)}>
                    <LuShieldQuestion className="hidden md:block md:text-200 md:text-lg"/>
                    <li className="hover:text-600 transition ease-in-out delay-75 md:hover:text-200">Edit Question</li>
                </Link>

                <Link to="/dashboard/create-exam" className="md:flex md:items-center md:space-x-4 md:px-4 md:hover:bg-600 md:h-12 md:text-xl" onClick={() => setHamburgerIsClicked(false)}>
                    <IoIosCreate className="hidden md:block md:text-200 md:text-lg"/>
                    <li className="hover:text-600 transition ease-in-out delay-75 md:hover:text-200">Create Exam</li>
                </Link>

                <Link to="/dashboard/my-exams" className="md:flex md:items-center md:space-x-4 md:px-4 md:hover:bg-600 md:h-12 md:text-xl" onClick={() => setHamburgerIsClicked(false)}>
                    <MdQuiz className="hidden md:block md:text-200 md:text-lg"/>
                    <li className="hover:text-600 transition ease-in-out delay-75 md:hover:text-200">My Exams</li>
                </Link>

                <Link to="/dashboard/account" className="md:flex md:items-center md:space-x-4 md:px-4 md:hover:bg-600 md:h-12 md:text-xl" onClick={() => setHamburgerIsClicked(false)}>
                    <MdOutlineManageAccounts className="hidden md:block md:text-200 md:text-lg"/>
                    <li className="hover:text-600 transition ease-in-out delay-75 md:hover:text-200">Account</li>
                </Link>

                <button onClick={() => logout()} className="md:hidden">
                <Link to="/login" >
                    <li className="text-white text-center bg-600 p-1 w-18 rounded-lg border transition ease-in-out delay-75 border-600 hover:border hover:border-600 hover:bg-700">Logout</li>
                </Link>
                </button>
            </ul>
            <button onClick={() => logout()} className="hidden md:block md:h-48 w-full md:px-4 md:text-xl">
                <Link to="/login" >
                    <div className="text-white text-center bg-600 p-1 w-18 rounded-lg border transition ease-in-out delay-75 border-600 hover:border hover:border-700 hover:bg-700">Logout</div>
                </Link>
            </button>
        </div>
    </>
  )
}

