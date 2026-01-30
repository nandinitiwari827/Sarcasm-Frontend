import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from "../../assets/sarcasmLogo.png"
import { loginUser, googleAuthUser } from "../../api.js"
import { GoogleLogin } from "@react-oauth/google"

let Login = () => {
  let navigate = useNavigate()
  let location = useLocation()
  let [loginId, setLoginId] = useState("")
  let [password, setPassword] = useState("")
  let [showPassword, setShowPassword] = useState(false)
  let [isLoading, setIsLoading]=useState(false)
  let [errors, setErrors] = useState({
    loginId: "",
    password: ""
  })

  let handleSubmit = async(e) => {
    e.preventDefault()
    let isValid = true

    let newErrors = {
      loginId: "",
      password: ""
    }

    if (!loginId.trim()) {
      newErrors.loginId = "Please enter your email or phone number"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Please enter your password"
      isValid = false
    }
    setErrors(newErrors)

    if (!isValid) return

try {
  setIsLoading(true)

  let loginData = {
    [loginId.includes("@") ? "email" : "phoneNumber"]: loginId.trim(),
    password,
  }

  console.log("Sending login request with payload:", loginData)

  let res = await loginUser(loginData) 
  console.log("Login success:", res)

  let { accessToken, refreshToken, user } = res.data || {}

  if (accessToken) localStorage.setItem("accessToken", accessToken)
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken)
  if (user) localStorage.setItem("user", JSON.stringify(user))

  let redirectTo = location.state?.from || "/"
  navigate(redirectTo, { replace: true })
} catch (err) {
  let status = err.response?.status
  let backendError = err.response?.data?.message || "An error occurred during login."

  if (status === 404) {
    setErrors({ loginId: "User does not exist", password: "" })
  } else if (status === 401) {
    setErrors({ loginId: "", password: "Incorrect password" })
  } else {
    setErrors({ loginId: backendError, password: "" })
    alert("Login failed")
  }
} finally {
  setIsLoading(false)
}}

   let handleGoogleLogin = async (credential) => {
    try {
      setIsLoading(true)
  
      let res = await googleAuthUser(credential)
  
  localStorage.setItem("user", JSON.stringify(res.data.user))
  localStorage.setItem("accessToken", res.data.accessToken)
  localStorage.setItem("refreshToken", res.data.refreshToken)
      navigate("/")
  
    } catch (error) {
      alert("Login failed")
    } finally {
      setIsLoading(false)
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

          <h2 className="text-2xl md:text-4xl font-semibold text-white" style={{fontFamily: 'serif'}}>Welcome Back!</h2>
          <p className="text-indigo-100 mt-1">Login to detect sarcasm in memes and text.</p>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="loginId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="loginId"
                name="loginId"
                value={loginId}
                disabled={isLoading}
                onChange={(e) => setLoginId(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  (errors.loginId==='Please enter your email or phone number' || errors.loginId==='User does not exist') ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="john@example.com or 1234567890"
              />
              <i className="fas fa-user absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {(errors.loginId==='Please enter your email or phone number' || errors.loginId==='User does not exist') && (<p className="mt-1 text-sm text-red-500">{errors.loginId}</p>
            )}
          </div>

          <div>
            <label htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  (errors.password || errors.loginId==='User does not exist') ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <i className={`fas ${ showPassword ? "fa-eye" : "fa-eye-slash" } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
            {errors.password && (<p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
          </div>

          <div className="text-right">
            <Link to="/forgotPassword"
              className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>

           <div className="space-y-3">
  <GoogleLogin
    onSuccess={(res) => {
      handleGoogleLogin(res.credential)
    }}
    onError={() => {
      alert("Login failed")
    }}
  />

  <div className="flex items-center gap-3">
    <div className="flex-1 h-px bg-gray-300"></div>
    <span className="text-sm text-gray-500">OR</span>
    <div className="flex-1 h-px bg-gray-300"></div>
  </div>
</div>

          <div>
            <button type="submit"
             disabled={isLoading}
              className={`${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                 } w-full cursor-pointer bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex justify-center items-center shadow-md hover:shadow-lg`}>
              <i className="fas fa-sign-in-alt mr-2"/> {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login