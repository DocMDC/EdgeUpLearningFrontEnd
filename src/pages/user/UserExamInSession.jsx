import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ExamHeader from "../../components/ExamHeader"
import ExamQuestionNav from "../../components/ExamQuestionNav"
import ExamMainContent from "../../components/ExamMainContent"
import ExamFooter from "../../components/ExamFooter"
import ExamLabValues from "../../components/ExamLabValues"
import ExamNotes from "../../components/ExamNotes"
import ExamAi from "../../components/ExamAi"
import ExamCalculator from "../../components/ExamCalculator"
import { useGetExamQuery } from '../../redux/slices/examsApiSlice'
import { useSubmitExamMutation } from "../../redux/slices/examsApiSlice"

import EndExamModal from "../../components/EndExamModal"

export default function UserExamInSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: examData, error, isLoading, refetch } = useGetExamQuery(id)
  const [submitExam] = useSubmitExamMutation()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [refetchCount, setRefetchCount] = useState(0)
  const [endExamModalState, setEndExamModalState] = useState(false)
  const [isLabValuesOpen, setIsLabValuesOpen] = useState(false)
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [isAiOpen, setIsAiOpen] = useState(false)
  const [AIQuestion, setAIQuestion] = useState('')
  const [AIAnswer, setAIAnswer] = useState('')
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  useEffect(() => {
    refetch()
  }, [refetchCount])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  const currentQuestion = examData?.exam[0]?.listOfQuestions[questionIndex]
  const listOfQuestions = examData?.exam[0]?.listOfQuestions
  const selection = examData?.exam[0]?.listOfQuestions[questionIndex]?.selection
  const mode = examData?.exam[0]?.mode
  const score = examData?.exam[0]?.score

  function incrementQuestionIndex() {
    if (questionIndex >= listOfQuestions.length - 1) {
      setQuestionIndex(0)
      setIsNotesOpen(false)
    } else {
      setQuestionIndex(questionIndex + 1)
      setIsNotesOpen(false)
      setIsAiOpen(false)
      setAIQuestion('')
      setAIAnswer('')
    }
  }

  function decrementQuestionIndex() {
    if (questionIndex <= 0) {
      setQuestionIndex(listOfQuestions.length - 1)
      setIsNotesOpen(false)
      setIsAiOpen(false)
      setAIQuestion('')
      setAIAnswer('')
    } else {
      setQuestionIndex(questionIndex - 1)
      setIsNotesOpen(false)
      setIsAiOpen(false)
      setAIQuestion('')
      setAIAnswer('')
    }
  }

  function modifyQuestionIndex(mappedIndex) {
    setQuestionIndex(mappedIndex)
    setIsNotesOpen(false)
    setIsAiOpen(false)
    setAIQuestion('')
    setAIAnswer('')
  }

  function handleSuspendExam() {
    navigate("/dashboard/my-exams")
  }

  async function handleSubmitExam(e) {
    if (e) {
      e.preventDefault()
    }
      try {
          await submitExam({
              examId: id,
              examTime: 1
          })
          navigate('/dashboard/my-exams')
      } catch (err) {
          console.log(err)
      }
  }

  const time = new Date()
  time.setSeconds(time.getSeconds() + listOfQuestions.length * 90)
  return (
    <>
        <EndExamModal
          endExamModalState={endExamModalState}
          setEndExamModalState={setEndExamModalState}
          id={id}
          listOfQuestions={listOfQuestions}
          handleSubmitExam={handleSubmitExam}
        />
        <ExamHeader 
          questionIndex={questionIndex}
          incrementQuestionIndex={incrementQuestionIndex}
          decrementQuestionIndex={decrementQuestionIndex}
          listOfQuestions={listOfQuestions}
          id={id}
          currentQuestion={currentQuestion}
          setRefetchCount={setRefetchCount}
          isLabValuesOpen={isLabValuesOpen}
          setIsLabValuesOpen={setIsLabValuesOpen}
          setIsNotesOpen={setIsNotesOpen}
          isNotesOpen={isNotesOpen}
          setIsAiOpen={setIsAiOpen}
          isAiOpen={isAiOpen}
          isCalculatorOpen={isCalculatorOpen}
          setIsCalculatorOpen={setIsCalculatorOpen}
        />
        <ExamQuestionNav
          listOfQuestions={listOfQuestions}
          questionIndex ={questionIndex}
          modifyQuestionIndex={modifyQuestionIndex}
          selection={selection}
        />
        <ExamMainContent
          currentQuestion={currentQuestion}
          questionIndex={questionIndex}
          id={id}
          selection={selection}
          setRefetchCount={setRefetchCount}
          mode={mode}
          incrementQuestionIndex={incrementQuestionIndex}
        />
        <ExamLabValues 
          isLabValuesOpen={isLabValuesOpen}
          setIsLabValuesOpen={setIsLabValuesOpen}
        />
        <ExamNotes
          setIsNotesOpen={setIsNotesOpen}
          isNotesOpen={isNotesOpen}
          currentQuestion={currentQuestion}
          setRefetchCount={setRefetchCount}
          id={id}
          questionIndex={questionIndex}
        />
        <ExamCalculator 
          isCalculatorOpen={isCalculatorOpen}
          setIsCalculatorOpen={setIsCalculatorOpen}
        />
        <ExamAi
          setIsAiOpen={setIsAiOpen}
          isAiOpen={isAiOpen}
          currentQuestion={currentQuestion}
          AIQuestion={AIQuestion}
          setAIQuestion={setAIQuestion}
          AIAnswer={AIAnswer}
          setAIAnswer={setAIAnswer}
        />
        <ExamFooter
          handleSuspendExam={handleSuspendExam}
          endExamModalState={endExamModalState}
          setEndExamModalState={setEndExamModalState}
          score={score}
          handleSubmitExam={handleSubmitExam}
          expiryTimestamp={time}
          mode={mode}
        />
    </>
  )
}