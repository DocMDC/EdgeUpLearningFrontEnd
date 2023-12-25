import React from 'react'
import {AiFillCloseCircle} from "react-icons/ai"
// import {useSubmitExamMutation} from "../redux/slices/examsApiSlice"
// import { setEndExamModal, selectEndExamModal } from '../redux/slices/modalSlice'
// import { useDispatch, useSelector } from 'react-redux'

export default function EndExamModal({endExamModalState, setEndExamModalState, handleSubmitExam}) {
//   const endExamModalState = useSelector(selectEndExamModal) 
//   const dispatch = useDispatch()

  return (
      <>
      {endExamModalState &&
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 opacity-80 flex items-center justify-center z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-100 flex flex-col items-center rounded-md md:h-[375px] md:w-[375px] z-[100]">
                <AiFillCloseCircle className="absolute top-2 right-2 text-xl cursor-pointer hover:text-600" onClick={() => setEndExamModalState(!endExamModalState)}/>
                <h1 className="text-xl text-center border-b border-black mt-10 mb-10">End Block</h1>
                <h2 className="text-center mb-10 w-1/2">Are you sure you want to end this block? Any unanswered questions will be forfeited.</h2>
                <button className="secondary-btn" onClick={(e) => {
                    handleSubmitExam(e)
                }}>End</button>
            </div>
        </>
    }
    </>
  )
}
