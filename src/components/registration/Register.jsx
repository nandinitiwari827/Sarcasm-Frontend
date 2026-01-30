import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import logo from "../../../../SarcasmModelfrontend/sarcasmLogo.jpg"
import { registerUser, googleAuthUser } from "../../api"
import { GoogleLogin } from "@react-oauth/google"

let Register = () => {
  let [fullname, setFullname] = useState("")
  let [email, setEmail] = useState("")
  let [phoneNumber, setPhoneNumber] = useState("")
  let [password, setPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")
  let [termsAccepted, setTermsAccepted] = useState(false)
  let [isLoading, setIsLoading]=useState(false)
  let navigate=useNavigate()

  let [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: "",
  })

  let [showPassword, setShowPassword] = useState(false)
  let [showConfirmPassword, setShowConfirmPassword] = useState(false)

  let [strength, setStrength] = useState(0)
  let [strengthColor, setStrengthColor] = useState("#e5e7eb")

  let [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  let phoneRegex = /^[0-9]{10}$/
  let emailRegex = /^[\w.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  let updatePasswordStrength = (pwd) => {
    let s = 0

    let lengthCheck = pwd.length >= 8
    let uppercaseCheck = /[A-Z]/.test(pwd)
    let lowercaseCheck = /[a-z]/.test(pwd)
    let numberCheck = /\d/.test(pwd)
    let specialCheck = /[@$!%*?&]/.test(pwd)

    if (pwd.length >= 8) s += 20
    if (pwd.length >= 12) s += 10
    if (uppercaseCheck) s += 20
    if (lowercaseCheck) s += 20
    if (numberCheck) s += 20
    if (specialCheck) s += 20

    s = Math.min(s, 100)
    setStrength(s)

    if (!pwd) {
      setStrengthColor("#e5e7eb")
    } else if (s < 40) {
      setStrengthColor("#ef4444") 
    } else if (s < 70) {
      setStrengthColor("#f59e0b") 
    } else {
      setStrengthColor("#10b981")
    }

    setChecks({
      length: lengthCheck,
      uppercase: uppercaseCheck,
      lowercase: lowercaseCheck,
      number: numberCheck,
      special: specialCheck,
    })
  }

  let handlePasswordChange = (e) => {
    let pwd = e.target.value
    setPassword(pwd)
    updatePasswordStrength(pwd)

    if (confirmPassword && pwd !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }))
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }))
    }
  }

  let handleConfirmPasswordChange = (e) => {
    let value = e.target.value
    setConfirmPassword(value)

    if (password && value && password !== value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }))
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }))
    }
  }

  let iconClass = (check) =>
    check
      ? "fas fa-check-circle text-green-500 mr-1"
      : "fas fa-times-circle text-red-500 mr-1"

   let textClass = () =>"text-xs text-gray-500 ml-1"

  let handleSubmit = async(e) => {
    e.preventDefault()
    let isValid = true

    let newErrors = {
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: "",
    }

    if (!fullname.trim()) {
      newErrors.fullname = "Please enter your full name"
      isValid = false
    }

    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number"
      isValid = false
    }

    if (!password || !passwordRegex.test(password)) {
      newErrors.password = "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
      isValid = false
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    if (!termsAccepted) {
      newErrors.terms = "You must agree to the terms and conditions"
      isValid = false
    }

    setErrors(newErrors)

   if (!isValid) return

  try {
    setIsLoading(true)

    await registerUser({
       fullName: fullname.trim(),
       email: email.trim(),
       phoneNumber: phoneNumber.trim(),
       password,
       verifyPassword: confirmPassword,
    })
 
    alert("Registration successful!")
    navigate("/login")

  } 
catch(err){
     let status=err.response?.status
    let backendError=err.response?.data?.message || "An error occurred during register."
   
   if(status===408){
    setErrors({
        fullName: '',
        email: 'User with email already exists',
        phoneNumber: '',
        password: '',
        verifyPassword: '',
        terms:''
    })
   }else if (status === 409) {
        setErrors({
          fullName: '',
          email: '',
          phoneNumber: 'User with phone number already exists',
          password: '',
          verifyPassword: '',
          terms:''
        })
      }else{
        setErrors({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        verifyPassword: '',
        terms: backendError
       })
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
    alert("Logged in with Google successfully")
    navigate("/")

  } catch (error) {
    alert("Google login failed")
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

          <h2 className="text-2xl md:text-4xl font-semibold text-white" style={{fontFamily: 'serif'}}>
            Create Your Account
          </h2>
          <p className="text-indigo-100 mt-1">Helping AI understand human sarcasm.</p>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                disabled={isLoading}
                onChange={(e) => setFullname(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              <i className="fas fa-user absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            {errors.fullname && (<p className="mt-1 text-sm text-red-500">{errors.fullname}</p>
            )}
          </div>

          <div>
            <label htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="john@example.com"
              />
              <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            {errors.email && (<p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                disabled={isLoading}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1234567890"
              />
              <i className="fas fa-phone absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            {errors.phoneNumber && (<p className="mt-1 text-sm text-red-500">{errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Create Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                disabled={isLoading}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <i className={`fas ${ showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
            </div>

            <div className="h-1 bg-gray-200 rounded mt-2 overflow-hidden">
              <div className="h-full transition-all duration-300" style={{ width: `${strength}%`, backgroundColor: strengthColor,}}
              ></div>
            </div>

            {errors.password && (<p className="mt-1 text-sm text-red-500">{errors.password}</p> 
           )}

            <div className="mt-2 space-y-1">
           <p className={textClass()}>
  <i className={iconClass(checks.length)}></i>
  At least 8 characters
</p>

<p className={textClass()}>
  <i className={iconClass(checks.uppercase)}></i>
  At least one uppercase letter
</p>

<p className={textClass()}>
  <i className={iconClass(checks.lowercase)}></i>
  At least one lowercase letter
</p>

<p className={textClass()}>
  <i className={iconClass(checks.number)}></i>
  At least one number
</p>

<p className={textClass()}>
  <i className={iconClass(checks.special)}></i>
  At least one special character
</p>
         
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                disabled={isLoading}
                onChange={handleConfirmPasswordChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pr-10 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <i
                className={`fas ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowConfirmPassword((prev) => !prev)
                }
              ></i>
            </div>
            {errors.confirmPassword && (<p className="mt-1 text-sm text-red-500">{errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                disabled={isLoading}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms"
                className="font-medium text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500"
                >
                  Terms and Conditions
                </a>
              </label>
              {errors.terms && (<p className="mt-1 text-sm text-red-500">{errors.terms}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
  <GoogleLogin
    onSuccess={(res) => {
      handleGoogleLogin(res.credential);
    }}
    onError={() => {
      alert("Google login failed");
    }}
  />

  <div className="flex items-center gap-3">
    <div className="flex-1 h-px bg-gray-300"></div>
    <span className="text-sm text-gray-500">OR</span>
    <div className="flex-1 h-px bg-gray-300"></div>
  </div>
</div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} w-full cursor-pointer text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex justify-center items-center shadow-md hover:shadow-lg`}
            >
             <i className="fas fa-robot mr-2"></i>
               {isLoading ? 'Registering...' : "Register"}
            </button>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in 
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register