import React, {useState} from 'react'
import { useAddQuestionMutation } from "../redux/slices/questionsApiSlice"

export default function AdminAddQuestions() {
    const [addQuestion] = useAddQuestionMutation()

    const [numberOfChoices, setNumberOfChoices] = useState(1)
    const [choices, setChoices] = useState(Array(numberOfChoices).fill(''))
    const [explanations, setExplanations] = useState(Array(numberOfChoices).fill(''))
    const [correctChoice, setCorrectChoice] = useState(1)
    const [vignetteText, setVignetteText] = useState("")
    const [selectedSubject, setSelectedSubject] = useState('anatomy')
    const [selectedOrganSystem, setSelectedOrganSystem] = useState('cardiology')

  function updateNumberOfChoices(e) {
    const { value } = e.target
    setNumberOfChoices(Number(value))
    setChoices(Array(Number(value)).fill(''))
    setExplanations(Array(Number(value)).fill(''))
  }

  function updateChoice(index, value) {
    const newChoices = [...choices]
    newChoices[index] = value
    setChoices(newChoices)
  }

  function updateExplanation(index, value) {
    const newExplanations = [...explanations]
    newExplanations[index] = value
    setExplanations(newExplanations)
  }

  function renderChoices() {
    return choices.map((choice, index) => (
      <div key={index}>
        <label htmlFor={`choice${index + 1}`}>Choice {index + 1}: </label>
        <input
          type="text"
          id={`choice${index + 1}`}
          value={choice}
          onChange={(e) => updateChoice(index, e.target.value)}
          className="bg-400 rounded-md p-2 mb-1 w-[500px]"
        />
      </div>
    ))
  }

  function renderExplanations() {
    return explanations.map((explanation, index) => (
        <div key={index}>
            <label htmlFor={`explanation${index + 1}`}>Explanation {index + 1}: </label>
            <input
            type="text"
            id={`explanation${index + 1}`}
            value={explanation}
            onChange={(e) => updateExplanation(index, e.target.value)}
            className="bg-400 rounded-md p-2 mb-1 w-[500px]"
            />
        </div>
    ))
  }

  async function submitAddQuestion(e) {
    e.preventDefault()
    try {
        const response = await addQuestion({
            subject: selectedSubject,
            organSystem: selectedOrganSystem,
            vignette: vignetteText,
            choices: choices,
            explanations: explanations,
            correctChoice: correctChoice
             
        }).unwrap()
        console.log(response)

        setNumberOfChoices(1)
        setChoices(Array(numberOfChoices).fill(''))
        setExplanations(Array(numberOfChoices).fill(''))
        setCorrectChoice(1)
        setVignetteText("")
        setSelectedSubject('anatomy')
        setSelectedOrganSystem('cardiology')
    } catch (err) {
        console.log(err)
    }
  }

    return (
        <div className="bg-300 w-full pb-4">

            <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
            <h1>Add Questions</h1>
            </div>

            <div className="bg-100 mt-4 pb-4 min-h-[1000px]">
                <form onSubmit={submitAddQuestion} className="flex flex-col p-4">
                    <div className="h-12">
                        <label htmlFor="subject" className="mr-6">Select Subject:</label>
                        <select name="subject" id="subject" required className="bg-400 rounded-md p-2" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            <option value="anatomy">Anatomy</option>
                            <option value="microbiology">Microbiology</option>
                            <option value="biochemistry">Biochemistry</option>
                            <option value="embryology">Embryology</option>
                            <option value="immunology">Immunology</option>
                            <option value="pathology">Pathology</option>
                            <option value="physiology">Physiology</option>
                            <option value="pharmacology">Pharmacology</option>
                        </select>
                    </div>

                    <div className="h-12">
                        <label htmlFor="organSystem" className="mr-6">Select Organ System:</label>
                        <select name="organSystem" id="organSystem" required className="bg-400 rounded-md p-2" value={selectedOrganSystem} onChange={(e) => setSelectedOrganSystem(e.target.value)}>
                            <option value="cardiology">Cardiology</option>
                            <option value="dermatology">Dermatology</option>
                            <option value="endocrinology">Endocrinology</option>
                            <option value="reproduction">Reproduction</option>
                            <option value="gastroenterology">Gastroenterology</option>
                            <option value="hematology">Hematology</option>
                            <option value="neurology">Neurology</option>
                            <option value="musculoskeletal">Musculoskeletal</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="vignette">Vignette:</label>
                        <textarea 
                            name="vignette" 
                            id="vignette" 
                            cols="30" 
                            rows="10"
                            className="h-96 w-full bg-400 p-2"
                            value={vignetteText}
                            onChange={(e) => setVignetteText(e.target.value)}
                        >
                        </textarea>
                    </div>

                    <div className="h-12">
                        <label htmlFor="numberOfChoices" className="mr-6">Select Number of Choices:</label>
                        <select 
                            name="numberOfChoices" 
                            id="numberOfChoices" 
                            required 
                            className="bg-400 rounded-md p-2"
                            value={numberOfChoices}
                            onChange={updateNumberOfChoices}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>

                    <div>{renderChoices()}</div>
                    <div>{renderExplanations()}</div>

                    <div className="h-12">
                        <label htmlFor="selectCorrectChoice" className="mr-6">Select the choice number representing the correct answer:</label>
                        <select 
                            name="selectCorrectChoice" 
                            id="selectCorrectChoice" 
                            required 
                            className="bg-400 rounded-md p-2"
                            value={correctChoice}
                            onChange={(e) => setCorrectChoice(e.target.value)}
                        >
                            {[...Array(numberOfChoices)].map((_, index) => (
                                <option key={index + 1} value={`${index + 1}`}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="primary-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}
