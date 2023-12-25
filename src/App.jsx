import React from 'react'
import { Routes, Route } from "react-router-dom"
import PublicLayout from "./components/PublicLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Purchase from "./pages//Purchase"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Privacy from "./pages/Privacy"
import Missing from "./pages/Missing"
import UserLayout from "./components/UserLayout"
import UserDashboard from "./pages/user/UserDashboard"
import UserExams from "./pages/user/UserExams"
import UserCreateExam from "./pages/user/UserCreateExam"
import UserAccount from "./pages/user/UserAccount"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized"
import UserExamInSession from "./pages/user/UserExamInSession"
import ExamInSessionLayout from "./components/ExamInSessionLayout"
import PersistLogin from "./components/PersistLogin"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import AdminLayout from "./components/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminEditQuestions from "./components/AdminEditQuestions"
import AdminAddQuestions from "./components/AdminAddQuestions"

const ROLES = {
  "architect": 9498281420294,
  "admin": 94768,
  "teacher": 42805,
  "user": 19840
}

export default function App() {
  return (
    <div className="font-serif">
      <Routes>
          {/* public routes */}
        <Route to="/" element={<PublicLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="purchase" element={<Purchase/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="privacy" element={<Privacy/>}/>
          <Route path="reset/:id" element={<ResetPassword/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
        </Route>

          {/* PersistLogin hits the "/refresh" endpoint which provides an access token*/}
          {/* student-specific private routes */}
        <Route element={<PersistLogin />}>
          <Route path="dashboard" element={<UserLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route index element={<UserDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="create-exam" element={<UserCreateExam/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="my-exams" element={<UserExams/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="account" element={<UserAccount/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="unauthorized" element={<Unauthorized/>}/>
            </Route>
          </Route>

          <Route path="exam" element={<ExamInSessionLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path=":id" element={<UserExamInSession/>}/>
            </Route>
          </Route>
        </Route>

        {/* admin specific routes*/}
        <Route element={<PersistLogin />}>
          <Route path="admin-dashboard" element={<AdminLayout/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route index element={<AdminDashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="add-questions" element={<AdminAddQuestions/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.teacher, ROLES.architect]} />}>
              <Route path="edit-questions" element={<AdminEditQuestions/>}/>
            </Route>
          </Route>
        </Route>


        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  )
}
