import React, {useState} from "react"

const Context = React.createContext()

function ContextProvider({children}) {

    const [createExamForm, setCreateExamForm] = useState({
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
    
    function updateCreateExamForm(event) {
      const { name, value, type, checked } = event.target;
    
      setCreateExamForm((prevData) => {
        return {
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        }
      })
    }

    return (
        <Context.Provider value={{
            createExamForm,
            setCreateExamForm,
            updateCreateExamForm
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
