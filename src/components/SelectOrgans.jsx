import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectOrgans({ allOrgans, filteredOrgansBySubjects, onOrganSelection, organSystemCountRefs }) {

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
            <h1 className={Object.keys(filteredOrgansBySubjects).length > 0 ? styles.enabledLabelTitle : styles.disabledLabelTitle}>Organ Systems</h1>
            {/* <label htmlFor="allOrganSystems" className="text-xl mr-2 cursor-pointer">Organ Systems</label>
            <input 
            id="allOrganSystems"
            name="allOrganSystems"
            type="checkbox" 
            className="w-5 h-5 cursor-pointer"
            checked={createExamForm.allOrganSystems}
            onChange={updateCreateExamForm}
            /> */}
        </div>
        
        <div className="flex">
            <div className="w-56">

                {Object.keys(allOrgans).map((organSystem) => (
                <div key={organSystem} className="flex items-center mb-2 h-10 text-lg">
                    <input
                        id={organSystem}
                        name={organSystem}
                        type="checkbox"
                        className={
                        filteredOrgansBySubjects?.[organSystem]?.length > 0
                            ? styles.enabledInput
                            : styles.disabledInput
                        }
                        checked={createExamForm[organSystem] && filteredOrgansBySubjects?.[organSystem]?.length > 0}
                        onChange={(e) => {
                            updateCreateExamForm(e)
                            onOrganSelection(organSystem, e.target.checked)
                        }}
                        disabled={filteredOrgansBySubjects?.[organSystem]?.length > 0 ? false : true}
                    />

                    <label htmlFor={organSystem} className={filteredOrgansBySubjects?.[organSystem]?.length > 0 ? styles.enabledLabel : styles.disabledLabel}>
                        {organSystem}
                    </label>

                    <p 
                        className={filteredOrgansBySubjects?.[organSystem]?.length > 0 ? styles.enabledParagraph : styles.disabledParagraph}
                        // ref={organSystemCountRefs?.[organSystem]}
                    >
                        {filteredOrgansBySubjects?.[organSystem]?.length || 0}
                    </p>

                </div>
                ))}
            </div>
            
        </div>
    </div>
  )
}


{/* <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="cardiology"
            name="cardiology"
            type="checkbox" 
            className={filteredOrgansBySubjects?.cardiology?.length > 0 ? styles.enabledInput : styles.disabledInput}
            checked={createExamForm.cardiology && filteredOrgansBySubjects?.cardiology?.length > 0}
            onChange={updateCreateExamForm}
            disabled={filteredOrgansBySubjects?.cardiology?.length > 0 ? false : true}
            />
        <label htmlFor="cardiology" className={filteredOrgansBySubjects?.cardiology?.length > 0 ? styles.enabledLabel : styles.disabledLabel}>
            Cardiology
        </label>
        <p className={filteredOrgansBySubjects?.cardiology?.length > 0 ? styles.enabledParagraph : styles.disabledParagraph}>       
            {filteredOrgansBySubjects?.cardiology?.length || 0}
        </p>
    </div>
    
    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="dermatology"
            name="dermatology"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.dermatology}
            onChange={updateCreateExamForm}
            />
        <label htmlFor="dermatology" className="cursor-pointer mr-2">Dermatology</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.dermatology.length}</p>
    </div>

    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="endocrinology"
            name="endocrinology"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.endocrinology}
            onChange={updateCreateExamForm}
        />
        <label htmlFor="endocrinology" className="cursor-pointer mr-2">Endocrinology</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.endocrinology.length}</p>
    </div>
    
    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="reproduction"
            name="reproduction"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.reproduction}
            onChange={updateCreateExamForm}
            />
        <label htmlFor="reproduction" className="cursor-pointer mr-2">Reproduction</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.reproduction.length}</p>
    </div>
</div>

<div>
    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="gastroenterology"
            name="gastroenterology"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.gastroenterology}
            onChange={updateCreateExamForm}
            />
        <label htmlFor="gastroenterology" className="cursor-pointer mr-2">Gastroenterology</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.gastroenterology.length}</p>
    </div>

    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="hematology"
            name="hematology"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.hematology}
            onChange={updateCreateExamForm}
            />
        <label htmlFor="hematology" className="cursor-pointer mr-2">Hematology</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.hematology.length}</p>
    </div>

    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="neurology"
            name="neurology"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.neurology}
            onChange={updateCreateExamForm}
            />
        <label htmlFor="neurology" className="cursor-pointer mr-2">Neurology</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.neurology.length}</p>
    </div>

    <div className="flex items-center mb-2 h-10 text-lg">
        <input 
            id="musculoskeletal"
            name="musculoskeletal"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={createExamForm.musculoskeletal}
            onChange={updateCreateExamForm}
            />
        <label htmlFor="musculoskeletal" className="cursor-pointer mr-2">Musculoskeletal</label>
        <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.musculoskeletal.length}</p>
    </div> */}