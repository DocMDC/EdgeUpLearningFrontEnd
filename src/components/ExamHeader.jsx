import React, {useState, useRef} from 'react'
import flag from "../assets/flag.png"
import previousArrow from "../assets/backArrow.png"
import nextArrow from "../assets/forwardArrow.png"
import lab from "../assets/lab.png"
import notes from "../assets/notes.png"
import calculator from "../assets/calculator.png"
import reverseColor from "../assets/reverseColor.png"
import {GiHamburgerMenu, GiArtificialIntelligence} from "react-icons/gi"
import {AiFillCloseCircle} from "react-icons/ai"
import useClickOutNav from "../hooks/useClickOutNav"
import useToggleOnResize from "../hooks/useToggleOnResize"
import { useUpdateFlaggedQuestionsMutation } from "../redux/slices/examsApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectDarkModeEnabled, setDarkModeEnabled } from '../redux/slices/darkModeSlice'

export default function ExamHeader({questionIndex, decrementQuestionIndex, incrementQuestionIndex, listOfQuestions, id, currentQuestion, setRefetchCount, isLabValuesOpen, setIsLabValuesOpen, isNotesOpen, setIsNotesOpen, isAiOpen, setIsAiOpen, isCalculatorOpen, setIsCalculatorOpen}) {
    const [updateQuestionFlag] = useUpdateFlaggedQuestionsMutation()
    
    const darkModeEnabled = useSelector(selectDarkModeEnabled)
    const dispatch = useDispatch()

    const navRef = useRef(null)
    const hamburgerRef = useRef(null)
    const [hamburgerIsClicked, setHamburgerIsClicked] = useState(false)

    useToggleOnResize(hamburgerIsClicked, setHamburgerIsClicked)

    useClickOutNav(navRef, hamburgerRef, () => {
        setHamburgerIsClicked(false)
    })

    async function toggleFlag() {
        try {
            await updateQuestionFlag({
                examId: id,
                questionIndex: questionIndex,
            })
            setRefetchCount((prevCount) => prevCount + 1)
        } catch (err) {
            console.log(err)
        }
    }

    return (
    <div className={darkModeEnabled ? "fixed top-0 left-20 right-0 h-14 p-2 bg-dm-300 text-exam-white flex items-center z-[100]" : "fixed top-0 left-20 right-0 h-14 p-2 bg-exam-secondary text-exam-white flex items-center z-[100]"}>
        <div className={darkModeEnabled ? "max-w-[110px] h-10 border-t-2 border-l-2 border-dm-400 rounded-md flex items-center justify-center px-1" : "max-w-[110px] h-10 border-t-2 border-l-2 border-exam-boxShadow rounded-md flex items-center justify-center px-1"}>
            <p className="text-xs">Item: <span>{questionIndex + 1}</span> of <span>{listOfQuestions.length}</span>
            </p>
        </div>

        <div className="w-30 h-full flex items-center cursor-pointer px-2 ml-4 hover:bg-[#4783bd99] hover:rounded-md" onClick={toggleFlag}>
            <div className="flex items-center justify-center space-x-1">
                <input 
                    type="checkbox"
                    name="mark"
                    id="mark"
                    checked={currentQuestion?.flagged || false}
                    className="cursor-pointer"
                    onChange={() => {}}
                />
                <img src={flag} alt="flag" className="h-4 w-4"/>
                <label htmlFor="mark" className="cursor-pointer">Mark</label>
            </div>
        </div>

        <div className="flex justify-center w-52 lg:w-[275px] xl:w-[375px] 2xl:w-[650px] mr-auto">
            <div className="w-20 flex flex-col justify-center items-center cursor-pointer hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => decrementQuestionIndex()}>
                <img src={previousArrow} alt="previous-arrow" className="w-8 h-8"/>
                <p className="text-sm">Previous</p>
            </div>
            <div className="w-20 flex flex-col justify-center items-center cursor-pointer hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => incrementQuestionIndex()}>
                <img src={nextArrow} alt="next-arrow" className="w-8 h-8"/>
                <p className="text-sm mr-1">Next</p>
            </div>
        </div>

        <div className="lg:flex lg:w-[450px] lg:items-center lg:justify-center xl:w-[600px]">
            <div 
                className="text-3xl cursor-pointer hover:text-gray-400 lg:hidden"
                onClick={() => setHamburgerIsClicked(!hamburgerIsClicked)}
                ref={hamburgerRef}
            >
                <GiHamburgerMenu/>
            </div>
            <ul
                className={hamburgerIsClicked ? "text-white fixed top-0 right-0 left-20 h-56 mt-14 p-4 flex flex-col items-center justify-center space-y-4 bg-exam-secondary opacity-90 transition-all ease-in-out z-10" : "hidden lg:flex w-full"}
                ref={navRef}
            >
                <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 cursor-pointer transition-all ease-in-out z-10 hover:text-black lg:hidden"
                    onClick={() => setHamburgerIsClicked(false)}
                />

                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-center justify-between cursor-pointer mr-2 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => setIsLabValuesOpen(!isLabValuesOpen)}>
                        <img src={lab} alt="lab icon" className="h-6" />
                        <p className="text-sm">Lab Values</p>
                    </div>

                    <div className="flex flex-col items-center justify-between  cursor-pointer mr-2 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => setIsNotesOpen(!isNotesOpen)}>
                        <img src={notes} alt="lab icon" className="h-6" />
                        <p className="text-sm">Notes</p>
                    </div>

                    <div className="flex flex-col items-center justify-between  cursor-pointer mr-2 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}>
                        <img src={calculator} alt="lab icon" className="h-6" />
                        <p className="text-sm">Calculator</p>
                    </div>

                    <div className="flex flex-col items-center justify-between  cursor-pointer mr-2 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => setIsAiOpen(!isAiOpen)}>
                        <GiArtificialIntelligence className="w-6 h-6" />
                        <p className="text-sm">Ask AI</p>
                    </div>

                    <div className="flex flex-col items-center justify-between cursor-pointer w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => dispatch(setDarkModeEnabled(!darkModeEnabled))}>
                        <img src={reverseColor} alt="lab icon" className="h-6" />
                        <p className="text-sm">Dark Mode</p>
                    </div>
                </div>
            </ul>
        </div>
    </div>
  )
}
