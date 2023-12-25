import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useGetExamsQuery } from '../../redux/slices/examsApiSlice'
import { FaPlay } from "react-icons/fa";

export default function UserExams() {
  const navigate = useNavigate()
  const { data: examData, error, isLoading, refetch } = useGetExamsQuery()

  useEffect(() => {
    refetch()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  function handleClickedExam(examId) {
    navigate(`/exam/${examId}`)
  }

  return (
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-xl tracking-wider text-500">
        <h1>My Exams</h1>
      </div>

      <div className="bg-100 mt-4 min-h-[1000px] p-4">
        {examData.allExams.length > 0
        ? 
        examData.allExams.map((exam) => (
          <div className="h-14 w-full bg-400 flex items-center px-4 justify-between text-sm mb-10 lg:text-base xl:text-lg" key={exam.uniqueId}>
            <h6>ID: <span className="text-blue-500">{exam.uniqueId.slice(0, 7)} ...</span></h6>
            <h6>Score: <span className="text-blue-500">{exam.score}</span></h6>
            <h6>Mode: <span className="text-blue-500">{exam.mode.timed ? "Timed" : "Untimed"}</span>, <span className="text-blue-500">{exam.mode.tutor ? "Tutored" : "Untutored"}</span></h6>
            <h6>#Q: <span className="text-blue-500">{exam.numberOfQuestions}</span></h6>
            <FaPlay 
              className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600"
              onClick={() => handleClickedExam(exam.uniqueId)}
            />
          </div>
        ))
        :
        <div>
          <h6 className="text-center">You have no saved exams</h6>
        </div>
      }
      </div>
    </div>
  )
}
