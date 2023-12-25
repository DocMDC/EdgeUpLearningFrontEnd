import React, {useState} from 'react'
import {AiFillCloseCircle} from "react-icons/ai"
import { useSelector } from "react-redux"
import { selectDarkModeEnabled } from '../redux/slices/darkModeSlice'

export default function ExamLabValues({isLabValuesOpen, setIsLabValuesOpen}) {
    const [dataIndex, setDataIndex] = useState(1)
    const darkModeEnabled = useSelector(selectDarkModeEnabled)

    function handleSetIndex(index) {
        setDataIndex(index)
    }

    const labData = [
        {
          title: 'Serum',
          values: [
            { name: 'Alanine aminotransferase (ALT)', referenceRange: '10-40 U/L' },
            { name: 'Aspartate aminotransferase (AST)', referenceRange: '12-38 U/L' },
          ],
        },
        {
          title: 'Cerebrospinal',
          values: [
            { name: 'Cell count', referenceRange: '0-5/mm^3' },
            { name: 'Chloride', referenceRange: '118-132 mEq/L' },
          ],
        },
        {
          title: 'Blood',
          values: [
            { name: 'Erythrocyte count', referenceRange: '' },
            { name: 'Male', referenceRange: '4.3-5.9 million/mm^3' },
            { name: 'Female', referenceRange: '3.5-5.5 million/mm^3' },
          ],
        },
        {
          title: 'Urine',
          values: [
            { name: 'Calcium', referenceRange: '100-300 mg/24 h' },
            { name: 'Creatinine clearance', referenceRange: '' },
            { name: 'Male', referenceRange: '97-137 mL/min' },
            { name: 'Female', referenceRange: '88-128 mL/min' },
          ],
        },
      ]

  return (
    <>
    {isLabValuesOpen &&
        <div className="fixed top-14 right-0 bottom-14 w-80 bg-200 shadow-lg 2xl:w-[500px]">
            <h2 className={darkModeEnabled ? "flex items-center pl-4 text-xl bg-dm-200 h-20" : "flex items-center pl-4 text-xl bg-400 h-20"}>Lab Values</h2>
            
            <AiFillCloseCircle className={darkModeEnabled ? "absolute top-2 right-2 text-xl cursor-pointer hover:text-dm-300" : "absolute top-2 right-2 text-xl cursor-pointer hover:text-exam-secondary" } onClick={() => setIsLabValuesOpen(!isLabValuesOpen)}/>

            <div className={darkModeEnabled ? "bg-gray-400 h-[152px] flex justify-center items-end text-xs border-b border-dm-400 text-dm-400" : "bg-100 h-[152px] flex justify-center items-end text-xs border-b border-gray-500"}>
                <button 
                className={dataIndex === 0 ? "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base bg-yellow-300" : "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base"} onClick={() => handleSetIndex(0)}>Serum</button>
                <button className={dataIndex === 1 ? "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base bg-yellow-300" : "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base"} onClick={() => handleSetIndex(1)}>Cerebrospinal</button>
                <button className={dataIndex === 2 ? "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base bg-yellow-300" : "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base"} onClick={() => handleSetIndex(2)}>Blood</button>
                <button className={dataIndex === 3 ? "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base bg-yellow-300" : "border-t border-l border-r border-black px-2 pt-1 mr-3 2xl:text-base"} onClick={() => handleSetIndex(3)}>Urine</button>
            </div>

            <div className={darkModeEnabled ? "bg-dm-200 fixed top-72 right-0 bottom-14 w-80 2xl:w-[500px] p-4" : "bg-blue-100 fixed top-72 right-0 bottom-14 w-80 2xl:w-[500px] p-4"}>

                <div className="flex font-bold mb-2">
                    <h2 className="w-1/2">{labData[dataIndex].title}</h2>
                    <h2 className="w-1/2">References</h2>
                </div>
                {labData[dataIndex].values.map((value, index) => (
                    <div key={index} className={darkModeEnabled ? "flex border-b border-dm-300 py-1" : "flex border-b border-100 py-1"}>
                        <h3 className="w-1/2">{value.name}</h3>
                        <h3 className="w-1/2">{value.referenceRange}</h3>
                    </div>
                ))}
                
            </div>
        </div>
    }
    </>
  )
}