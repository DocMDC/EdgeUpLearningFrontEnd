import React, {useContext} from 'react'
import {Context} from "../Context"

export default function TestMode() {
    const {createExamForm, updateCreateExamForm} = useContext(Context)

      return (
        <div className="h-36 border-b-2 border-400 p-6">
          <h2 className="text-xl mb-6">Test mode</h2>
          <div className="flex items-center">
            <label className="relative inline-block w-20 h-8 mx-2">
              <input 
              type="checkbox" 
              name="tutorMode"
              id="tutorMode"
              value={createExamForm.tutorMode}
              className="hidden"
              onChange={updateCreateExamForm}
              />
              <span className={createExamForm.tutorMode 
                ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
            </label>
            <h3>Tutor</h3>
            <label className="relative inline-block w-20 h-8 mx-2">
              <input 
              type="checkbox" 
              name="timedMode"
              id="timedMode"
              value={createExamForm.timedMode}
              className="hidden"
              onChange={updateCreateExamForm}
              />
              <span className={createExamForm.timedMode 
                ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
            </label>
            <h3>Timed</h3>
          </div>
        </div> 
      )
}