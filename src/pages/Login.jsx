import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../redux/slices/authApiSlice"
import { setAuth, setPersist, selectPersist } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login() {
  const [loginUser] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPersistState = useSelector(selectPersist) 
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const errRef = useRef()
  const emailRef = useRef()
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(loginForm.email))
  }, [loginForm.email])

  useEffect(() => {
    setErrMsg('')
  }, [loginForm.email, loginForm.password])

  function updateLoginForm(e) {
    const {name, value} = e.target
    setLoginForm(prev => {
        return ({
            ...prev,
            [name]: value
        })
    })
  }

  //allow authentication with refresh token via cookies on trusted device
  function togglePersist() {
    dispatch(setPersist(!currentPersistState))
  }

  async function submitLoginForm(e) {
    e.preventDefault()
    const emailIsValid = EMAIL_REGEX.test(loginForm.email)

    if (!emailIsValid) {
      setErrMsg("Invalid email")
      return
    }

    try {
      const response = await loginUser({
        email: loginForm.email.toLowerCase(),
        password: loginForm.password
      }).unwrap()

      const accessToken = response.accessToken
      const roles = response.roles
      dispatch(setAuth({
        email: loginForm.email,
        roles: roles,
        accessToken: accessToken
      }))

      setLoginForm({
        email: "",
        password: ""
      })

      navigate("/dashboard")
    } catch (err) {
      console.log(err)
      if (err.status === 400) {
        //client error
        setErrMsg(err.data.message)
      } else if (err.status === 401) {
        //invalid credentials
        setErrMsg(err.data.message)
      } else {
        setErrMsg("Server failed. Please try again later.")
      }
    }
  }

  return (
    <div className="below-header-height flex items-center justify-center bg-front-300">
      <div className="min-h-[475px] w-[325px] bg-front-100 rounded-md px-4 relative">
        <h1 className={errMsg ? "font-serif text-center text-2xl border-b-2 border-front-400 pb-4 mt-6 text-black mb-3" : "font-serif text-center text-2xl border-b-2 border-front-400 pb-4 mt-6 text-black mb-10"}>Login</h1>
        <p ref={errRef} className={errMsg ? "pt-2 text-center text-red-500 text-sm" : "hidden"}>{errMsg}</p>
        <form className="flex flex-col font-serif relative" onSubmit={submitLoginForm}>

          <input
            type="email"
            id="email"
            ref={emailRef}
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={updateLoginForm}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className={emailFocus && loginForm.email.length > 0 && !validEmail ? "border border-gray-300 bg-public-100 h-10 mt-2 px-2 rounded-md" : "border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-10 rounded-md"}
            />
            <p className={emailFocus && loginForm.email.length > 0 && !validEmail ? "text-xs text-red-600 mt-2 mb-6" : "hidden"}>Must use valid email address.</p>

          <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={updateLoginForm}
              required
              className="border border-gray-300 bg-public-100 h-10 mt-2 px-2 mb-6 rounded-md"
          />

          <div className="flex items-center h-6 w-44 mb-6">
            <label htmlFor="persist" className="mr-3 cursor-pointer text-black">Trust this device?</label>
            <input 
              type="checkbox" 
              id="persist"
              onChange={togglePersist}
              checked={currentPersistState}
              className="w-4 h-[14.5px] cursor-pointer"
            />
          </div>          

          <button className={!validEmail || loginForm.password.length === 0 ? "mx-auto w-56 flex items-center justify-center bg-gray-200 rounded-2xl h-12 p-2 text-black" : "mx-auto w-56 flex items-center justify-center bg-front-500 rounded-2xl h-12 p-2 cursor-pointer text-white transition ease-in-out delay-75 hover:bg-front-600"} disabled={!validEmail ? true : false}>Submit</button>

          <h6 className="text-[12px] mt-6 text-black">Not a user? <span className="text-front-500 cursor-pointer hover:text-front-600"><Link to="/register">Register here.</Link></span></h6>
          <h6 className="text-[12px] mt-2 text-black">Forgot your <span className="text-front-500 cursor-pointer hover:text-front-600"><Link to="/forgot-password">password?</Link></span></h6>

        </form>
      </div>
    </div>
  )
}
