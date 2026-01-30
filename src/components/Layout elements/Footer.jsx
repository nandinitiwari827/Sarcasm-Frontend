import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/sarcasmLogo1.png"

const Footer = () => {
  return (
    <>
      <div className="h-[50px] overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86 82.39-16.72,168.19-17.73,250.45-.39 C823.78,31,906.67,72,985.66,92.83 c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35 A600.21,600.21,0,0,0,321.39,56.44Z" fill="#F97316"
          /></svg>
      </div>

      <footer className="bg-orange-500 text-white pt-8 pb-6 px-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left flex flex-col justify-between items-center md:items-start">
              <h2 className="text-2xl font-bold mb-2 hover:rotate-3 duration-300 flex">
                <img src={logo} width={35} className=""/>
                <span className="text-white pl-2">Sarc</span>
                <span className="text-orange-200">asm</span>
                <span className="text-white pl-2">AI</span>
              </h2>

              <p className="max-w-xs italic text-orange-100">
                "Because 'nice one bro' is rarely nice.🤔"
              </p>
            </div>

            <div className="flex space-x-6">
              <a href="https://x.com/NandiniTiwari28" target="_blank" className="text-white text-2xl transition-all duration-300 hover:text-[#1DA1F2] hover:rotate-6"
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a href="https://www.instagram.com/heyitsnandini.28/" target="_blank" className="text-white text-2xl transition-all duration-300 hover:text-[#E1306C] hover:rotate-6"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a href="https://www.linkedin.com/in/nandini-tiwari-b1058b250/" target="_blank" className="text-white text-2xl transition-all duration-300 hover:text-[#0077B5] hover:rotate-6"
              >
                <i className="fab fa-linkedin"></i>
              </a>

              <a href="https://github.com/nandinitiwari827" target="_blank" className="text-white text-2xl transition-all duration-300 hover:text-black hover:rotate-6"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-7">
            <div className="text-center md:text-right">
              <h3 className="font-bold mb-2 text-white">
                Contact Us
              </h3>

              <ul className="space-y-2 text-sm text-orange-100">
                <li className="flex items-center justify-center md:justify-end gap-2">
                  <i className="fas fa-phone"></i>
                  +91 8279904333
                </li>

                <li className="flex items-center justify-center md:justify-end gap-2">
                  <i className="fas fa-envelope"></i>
                  sarcasmai.project@gmail.com
                </li>
              </ul>
            </div>

             <div className="text-center md:text-right">
              <h3 className="font-bold mb-2 text-white">
                Legal
              </h3>

              <ul className="space-y-2 text-sm text-orange-100">
                <Link className="flex items-center justify-center md:justify-end gap-2 hover:underline hover:text-white">
                  FAQ
                </Link>

                <Link className="flex items-center justify-center md:justify-end gap-2 hover:underline hover:text-white">
                  Privacy
                </Link>
              </ul>
            </div>
            </div>
          </div>

          <div className="border-t border-orange-400 mt-8 pt-6 text-center text-orange-100 text-sm">
            <p> © 2025 Sarcasm AI. All rights reserved.{" "} </p>

            <p className="mt-1 text-xs"> Disclaimer: Our sarcasm detection is 100% accurate*
              <br />
              <span className="text-[10px]"> *Results may vary. Accuracy not guaranteed. May contain traces of irony.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer