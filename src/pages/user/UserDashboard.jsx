import React from 'react'

export default function UserDashboard() {
  return (
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-xl tracking-wider text-500">
        <h1>Home</h1>
      </div>
      <div className="bg-100 mt-4 min-h-[1000px] p-8 text-xl">
        <h1>Welcome to Edge Up Learning!</h1>
        <br/>
        <h1>You can navigate to the "Create Exam" page to select a set of questions based on your preferences. From there, you can launch any number of new exams to test your medical knowledge in an environment very similar to the United States Medical Exams.</h1>
        <br/>
        <h1>After you have created at least one exam, you can navigate to the "My Exams" page to review your score, the number of questions in the exam, as well as some additional information pertinent to that exam.</h1>
        <br/>
        <h1>If you ever want to start over, you can reset the questions and your history in the "Account" page.</h1>
        <br/>
        <h1>We hope you enjoy and best of luck in your medical journey!</h1>
      </div>
    </div>
  )
}