import React from 'react'
import { useAiChatMutation } from "../redux/slices/aiApiSlice"
import {AiFillCloseCircle} from "react-icons/ai"
import { useSelector } from "react-redux"
import { selectDarkModeEnabled } from '../redux/slices/darkModeSlice'

export default function ExamAi({setIsAiOpen, isAiOpen, currentQuestion, AIQuestion, setAIQuestion, AIAnswer, setAIAnswer}) {
  const [getAi, {isLoading}] = useAiChatMutation()
  const darkModeEnabled = useSelector(selectDarkModeEnabled)
  
  const correctChoice = currentQuestion?.correctChoice
  const vignette = currentQuestion?.vignette

  function indexToLetter(index) {
    return String.fromCharCode('A'.charCodeAt(0) + index);
  }
  
  /* ----------Convert info to strings and letters for AI prompt engineering simplification---------- */

  // Transform choices array to an array with letters before each index
  const choicesArrayWithLetters = currentQuestion?.choices.map((choice, index) => {
    const letter = indexToLetter(index)
    return `${letter}. ${choice}`
  })

  // Convert array to string for chat gpt prompt engineering
  const choicesToString = choicesArrayWithLetters.toString()

  // Transform explanations array to an array with letters before each index
  const explanationsArrayWithLetters = currentQuestion?.explanations.map((explanation, index) => {
    const letter = indexToLetter(index)
    return `${letter}. ${explanation}`
  })

  //Convert correct answer to a letter (must -1 due to the way correctChoice was built (started with 1 and not 0))
  const correctChoiceToLetter = indexToLetter(correctChoice -1)

  // Convert array to string
  const explanationsToString = explanationsArrayWithLetters.toString()

  async function handleGetAi(e) {
    e.preventDefault()
    try {
      const response = await getAi({
        message: AIQuestion,
        vignette: vignette,
        choices: choicesToString,
        explanations: explanationsToString,
        correctChoice: correctChoiceToLetter
      }).unwrap()
      const aiAnswer = response.choices[0].message.content
      setAIAnswer(aiAnswer)
      setAIQuestion('')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isAiOpen &&
      
      <div className={darkModeEnabled ? "bg-dm-200 shadow-md z-40 border border-dm-100 mt-4 h-96 w-80 fixed bottom-20 right-14" : "bg-300 shadow-md z-40 border border-exam-secondary mt-4 h-96 w-80 fixed bottom-20 right-14"}>
        
        <AiFillCloseCircle className={darkModeEnabled ? "absolute top-2 right-2 text-xl cursor-pointer hover:text-dm-300" : "absolute top-2 right-2 text-xl cursor-pointer hover:text-exam-secondary"} onClick={() => setIsAiOpen(!isAiOpen)}/>

        <h1 className="text-lg text-center border-b border-black py-2">Ask AI</h1>
        <div className={darkModeEnabled ? "h-40 bg-dm-300 rounded-md m-4 p-2 overflow-y-scroll text-100" : "h-40 bg-100 rounded-md m-4 p-2 overflow-y-scroll"}>
        {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{AIAnswer ? AIAnswer : ""}</p>
          )}
        </div>

        <form onSubmit={handleGetAi} className="flex flex-col items-center mx-4">
          <textarea 
            id="aiQuestion"
            placeholder='Example: Can you help me understand why choice D is correct?...'
            onChange={(e) => setAIQuestion(e.target.value)}
            value={AIQuestion}
            className={darkModeEnabled ? "w-full p-2 bg-dm-300 text-100 placeholder:text-gray-400" : "w-full p-2"}
          />
          <button className={darkModeEnabled ? "bg-dm-400 py-2 px-10 text-100 mt-4 rounded-md crusor-pointer hover:bg-dm-300" : "bg-exam-secondary py-2 px-10 text-100 mt-4 rounded-md crusor-pointer hover:bg-[#4783bd99]"}>Ask AI</button>
        </form>
        
      </div>
      }
    </>
  )
}
