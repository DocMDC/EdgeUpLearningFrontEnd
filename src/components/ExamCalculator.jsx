import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useSelector } from "react-redux"
import { selectDarkModeEnabled } from '../redux/slices/darkModeSlice'

export default function ExamCalculator({ isCalculatorOpen, setIsCalculatorOpen }) {

  const [display, setDisplay] = useState('')
  const [currentOperand, setCurrentOperand] = useState('')
  const [previousOperand, setPreviousOperand] = useState('')
  const [operation, setOperation] = useState('')
  const darkModeEnabled = useSelector(selectDarkModeEnabled)

  function handleClickOperand(operand) {
    // A previous number was entered and an operation has been selected
    if (operation !== '' && previousOperand !== '' && currentOperand === '') {
      if (operand === '.') {
        // If the first character is a dot, add a 0 before it
        setDisplay('0' + operand)
        setCurrentOperand('0' + operand)
      } else {
        setDisplay(operand)
        setCurrentOperand(operand)
      }
    } else if (currentOperand === '0' && operand === '0') {
      // If the previous number was a 0 and the current operand is a 0, return
      return
    } else if (currentOperand.includes('.') && operand === '.') {
      // If there is already a dot in the display, don't allow another one
      return
    } else if (operation !== '' && previousOperand !== '' && currentOperand.length > 0) {
      // Display has at least one operand
      setDisplay((prev) => prev + operand)
      setCurrentOperand((prev) => prev + operand);
    } else if (display === '' && operation === '') {
        if (operand === '.') {
          // If the first character is a dot, add a 0 before it
          setDisplay('0' + operand)
          setPreviousOperand('0' + operand)
        } else {
          setDisplay(operand)
          setPreviousOperand(operand)
        }
    } else if ((display === '0' && operand === '0') && operation === '') {
      // If the previous number was a 0 and the current operand is a 0, return
      return
    } else if ((display.includes('.') && operand === '.') && operation === '') {
      // If there is already a dot in the display, don't allow another one
      return
    } else {
      // Display has at least one operand
      setDisplay((prev) => prev + operand)
      setPreviousOperand((prev) => prev + operand)
    }
  }

  function handleClickOperation(selectedOperation) {
    if (display === '') {
      //display is empty (can perform an operation yet)
      return
    } else if (operation !== ''){
      //operation button has already been clicked (can't click it again)
      return
    } else {
      setOperation(selectedOperation)
    }
  }

  function handleClickEqual() {
    const num1 = parseFloat(previousOperand)
    const num2 = parseFloat(currentOperand)

    if (!num1 || !num2 || operation === '') {
      return
    } 

    let result
    
    if (operation === '÷') {
      result = num1 / num2
    } else if (operation === 'x') {
      result = num1 * num2
    } else if (operation === '+') {
      result = num1 + num2
    } else if (operation === '-') {
      result = num1 - num2
    }

    if (result.toString().length > 30) {
      alert('Numbers with more than 30 characters are not allowed')
      setDisplay('')
      setCurrentOperand('')
      setPreviousOperand('')
      setOperation('')
    }

    setDisplay(result.toString())
    setPreviousOperand(result.toString())
    setOperation('')
    setCurrentOperand('')
  }

  function handleClickClear() {
    setDisplay('')
    setCurrentOperand('')
    setPreviousOperand('')
    setOperation('')
  }

  return (
    <>
      {isCalculatorOpen &&
        <div className={darkModeEnabled ? "bg-dm-300 shadow-md z-50 border border-exam-secondary mt-4 h-96 w-80 fixed top-16 right-14" : "bg-300 shadow-md z-50 border border-exam-secondary mt-4 h-96 w-80 fixed top-16 right-14"}>
          <AiFillCloseCircle className={darkModeEnabled ? "text-dm-200 absolute top-2 right-2 text-xl cursor-pointer hover:text-dm-400" : "absolute top-2 right-2 text-xl cursor-pointer hover:text-exam-secondary"} onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}/>
          <h1 className={darkModeEnabled ? "text-lg flex items-center justify-center border-b border-black py-2 h-1/6 text-100" : "text-lg flex items-center justify-center border-b border-black py-2 h-1/6"}>Calculator</h1>

          <div className="grid grid-cols-4 gap-2 h-5/6 p-2 bg-[#4783bd99]">
            <div className="col-span-4 border-2 border-black flex items-center justify-end px-2 text-lg bg-100">{display === '' ? 0 : display}</div>
            <div className="col-span-3 border border-black flex items-center justify-center rounded-md bg-yellow-300 cursor-pointer" onClick={() => handleClickClear()}>C</div>
            <div className="col-span-1 border border-black flex items-center justify-center rounded-md bg-blue-200 cursor-pointer" onClick={() => handleClickOperation('÷')}>÷</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('7')}>7</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('8')}>8</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('9')}>9</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-blue-200 cursor-pointer" onClick={() => handleClickOperation('x')}>x</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('4')}>4</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('5')}>5</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('6')}>6</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-blue-200 cursor-pointer" onClick={() => handleClickOperation('-')}>-</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('1')}>1</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('2')}>2</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('3')}>3</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-blue-200 cursor-pointer" onClick={() => handleClickOperation('+')}>+</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('0')}>0</div>
            <div className="border border-black flex items-center justify-center rounded-md bg-200 cursor-pointer" onClick={() => handleClickOperand('.')}>.</div>
            <div className="col-span-2 border border-black flex items-center justify-center rounded-md bg-yellow-300 cursor-pointer" onClick={() => handleClickEqual()}>=</div>
          </div>
        </div>
      }
    </>
  )
}