import React, {useState, useRef, useEffect} from 'react'
import {Link} from "react-router-dom"
import { useForgotMutation } from '../redux/slices/authApiSlice';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ForgotPassword() {
    const [sendForgot] = useForgotMutation()

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)


    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const emailRef = useRef()

    useEffect(() => {
        if (!submitted) {
            emailRef.current.focus()
        }
    }, [])

    useEffect(() => {
        if (!submitted) {
            setValidEmail(EMAIL_REGEX.test(email))
        }
    }, [email])

    
    async function sendEmail(e) {
        e.preventDefault()
        const emailIsValid = EMAIL_REGEX.test(email)

        if (!emailIsValid) {
            setErrMsg("Invalid email")
            return
        }

        try {
            await sendForgot({
                email: email.toLowerCase()
            }).unwrap()
            setSubmitted(true)
        } catch (err) {
            console.log(err)
            setErrMsg("Server error")
        }
        
    }

    return (
        submitted 
        ? 
        (<div className="below-header-height flex items-center justify-center">
            <div className="min-h-[300px] w-[325px] bg-public-400 rounded-md px-4 flex flex-col items-center justify-center">
                <h1 className="text-center text-2xl text-public-100 mb-4">An email is on it's way!</h1>
                <h2 className="text-public-100 text-center mb-4 text-sm">If you don't see an email within a few minutes, please check your spam.</h2>
                <h2 className="text-public-100 text-sm">Return to <span><Link to="/login" className="text-public-200"> Login</Link></span></h2>
                
            </div>
        </div>) 
        : 
        (<div className="below-header-height flex items-center justify-center">
            <div className="min-h-[300px] w-[325px] bg-public-400 rounded-md px-4 relative">
                <h1 className={errMsg ? "text-center text-2xl border-b border-public-200 pb-4 mt-6 text-public-100 mb-2" : "text-center text-2xl border-b border-public-200 pb-4 mt-6 text-public-100 mb-10"}>Forgot Password</h1>
                <p className={errMsg ? "pt-2 text-center text-red-500 text-sm mb-1" : "hidden"}>{errMsg}</p>
                <form className="flex flex-col font-serif relative" onSubmit={sendEmail}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={emailFocus && email.length > 0 && !validEmail ? "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-2" : "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-10 rounded-md"}
                        ref={emailRef}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p className={emailFocus && email.length > 0 && !validEmail ? "text-xs text-red-600 mt-2 mb-2" : "hidden"}>Must use valid email address.</p>
                    <button 
                        className={!validEmail ? "mx-auto w-56 flex items-center justify-center bg-gray-200 rounded-2xl h-12 p-2 text-black" : "secondary-btn"}
                        disabled={!validEmail ? true : false}
                    >Submit</button>
                </form>
            </div>
        </div>)
    );
    
}
