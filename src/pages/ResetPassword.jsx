import React, {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useResetMutation } from "../redux/slices/authApiSlice"
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function ResetPassword() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sendReset] = useResetMutation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [validMatch, setValidMatch] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password))
        setValidMatch(password === confirmPassword)
    }, [password, confirmPassword])

    useEffect(() => {
        passwordRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
      }, [password, confirmPassword])

    async function submitResetPassword(e) {
        e.preventDefault()
        const passwordIsValid = PWD_REGEX.test(password) 

        if(!passwordIsValid) {
            setErrMsg("Invalid password")
            return
        }

        try {
            await sendReset({
                newPassword: password,
                uniqueId: id
            }).unwrap()
            setPassword('')
            setConfirmPassword('')

            navigate("/login")
        } catch (err) {
            setErrMsg('Server error')
        }
    }

  return (
    <div className="below-header-height flex items-center justify-center">
        <div className="min-h-[400px] w-[325px] bg-public-400 rounded-md px-4 relative">
            <h1 className={errMsg ? "font-serif text-center text-2xl border-b border-public-200 pb-4 mt-6 text-public-100 mb-2" : "font-serif text-center text-2xl border-b border-public-200 pb-4 mt-6 text-public-100 mb-10"}>Reset Password</h1>
            <p className={errMsg ? "pt-2 text-center text-red-500 text-sm" : "hidden"}>{errMsg}</p>
            <form className="flex flex-col font-serif relative" onSubmit={submitResetPassword}>
                <input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={passwordFocus && password.length > 0 && !validPwd ? "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-3 rounded-md" : "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-10 rounded-md"}
                ref={passwordRef}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                />
                <p className={passwordFocus && password.length > 0 && !validPwd ?"text-xs text-red-600 mt-2 mb-1" : "hidden"}>8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character. 
                <br /> Allowed special characters: ! @ # $ % </p>
                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={confirmPasswordFocus && confirmPassword.length > 0 && !validMatch ? "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-3 rounded-md" : "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-12 rounded-md"}
                ref={confirmPasswordRef}
                onFocus={() => setConfirmPasswordFocus(true)}
                onBlur={() => setConfirmPasswordFocus(false)}
                />
                <p className={confirmPasswordFocus && confirmPassword.length > 0 && !validMatch ?"text-xs text-red-600 mt-2 mb-3" : "hidden"}>Passwords must match.</p>
                <button className={password.length < 1 || confirmPassword.length < 1 || validMatch === false ? "mx-auto w-56 flex items-center justify-center bg-gray-200 rounded-2xl h-12 p-2 text-black" : "secondary-btn"} disabled={password.length < 1 || confirmPassword.length < 1 || validMatch === false ? true : false}>Submit</button>
            </form>
        </div>
    </div>
  )
}
