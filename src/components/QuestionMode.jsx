import React, { useContext } from 'react'
import {Context} from "../Context"

export default function QuestionMode({ unusedQuestions, incorrectQuestions, incorrectCountRef, unusedCountRef, incorrectCountValue, unusedCountValue }) {
    
  const {createExamForm, updateCreateExamForm} = useContext(Context)

  const styles = {
    enabledInput: "mr-2 w-5 h-5 cursor-pointer",
    disabledInput: "mr-2 w-5 h-5 text-500",
    enabledLabel: "mr-2 cursor-pointer",
    disabledLabel: "mr-2 text-500",
    enabledParagraph: "text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold",
    disabledParagraph: "text-500 border rounded-full px-4 border-gray-600 text-base font-bold"
  }

  return (
    <div className="h-56 border-b-2 border-400 p-6">
        <h2 className="text-xl mb-6">Question Mode</h2>
        <div className="flex flex-col items-start">

            <div className="flex mb-4 text-lg items-center">
              <input 
              id="unused"
              name="unused"
              type="checkbox" 
              className={(createExamForm.incorrect || unusedCountValue === 0) ? styles.disabledInput : styles.enabledInput}
              checked={createExamForm.unused}
              onChange={(e) => {
                updateCreateExamForm(e)
              }}
              disabled={(createExamForm.incorrect || unusedCountValue === 0) ? true : false}
              />
              <label htmlFor="unused" className={(createExamForm.incorrect || unusedCountValue === 0) ? styles.disabledLabel : styles.enabledLabel}>Unused</label>
              <p 
                className={(createExamForm.incorrect || unusedCountValue === 0) ? styles.disabledParagraph : styles.enabledParagraph}
                ref={unusedCountRef}
              >
                {unusedQuestions.length}
              </p>
            </div>

            <div className="flex mb-4 text-lg items-center">
              <input 
              id="incorrect"
              name="incorrect"
              type="checkbox" 
              className={(createExamForm.unused || incorrectCountValue === 0) ? styles.disabledInput : styles.enabledInput}
              checked={createExamForm.incorrect}
              onChange={(e) => {
                updateCreateExamForm(e)
              }}
              disabled={(createExamForm.unused || incorrectCountValue === 0) ? true : false}
              />
              <label htmlFor="incorrect" className={(createExamForm.unused || incorrectCountValue === 0) ? styles.disabledLabel : styles.enabledLabel}>Incorrect</label>
              <p 
                className={(createExamForm.unused || incorrectCountValue === 0) ? styles.disabledParagraph : styles.enabledParagraph}
                ref={incorrectCountRef}
              >
                {incorrectQuestions.length}
              </p>
            </div>

            {/* <div className="flex mb-4 text-lg">
              <input 
              id="flagged"
              name="flagged"
              type="checkbox" 
              className="mr-2 w-5 h-5 cursor-pointer"
              checked={questionModeForm.flagged}
              onChange={(e) => updateQuestionModeForm(e)}
              />
              <label htmlFor="flagged" className="mr-2 cursor-pointer">Flagged</label>
              <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{flaggedQuestions.length}</p>
            </div> */}
        </div>
    </div>
  )
}
