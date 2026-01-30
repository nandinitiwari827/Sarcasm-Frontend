import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/sarcasmLogo.jpg"
import { changeCurrentPassword, logoutUser } from "../../api.js"
import { isLoggedIn } from "../../auth.js"

const ChangePassword = () => {
  let navigate=useNavigate()
  let [oldPassword, setOldPassword] = useState("")
  let [newPassword, setNewPassword] = useState("")
  let [confirmNewPassword, setConfirmNewPassword] = useState("")
  let [showOld, setShowOld] = useState(false)
  let [showNew, setShowNew] = useState(false)
  let [isLoading, setIsLoading]=useState(false)

  let [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  useEffect(() => {
  if (!isLoggedIn()) {
    navigate("/login", { replace: true })
  }
}, [])

   let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

   let handleSubmit = async(e) => {
    e.preventDefault()
    let isValid = true

    let newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }

    if (!oldPassword) {
      newErrors.oldPassword = "Please enter your old password"
      isValid = false
    }

    if (!newPassword) {
      newErrors.newPassword = "Please enter your new password"
      isValid = false
    } else if (newPassword === oldPassword) {
      newErrors.newPassword = "New password must be different from old password"
      isValid = false
    }else if (!newPassword || !passwordRegex.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
      isValid = false
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password"
      isValid = false
    } else if (newPassword && confirmNewPassword !== newPassword) {
      newErrors.confirmNewPassword = "New passwords do not match"
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) return
    
    try {
      setIsLoading(true)
    
      let res = await changeCurrentPassword(oldPassword, newPassword) 
    
       setOldPassword("")
       setNewPassword("")
       setConfirmNewPassword("")
      alert(res.message || "Password changed successfully!")

       await logoutUser()
       localStorage.removeItem('user')
       localStorage.removeItem('accessToken')
       localStorage.removeItem('refreshToken')
      navigate("/login")
    } catch (err) {
      let status = err.response?.status
      let backendError = err.response?.data?.message || "An error occured while updating password."
    
      if (status === 400) {
        setErrors({ oldPassword: "Incorrect old password", newPassword: "" })
      } else {
        setErrors({ oldPassword: backendError, newPassword: "" })
      }
    } finally {
      setIsLoading(false)
    }}

  let handleConfirmNewPasswordChange = (e) => {
  let value = e.target.value
  setConfirmNewPassword(value)

  if (newPassword && value && newPassword !== value) {
    setErrors((prev) => ({
      ...prev,
      confirmNewPassword: "New passwords do not match",
    }))
  } else {
    setErrors((prev) => ({ ...prev, confirmNewPassword: "" }))
  }
}

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        <div className="bg-indigo-600 py-6 px-6 flex flex-col items-center">
         
         <div className="flex w-full justify-between items-start">
             <div className="flex gap-x-2 mb-3 items-center bg-white py-3 md:py-2 px-5 rounded-xl md:rounded-2xl">
               <img src={logo} className="w-[20px] md:w-[30px] lg:w-[35px]"/>
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'sans-serif' }}>SARCASM AI</h1>
                 </div>
                 
               <button onClick={()=>navigate('/')} className="cursor-pointer hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="#fff" d="m217.9 110.1l-80-80a14 14 0 0 0-19.8 0l-80 80A13.92 13.92 0 0 0 34 120v96a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-58h36v58a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-96a13.92 13.92 0 0 0-4.1-9.9M210 210h-52v-58a6 6 0 0 0-6-6h-48a6 6 0 0 0-6 6v58H46v-90a2 2 0 0 1 .58-1.42l80-80a2 2 0 0 1 2.84 0l80 80A2 2 0 0 1 210 120Z"/></svg>
               </button>
              </div>

          <h2 className="text-2xl md:text-4xl font-semibold text-white" style={{fontFamily: 'serif'}}>Change Password</h2>
          <p className="text-indigo-100 mt-1">
            Keep your account safe and secure
          </p>
            <p className="text-indigo-100 mt-3 flex gap-1 text-[10px] font-light"><p className="font-semibold">Note:</p> This option is only for users who created their account using email and password. If you signed up using Google, please log in with Google instead.
          </p>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                disabled={isLoading}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.oldPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <i className={`fas ${ showOld ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowOld((prev) => !prev)}/>
            </div>
            {errors.oldPassword && (<p className="mt-1 text-sm text-red-500">{errors.oldPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                disabled={isLoading}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <i className={`fas ${showNew ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowNew((prev) => !prev)}
              />
            </div>
            {errors.newPassword && ( <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                disabled={isLoading}
                onChange={handleConfirmNewPasswordChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
            
            </div>
            {errors.confirmNewPassword && (<p className="mt-1 text-sm text-red-500">{errors.confirmNewPassword}
              </p>
            )}
          </div>

          <div>
            <button type="submit"
            disabled={isLoading}
            className={`${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                 } w-full cursor-pointer bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex justify-center items-center shadow-md hover:shadow-lg`}
            >
              <i className="fas fa-key mr-2"/>
              {isLoading ? 'Loading...' : 'Change Password'}
            </button>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link to="/about" className="font-medium text-indigo-600 hover:text-indigo-500"> Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword