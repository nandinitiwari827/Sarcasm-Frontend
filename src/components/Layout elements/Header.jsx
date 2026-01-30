import { useState, useRef, useEffect } from "react"
import React from 'react'
import logo from "../../assets/sarcasmLogo.jpg"
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../api.js"

function Header() {
  let [isOpen, setIsOpen] = useState(false)
  let [logoutClicked, setLogoutClicked] = useState(false)
  let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  let [showMenu, setShowMenu] = useState(false)

  let navigate = useNavigate()
  let modalRef = useRef(null)

   useEffect(() => {
    let handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setLogoutClicked(false)
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
  }}, [])

  let handleLogout = async () => {
  try {
    await logoutUser() 
  } catch (error) {
    console.warn("Logout API failed, clearing local session anyway")
  } finally {
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    setUser(null)
    navigate("/login")
  }
}

  return (
    <div className='sticky z-10 top-0'>
        <div className='flex justify-between bg-white/50 border-white border-b-2 py-3 md:py-5 px-4 items-center'>
       <div className='flex gap-x-2 items-center pl-2 pr-20'>
        <Link to='/' className="flex gap-x-2 items-center pl-2"><img src={logo} width={35}/>
         <p className='font-bold text-lg lg:text-xl' style={{fontFamily: 'sans-serif'}}>SARCASM AI</p>
         </Link>

          <NavLink to='/about' className={({ isActive }) => `hover:text-white hidden md:block hover:bg-[#0C0B71] font-semibold duration-400 text-sm py-1.5 px-6 ml-5 rounded-3xl ${ isActive ? 'text-white bg-[#0C0B71]' : 'text-gray-400 bg-white'}`}>
              About Us
            </NavLink>
       </div>

     <div className='hidden md:flex gap-x-2 items-center pr-2'>
    {!user ? (
    <>
      <button onClick={()=>navigate('/register')} className='bg-white py-1.5 px-6 rounded-3xl text-gray-400 cursor-pointer hover:text-white text-sm hover:bg-[#0C0B71] font-semibold duration-400'>
        Sign up
      </button>

      <button onClick={()=>navigate('/login')} className='bg-white py-1.5 px-6 rounded-3xl text-gray-400 cursor-pointer hover:text-white text-sm hover:bg-[#0C0B71] font-semibold duration-400'>
        Log in
      </button>
    </>
     ) : (
      <div className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
       >
      <button className="bg-white group flex gap-x-1.5 items-center py-1.5 px-6 rounded-3xl text-[#0C0B71] font-semibold text-sm cursor-pointer hover:bg-[#0C0B71] hover:text-white duration-300">
        Hi, {user.fullName.split(" ")[0]}
        <svg xmlns="http://www.w3.org/2000/svg" 
        className="group-hover:text-white text-[#0C0B71] duration-300"
        width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"/></svg>
      </button>

      {showMenu && (
        <div className="z-40">
       <svg xmlns="http://www.w3.org/2000/svg"
       className="absolute left-12"
        width="20" height="20" viewBox="0 0 20 20"><path fill="#0C0B71" d="M10 15L2 5h16z"/></svg>
       
        <div className="absolute right-0 mt-4 bg-white shadow-xl rounded-lg border border-gray-300 w-45 py-2 text-sm">
          <button className="w-full group text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-1.5"
         
         onClick={() => navigate('/forgotPassword')}>
          <svg xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 group-hover:text-[#0C0B71]" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M.628 1.166a.5.5 0 0 1 .575-.123l13.5 6a.5.5 0 0 1 0 .914l-13.5 6a.5.5 0 0 1-.635-.709L3.921 7.5L.568 1.752a.5.5 0 0 1 .06-.586M4.845 7.1H9l.081.008a.4.4 0 0 1 0 .784L9 7.9H4.845l-2.633 4.513L13.269 7.5L2.212 2.586z"/>
          </svg>
            Forgot Password
          </button>

          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-1.5 group"
            onClick={() => navigate('/changePassword')}
          >
           <svg xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 group-hover:text-[#0C0B71]" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M.628 1.166a.5.5 0 0 1 .575-.123l13.5 6a.5.5 0 0 1 0 .914l-13.5 6a.5.5 0 0 1-.635-.709L3.921 7.5L.568 1.752a.5.5 0 0 1 .06-.586M4.845 7.1H9l.081.008a.4.4 0 0 1 0 .784L9 7.9H4.845l-2.633 4.513L13.269 7.5L2.212 2.586z"/>
          </svg>
            Change Password
          </button>

          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-1.5 group"
            onClick={()=>setLogoutClicked(true)}>
          <svg xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 group-hover:text-red-600" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M.628 1.166a.5.5 0 0 1 .575-.123l13.5 6a.5.5 0 0 1 0 .914l-13.5 6a.5.5 0 0 1-.635-.709L3.921 7.5L.568 1.752a.5.5 0 0 1 .06-.586M4.845 7.1H9l.081.008a.4.4 0 0 1 0 .784L9 7.9H4.845l-2.633 4.513L13.269 7.5L2.212 2.586z"/>
          </svg>
            Logout
          </button>
        </div>
        </div>
      )}
    </div>
     )}
      </div>

           {logoutClicked && (
           <div className='w-screen h-screen bg-black/60 backdrop-blur-sm fixed left-0 top-0 flex justify-center items-center text-center z-50'>
           <div ref={modalRef} className='bg-white rounded-lg flex flex-col p-6'>
           <p className='text-lg w-45'>Are you sure you want to logout?</p>
           <div className='flex w-full justify-evenly mt-6 font-semibold'>
             <button onClick={handleLogout} className='bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-md cursor-pointer'>
                Yes
                </button>

                  <button onClick={() => setLogoutClicked(false)} className='bg-green-500 hover:bg-green-400 text-white px-5 py-2 rounded-md cursor-pointer'>
                     No
                   </button>
                   </div>
                </div>
            </div>
            )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/30 transition-all"
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </div>

       {isOpen && (
        <div className="lg:hidden absolute top-full left-4 md:left-10 right-4 md:right-10 mt-2 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white overflow-hidden animate-fadeIn">
          <div className="flex flex-col py-4 px-6 space-y-3">

            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>`py-3 px-6 md:mx-20 rounded-3xl border-2 border-gray-300 text-center font-semibold text-sm transition-all ${isActive ? 'bg-[#0C0B71] text-white' : 'text-gray-400 hover:bg-gray-100'}`}>About Us
            </NavLink>

          <div className="border-t border-gray-200 pt-4 mt-2 space-y-3 flex flex-col items-center justify-center">
         {!user ? (
           <>
      <button onClick={()=>navigate('/register')} className='bg-white py-1.5 px-6 rounded-3xl text-gray-400 cursor-pointer hover:text-white text-sm hover:bg-[#0C0B71] font-semibold duration-400'>
        Sign up
      </button>

      <button onClick={()=>navigate('/login')} className='bg-white py-1.5 px-6 rounded-3xl text-gray-400 cursor-pointer hover:text-white text-sm hover:bg-[#0C0B71] font-semibold duration-400'>
        Log in
      </button>
    </>
     ) : (
      <div className="relative"
      ref={modalRef}>
      <button className="bg-white group flex gap-1.5 items-center py-1.5 px-6 rounded-3xl text-[#0C0B71] font-semibold text-sm cursor-pointer hover:bg-[#0C0B71] hover:text-white duration-300"
      onClick={() => setShowMenu(prev => !prev)}>
        Hi, {user.fullName.split(" ")[0]}
        <svg xmlns="http://www.w3.org/2000/svg" 
        className="group-hover:text-white text-[#0C0B71] duration-300"
        width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"/></svg>
      </button>

      {showMenu && (
      <div className="z-40">
     <svg xmlns="http://www.w3.org/2000/svg" 
     className="absolute left-25 bottom-7"
     width="20" height="20" viewBox="0 0 20 20"><path fill="#0C0B71" d="m10 5l8 10H2z"/>
     </svg>
        <div className="absolute -top-25 left-4 bg-white shadow-xl rounded-lg border border-gray-300 w-40 text-xs z-40">
          <button className="w-full group text-left px-4 py-1.5 hover:bg-gray-100 flex items-center gap-1.5"
         
         onClick={() => navigate('/forgotPassword')}>
          <svg xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 group-hover:text-[#0C0B71]" width="12" height="12" viewBox="0 0 15 15"><path fill="currentColor" d="M.628 1.166a.5.5 0 0 1 .575-.123l13.5 6a.5.5 0 0 1 0 .914l-13.5 6a.5.5 0 0 1-.635-.709L3.921 7.5L.568 1.752a.5.5 0 0 1 .06-.586M4.845 7.1H9l.081.008a.4.4 0 0 1 0 .784L9 7.9H4.845l-2.633 4.513L13.269 7.5L2.212 2.586z"/>
          </svg>
            Forgot Password
          </button>

          <button className="w-full text-left px-4 py-1.5 hover:bg-gray-100 flex items-center gap-1.5 group"
            onClick={() => navigate('/changePassword')}
          >
           <svg xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 group-hover:text-[#0C0B71]" width="12" height="11" viewBox="0 0 15 15"><path fill="currentColor" d="M.628 1.166a.5.5 0 0 1 .575-.123l13.5 6a.5.5 0 0 1 0 .914l-13.5 6a.5.5 0 0 1-.635-.709L3.921 7.5L.568 1.752a.5.5 0 0 1 .06-.586M4.845 7.1H9l.081.008a.4.4 0 0 1 0 .784L9 7.9H4.845l-2.633 4.513L13.269 7.5L2.212 2.586z"/>
          </svg>
            Change Password
          </button>

          <button className="w-full text-left px-4 py-1.5 hover:bg-gray-100 text-red-600 flex items-center gap-1.5 group"
            onClick={()=>setLogoutClicked(true)}>
          <svg xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 group-hover:text-red-600" width="12" height="12" viewBox="0 0 15 15"><path fill="currentColor" d="M.628 1.166a.5.5 0 0 1 .575-.123l13.5 6a.5.5 0 0 1 0 .914l-13.5 6a.5.5 0 0 1-.635-.709L3.921 7.5L.568 1.752a.5.5 0 0 1 .06-.586M4.845 7.1H9l.081.008a.4.4 0 0 1 0 .784L9 7.9H4.845l-2.633 4.513L13.269 7.5L2.212 2.586z"/>
          </svg>
            Logout
          </button>
        </div>
        </div>
      )}
    </div>
     )}
            </div>
          </div>
        </div>
      )}
     </div>
  )
}

export default Header