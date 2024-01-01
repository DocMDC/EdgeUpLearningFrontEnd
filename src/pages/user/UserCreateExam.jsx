import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import TestMode from "../../components/TestMode"
import QuestionMode from "../../components/QuestionMode"
import SelectSubjects from "../../components/SelectSubjects"
import SelectNumberOfQuestions from "../../components/SelectNumberOfQuestions"
import { nanoid } from "nanoid"
import { useFilterQuestionsQuery, usePrepareQuestionsMutation } from "../../redux/slices/questionsApiSlice"
import {Context} from "../../Context"

export default function UserCreateExam() {
  const navigate = useNavigate()
  const { data: filteredQuestionData, error, isLoading, refetch } = useFilterQuestionsQuery()
  const [prepareQuestions] = usePrepareQuestionsMutation()
  
  const { createExamForm, setCreateExamForm } = useContext(Context)
  const incorrectCountRef = useRef()
  const unusedCountRef = useRef()

  const [incorrectCountValue, setIncorrectCountValue] = useState(null)
  const [unusedCountValue, setUnusedCountValue] = useState(null)
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [filteredOrgansBySubjects, setFilteredOrgansBySubjects] = useState({})
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(0)
  const [finalQuestionCountLength, setFinalQuestionCountLength] = useState(0)

  useEffect(() => {
    if (incorrectCountRef.current) {
      setIncorrectCountValue(parseInt(incorrectCountRef.current.innerHTML, 10))
    }
    if (unusedCountRef.current) {
      setUnusedCountValue(parseInt(unusedCountRef.current.innerHTML, 10))
    }
  }, [filteredQuestionData])

  useEffect(() => {
    updateSelections();
  }, [createExamForm.unused, createExamForm.incorrect])

  useEffect(() => {
    updateMaximumQuestionCount();
  }, [createExamForm])

  useEffect(() => {
    refetch()
  }, [])

  //When the user navigates to the page, clear out the state in Context so that the form is clear
  useEffect(() => {
      setFinalQuestionCountLength(0)
      setSelectedNumberOfQuestions(0)
      setCreateExamForm({
        tutorMode: false,
        timedMode: false,
        unused: false,
        incorrect: false,
        anatomy: false,
        microbiology: false,
        biochemistry: false,
        embryology: false,
        immunology: false,
        pathology: false,
        physiology: false,
        pharmacology: false,
      })
      setFilteredOrgansBySubjects({})
      setSelectedSubjects([])
      updateMaximumQuestionCount()
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const incorrectQuestions = filteredQuestionData?.incorrectQuestions 
  const unusedQuestions = filteredQuestionData?.unusedQuestions
  const allOrgans = filteredQuestionData?.allOrganSystemsQuestions

  //Reformat unused and incorrect question data from server so that it's in JSON format and can be easily passed down to the SelectSubjects component as props
  let unusedQuestionsBySubject = {}
  let incorrectQuestionsBySubject = {}
  let defaultBySubject = {
    "anatomy": [],
    "microbiology": [],
    "biochemistry": [],
    "embryology": [],
    "immunology": [],
    "pathology": [],
    "physiology": [],
    "pharmacology": [],
  }

  function filterUnusedAndIncorrectQuestions() {
    const subjects = [
      "anatomy",
      "microbiology",
      "biochemistry",
      "embryology",
      "immunology",
      "pathology",
      "physiology",
      "pharmacology",
    ]

    subjects.forEach((subject) => {
      unusedQuestionsBySubject[subject] = unusedQuestions.filter(
        (question) => question.subject === subject
      )
    })

    subjects.forEach((subject) => {
      incorrectQuestionsBySubject[subject] = incorrectQuestions.filter(
        (question) => question.subject === subject
      )
    })
  }

  filterUnusedAndIncorrectQuestions()

  //Update subject selection and filter allOrgans data such that only those questions with the corresponding selected subjects are available in the filteredOrgansBySubjects state
  function handleSubjectSelection(subject, isSelected) {
    setSelectedSubjects((prevSelectedSubjects) => {
      const updatedSubjects = isSelected
        ? [...prevSelectedSubjects, subject]
        : prevSelectedSubjects.filter((selectedSubject) => selectedSubject !== subject)
    //selectedSubjects is an array of strings with the selected subjects (eg, ['anatomy', 'microbiology', etc.])
  
      const newFilteredOrgansBySubjects = {}
  
      Object.keys(allOrgans).forEach((organSystem) => {
        const filteredQuestions = allOrgans[organSystem].filter((organ) =>
          updatedSubjects.includes(organ.subject)
        )
  
        if (filteredQuestions.length > 0) {
          newFilteredOrgansBySubjects[organSystem] = filteredQuestions
        }
      })
  
      setFilteredOrgansBySubjects(newFilteredOrgansBySubjects)
      return updatedSubjects
    })
  }
  
  const filterSelectedQuestions = () => {
      // Check if filteredOrgansBySubjects is defined and is an object
    if (!filteredOrgansBySubjects || typeof filteredOrgansBySubjects !== 'object') {
      console.error('filteredOrgansBySubjects is not an object or is undefined.');
      return []; // Return an empty array or handle this case as appropriate
    }

   //Randomly select number of questions from filteredOrgansBySubjects based on finalQuestionCountLength
  //Convert to an array of questions

  const flattenedArray = Object.keys(filteredOrgansBySubjects).flatMap((organSystem) => {
    return filteredOrgansBySubjects[organSystem]
  })

  //TODO: Should implement a shuffled array here before giving the user the number of questions they request

  //pick the first elements from the array based on the user's number of questions selected
  const filteredArrayByRequestedCount = flattenedArray.slice(0, parseInt(selectedNumberOfQuestions))

  //change the used value to true before submission to server
  const updateUsedValue = filteredArrayByRequestedCount.map((question) => ({
    ...question,
    used: true,
  }))
  return updateUsedValue
 }


  async function submitCreateExam(e) {
    e.preventDefault()
    if (parseInt(selectedNumberOfQuestions) <= 0) {
      return 
    }
    const examSessionId = nanoid()
    // generate random list based on subject and number of questions user selects
    const filteredList = filterSelectedQuestions()
    const timed = createExamForm.timedMode
    const tutor = createExamForm.tutorMode

    try {
      const response = await prepareQuestions({
        filteredList,
        timed,
        tutor,
        examSessionId
      })

      navigate(`/exam/${examSessionId}`)
    } catch (err) {
      console.log(err)
    }
  }

  function handleSelectNumberOfQuestions(e) {
    const stringedNumber = e.target.value
    const number = parseInt(stringedNumber)

    //Don't let user select a number outside the bounds of available questions
    if (number > finalQuestionCountLength || number <= 0) {
      return
    }
    setSelectedNumberOfQuestions(stringedNumber)
  }

  function updateMaximumQuestionCount() {
    setFinalQuestionCountLength((prev) => {
      if (!createExamForm.anatomy && !createExamForm.microbiology && !createExamForm.biochemistry && !createExamForm.embryology && !createExamForm.immunology && !createExamForm.pathology && !createExamForm.physiology && !createExamForm.pharmacology) {
        setSelectedNumberOfQuestions(0)
        return 0;
      }
      // return Object.keys(filteredOrgansBySubjects).reduce((total, organSystem) => {
      //   return total + filteredOrgansBySubjects[organSystem].length;
      // }, 0);
      return Object.keys(filteredOrgansBySubjects).reduce((total, organSystem) => {
        const unusedQuestions = filteredOrgansBySubjects[organSystem].filter(
          (question) => !question.used
        )
        return total + unusedQuestions.length;
      }, 0)
    })
  }
  
  //If unused and incorrect are not selected, remove all selections from the subjects component and don't allow user to input number of questions
  function updateSelections() {
    if (!createExamForm.unused && !createExamForm.incorrect) {
          setFinalQuestionCountLength(0)
          setSelectedNumberOfQuestions(0)
          setCreateExamForm((prev) => ({
            ...prev,
            anatomy: false,
            microbiology: false,
            biochemistry: false,
            embryology: false,
            immunology: false,
            pathology: false,
            physiology: false,
            pharmacology: false,
          }))
          setFilteredOrgansBySubjects({})
          setSelectedSubjects([])
          updateMaximumQuestionCount()
      }
  }
  
  return (
    <>
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
        <h1>Create Exam</h1>
      </div>
      
      <div className="bg-100 mt-4 pb-4 min-h-[1000px]">
        <form onSubmit={(e) => submitCreateExam(e)}>
          <TestMode/>
          <QuestionMode
            unusedQuestions={unusedQuestions}
            incorrectQuestions={incorrectQuestions}
            incorrectCountRef={incorrectCountRef}
            unusedCountRef={unusedCountRef}
            incorrectCountValue={incorrectCountValue}
            unusedCountValue={unusedCountValue}
          />
           <SelectSubjects
            filteredSubjectsObj={
              createExamForm.unused
                ? unusedQuestionsBySubject
                : createExamForm.incorrect
                ? incorrectQuestionsBySubject
                : defaultBySubject
            }
            incorrectCountValue={incorrectCountValue}
            unusedCountValue={unusedCountValue}
            onSubjectSelection={handleSubjectSelection}
          />
          <SelectNumberOfQuestions
            finalQuestionCountLength={finalQuestionCountLength}
            handleSelectNumberOfQuestions={handleSelectNumberOfQuestions}
            selectedNumberOfQuestions={selectedNumberOfQuestions}
          />
          <button className="ml-6 primary-btn">Create Exam</button>
        </form>
      </div>
    </div>
    </>
  );
}

