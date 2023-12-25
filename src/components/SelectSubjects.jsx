import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectSubjects({ filteredSubjectsObj, incorrectCountValue, unusedCountValue, onSubjectSelection }) {
    const {createExamForm, updateCreateExamForm} = useContext(Context)

    const styles = {
        enabledInput: "mr-2 w-5 h-5 cursor-pointer",
        disabledInput: "mr-2 w-5 h-5 text-500",
        enabledLabelTitle: "mr-2 cursor-pointer text-xl",
        disabledLabelTitle: "mr-2 text-500 text-xl",
        enabledLabel: "mr-2 cursor-pointer text-lg",
        disabledLabel: "mr-2 text-500 text-lg",
        enabledParagraph: "text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold",
        disabledParagraph: "text-500 border rounded-full px-4 border-gray-600 text-base font-bold"
    }

  return (
    <div className="h-[500px] border-b-2 border-400 p-6">
        <div className="mb-6 flex items-center">

            <h1 className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledLabelTitle : styles.enabledLabelTitle }>Subjects</h1>
            
            {/*
            <label htmlFor="allSubjects" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledLabelTitle : styles.enabledLabelTitle }>Subjects</label>
            
             <input 
            id="allSubjects"
            name="allSubjects"
            type="checkbox" 
            className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledInput : styles.enabledInput }
            checked={createExamForm.allSubjects}
            onChange={updateCreateExamForm}
            disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? true : false}
            /> */}
        </div>
        
        <div className="flex">
            <div className="w-56">
                {/* 
                
                //create an array of filteredSubjectsObj using Object.keys and then map over these to significantly reduce lines of code (8 repeated inputs with similar logic vs 1 input using map method)

                //The className logic looks complex but I'm essentially toggling enabled or disabled tailwind styling based on if the count is > 0 and if questions are available for use 
                
                */}
                {Object.keys(filteredSubjectsObj).map((subject) => (
                <div key={subject} className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id={subject}
                        name={subject}
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm[subject]}
                        onChange={(e) => {
                            updateCreateExamForm(e)
                            onSubjectSelection(subject, e.target.checked)
                        }}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? true : false}
                        />
                    <label htmlFor={subject} className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? styles.disabledLabel : styles.enabledLabel}>
                        {subject}
                    </label>
                    
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? styles.disabledParagraph : styles.enabledParagraph}>
                        {filteredSubjectsObj[subject].length}
                    </p>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}
