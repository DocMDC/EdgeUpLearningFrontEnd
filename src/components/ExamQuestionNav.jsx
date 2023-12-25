import React from 'react'
import flag from "../assets/blackFlag.png"
import notePresent from "../assets/notePresent.png"
import { useSelector } from "react-redux"
import { selectDarkModeEnabled } from '../redux/slices/darkModeSlice'

export default function ExamQuestionNav({listOfQuestions, questionIndex, modifyQuestionIndex}) {
  const darkModeEnabled = useSelector(selectDarkModeEnabled)

  function renderNavBackground(mapIndex) {
    if (mapIndex === questionIndex) {
      return (darkModeEnabled ? "flex p-2 cursor-pointer bg-dm-200 text-100" : "flex p-2 cursor-pointer bg-exam-secondary")
    } else if (mapIndex % 2 === 0) {
      return (darkModeEnabled ? "flex p-2 cursor-pointer bg-dm-300 text-100" : "flex p-2 cursor-pointer bg-400")
    } else {
      return (darkModeEnabled ? "flex p-2 cursor-pointer bg-dm-400 text-100" : "flex p-2 cursor-pointer bg-100")
    }
  }

  return (
    <div className={darkModeEnabled ? "w-20 h-full left-0 top-0 bottom-0 absolute flex flex-col bg-dm-400 overflow-y-scroll text-100 border-r border-exam-primary" : "w-20 h-full left-0 top-0 bottom-0 absolute flex flex-col bg-100 overflow-y-scroll text-exam-black border-r border-exam-primary"}>
      {listOfQuestions?.map((question, index) => (
          <div className={renderNavBackground(index)} key={index} onClick={() => modifyQuestionIndex(index)}>
            <span className="w-1/3 flex items-center">{(question.selection === null && !question.hasAnswered) ? "•" : " "}</span>
            <span className="w-1/3 text-xl flex items-center">{index + 1}</span>
            <div className="w-1/3 flex items-center">
              <img src={flag} alt="flag icon" className={question.flagged ? "h-5" : "hidden"} />
              <img src={notePresent} alt="note present" className={question.hasNote ? "h-5" : "hidden"} />
            </div>
          </div>
      ))}
    </div>
  )
}
