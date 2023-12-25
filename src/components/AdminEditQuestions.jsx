import React, { useState, useEffect } from 'react'
import { useGetQuestionsQuery, useLazyFetchQuestionByIdQuery, useEditQuestionMutation, useDeleteQuestionMutation } from "../redux/slices/questionsApiSlice"
import { IoIosArrowDropdown } from "react-icons/io";

export default function AdminEditQuestions() {
  const { data: questionsData, error, isLoading, refetch } = useGetQuestionsQuery()
  const [getQuestionData] = useLazyFetchQuestionByIdQuery()
  const [editQuestionData] = useEditQuestionMutation()
  const [deleteQuestion] = useDeleteQuestionMutation()

  const [openQuestions, setOpenQuestions] = useState({})
  const [editedQuestions, setEditedQuestions] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await refetch()
    };

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const questions = questionsData.questionsObj

  async function handleGetQuestionById(questionId) {
    try {
      const response = await getQuestionData(questionId)
      const questionData = response.data.questionObj

      setEditedQuestions((prevEditedQuestions) => ({
        ...prevEditedQuestions,
        [questionId]: questionData,
      }));
    } catch (err) {
      console.log(err)
    }
  }

  function handleEditQuestionInputs(questionId, key, value) {
    setEditedQuestions((prevEditedQuestions) => ({
      ...prevEditedQuestions,
      [questionId]: {
        ...prevEditedQuestions[questionId],
        [key]: value,
      },
    }))
  }

  function handleOpenQuestion(questionId) {
    setOpenQuestions((prevOpenQuestions) => ({
      ...prevOpenQuestions,
      [questionId]: !prevOpenQuestions[questionId],
    }))

    handleGetQuestionById(questionId)
  }

  function renderDynamicChoices(data, questionId) {
    return data.map((choice, index) => (
      <div key={index}>
        <label htmlFor={`choice${index + 1}`}>{`Choice ${index + 1}: `}</label>
        <input
          type="text"
          id={`choice${index + 1}`}
          value={editedQuestions[questionId]?.choices[index] || ''}
          onChange={(e) => handleEditQuestionInputs(questionId, 'choices', [...editedQuestions[questionId]?.choices.slice(0, index), e.target.value, ...editedQuestions[questionId]?.choices.slice(index + 1)])}
          className="p-2 rounded-md mb-4 w-full"
        />
      </div>
    ));
  }
  
  function renderDynamicExplanations(data, questionId) {
    return data.map((explanation, index) => (
      <div key={index}>
        <label htmlFor={`explanation${index + 1}`}>{`Explanation ${index + 1}: `}</label>
        <input
          type="text"
          id={`explanation${index + 1}`}
          value={editedQuestions[questionId]?.explanations[index] || ''}
          onChange={(e) => handleEditQuestionInputs(questionId, 'explanations', [...editedQuestions[questionId]?.explanations.slice(0, index), e.target.value, ...editedQuestions[questionId]?.explanations.slice(index + 1)])}
          className="p-2 rounded-md mb-4 w-full"
        />
      </div>
    ));
  }

  async function handleSubmitEdit(e, questionId) {
    e.preventDefault()
    try {
      const response = await editQuestionData({
        questionId: questionId,
        subject: editedQuestions[questionId]?.subject,
        organSystem: editedQuestions[questionId]?.organSystem,
        vignette: editedQuestions[questionId]?.vignette,
        choices: editedQuestions[questionId]?.choices,
        explanations: editedQuestions[questionId]?.explanations,
        correctChoice: editedQuestions[questionId]?.correctChoice
      })

      // Refetch only after a successful edit
      if (response.data && response.data.message === 'Question successfully edited') {
        refetch();
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteQuestion(e, questionId) {
    e.preventDefault()
  
    try {
      const response = await deleteQuestion(questionId)
  
      if (response.data && response.data.message === 'Question successfully deleted') {
        // Remove the deleted question from state
        setEditedQuestions((prevEditedQuestions) => {
          const { [questionId]: deletedQuestion, ...rest } = prevEditedQuestions
          return rest
        })
  
        setOpenQuestions((prevOpenQuestions) => {
          const { [questionId]: deletedOpenQuestion, ...rest } = prevOpenQuestions
          return rest
        });

        refetch();
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
        <h1>Edit Questions</h1>
      </div>
  
      <div className="bg-100 mt-4 pb-4 min-h-[1000px] p-4">
        
        {questions &&
          questions.map((question) => (
            <React.Fragment key={question._id}>
              <div key={question._id} className={openQuestions[question._id] ? "flex items-center bg-600 rounded-t-md text-white p-4" : "flex items-center bg-600 rounded-t-md text-white p-4 mb-10 rounded-b-md"}>
                <div className="flex flex-col items-start mr-auto">
                  <h6>QuestionID: {question._id}</h6>
                  <h6>Subject: {editedQuestions[question._id]?.subject || question.subject}</h6>
                  <h6>Organ System: {editedQuestions[question._id]?.organSystem || question.organSystem}</h6>
                  <h6>Vignette: {editedQuestions[question._id]?.vignette.slice(0, 25) || question.vignette.slice(0, 25)} ...</h6>
                </div>

                <IoIosArrowDropdown 
                  className="text-4xl cursor-pointer hover:text-black" 
                  onClick={() => handleOpenQuestion(question._id)}
                />
              </div>

              {openQuestions[question._id] && (
                  <div className="bg-gray-300 min-h-12 w-full mb-10 rounded-b-md p-4">
                    <form className="flex flex-col" onSubmit={(e) => handleSubmitEdit(e, question._id)}>
                      {/* Input fields for editing question details */}
                      <label htmlFor={`subject${question._id}`} className="mr-2">
                        Subject:
                      </label>
                      <select
                        id={`subject${question._id}`}
                        value={editedQuestions[question._id]?.subject || ''}
                        onChange={(e) => handleEditQuestionInputs(question._id, 'subject', e.target.value)}
                        className="p-2 rounded-md mb-4"
                      >
                        <option value="anatomy">Anatomy</option>
                        <option value="microbiology">Microbiology</option>
                        <option value="biochemistry">Biochemistry</option>
                        <option value="embryology">Embryology</option>
                        <option value="immunology">Immunology</option>
                        <option value="pathology">Pathology</option>
                        <option value="physiology">Physiology</option>
                        <option value="pharmacology">Pharmacology</option>
                      </select>

                      <label htmlFor={`organSystem${question._id}`} className="mr-2">
                        Organ System:
                      </label>
                      <select
                        id={`organSystem${question._id}`}
                        value={editedQuestions[question._id]?.organSystem || ''}
                        onChange={(e) => handleEditQuestionInputs(question._id, 'organSystem', e.target.value)}
                        className="p-2 rounded-md mb-8"
                      >
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="endocrinology">Endocrinology</option>
                        <option value="reproduction">Reproduction</option>
                        <option value="gastroenterology">Gastroenterology</option>
                        <option value="hematology">Hematology</option>
                        <option value="neurology">Neurology</option>
                        <option value="musculoskeletal">Musculoskeletal</option>
                      </select>

                      <textarea 
                        cols="30" 
                        rows="10"
                        value={editedQuestions[question._id]?.vignette || ''}
                        onChange={(e) => handleEditQuestionInputs(question._id, 'vignette', e.target.value)}
                        className="mb-8 p-2"
                      >
                      </textarea>

                      {/* choices here */}
                      {renderDynamicChoices(editedQuestions[question._id]?.choices || [], question._id)}


                      {/* explanations here */}
                      {renderDynamicExplanations(editedQuestions[question._id]?.explanations || [], question._id)}

                      {/* correct answer here */}
                      <div className="h-12">
                        <label htmlFor={`selectCorrectChoice${question._id}`} className="mr-6">
                          Select the choice number representing the correct answer:
                        </label>
                        <select
                          name={`selectCorrectChoice${question._id}`}
                          id={`selectCorrectChoice${question._id}`}
                          required
                          className="bg-400 rounded-md p-2"
                          value={editedQuestions[question._id]?.correctChoice || ''}
                          onChange={(e) => handleEditQuestionInputs(question._id, 'correctChoice', e.target.value)}
                        >
                          {[...Array(editedQuestions[question._id]?.choices.length || 1)].map((_, index) => (
                            <option key={index + 1} value={`${index + 1}`}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex mt-10">
                        <button className="primary-btn">Save Changes</button>
                        <button className="primary-btn" onClick={(e) => handleDeleteQuestion(e, question._id)}>Delete Question</button>
                      </div>
                    </form>
                  </div>
                )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
