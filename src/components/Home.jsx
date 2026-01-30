import React, { useState } from "react"
import { detectSarcasmAPI } from "../api.js"

let Home = () => {
  let [image, setImage] = useState(null)
  let [preview, setPreview] = useState(null)
  let [url, setUrl] = useState("")
  let [loading, setLoading] = useState(false)
  let [result, setResult] = useState(null)

 let MAX_FREE_USES = 5

let handleFileUpload = (e) => {
    let file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setUrl("")
}

let handleUrlUpload = async () => {
  if (!url.trim()) return alert("Enter image URL")

  try {
 setImage(null)
 setPreview(url)

  } catch (err) {
    alert("Invalid image URL")
  }
}

let detectSarcasm = async () => {
  if (!image && !url) return alert("Upload a meme first!")

  setLoading(true)
  setResult(null)

  try {
    let formData = new FormData()
    if (image) {
  formData.append("image", image)
}

if (url) {
  formData.append("image_url", url)
}

    let isLoggedIn = localStorage.getItem("user")

let usedCount = Number(localStorage.getItem("sarcasm_uses")) || 0

if (!isLoggedIn && usedCount >= MAX_FREE_USES) {
  alert("Please login to continue using Sarcasm AI 🔐")
  window.location.href = "/login"
  return
}

    let data = await detectSarcasmAPI(formData)

    setResult({
      score: Math.round(data.sarcasm_probability * 100),
      label: data.result
    })

     if (!isLoggedIn) {
    localStorage.setItem("sarcasm_uses", usedCount + 1)
  }

  } catch (err) {
    alert("Something went wrong while analyzing meme")
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center px-4 overflow-hidden">

<img src="https://i.pinimg.com/736x/49/6b/70/496b700622294cf956e9c1b399afbac6.jpg"
  className="hidden md:block absolute top-16 left-10 w-28 rotate-[-10deg] opacity-80"
/>

<img src="https://i.pinimg.com/736x/96/b5/fb/96b5fb0ef9a77d40875fc9c27f0de80b.jpg"
  className="hidden md:block absolute bottom-24 left-20 w-32 rotate-[8deg] opacity-80"
/>

<img src="https://i.pinimg.com/736x/b4/78/4f/b4784f7ff38d0545defbb756669ee836.jpg"
  className="hidden md:block absolute top-20 right-14 w-28 rotate-[10deg] opacity-80"
/>

<img src="https://i.pinimg.com/736x/11/1f/46/111f46523726e0a85dd6f4e1f9679422.jpg"
  className="hidden md:block absolute bottom-24 right-14 w-32 rotate-[-8deg] opacity-80"
/>

      <div className="relative max-w-4xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mt-15 mb-30 border border-orange-200">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-30"></div>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600"> Meme Sarcasm Detector
          </h1>
          <p className="text-gray-600 mt-2 italic"> Because not every meme is funny — some are just emotionally sarcastic 😌
         </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center flex flex-col items-center justify-center hover:bg-orange-50 transition">
            <i className="fas fa-image text-4xl text-orange-500 mb-3"></i>
            <p className="font-semibold mb-2">Upload from device</p>

            <label className="cursor-pointer bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 inline-block">
              Choose Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center hover:bg-orange-50 transition">
            <i className="fas fa-link text-4xl text-orange-500 mb-3"></i>
            <p className="font-semibold mb-2">Paste meme URL</p>

            <input
              type="text"
              placeholder="https://meme-image-url..."
              className="w-full border rounded-lg px-4 py-2 mb-3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button onClick={handleUrlUpload}
              className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Load Image
            </button>
          </div>
        </div>

        {preview && (
          <div className="mt-8 text-center">
            <img src={preview}
              alt="preview"
              className="max-h-80 mx-auto rounded-xl shadow-md"
            />
          </div>
        )}

        <div className="text-center mt-8">
          <button onClick={detectSarcasm}
            className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-700 text-white px-10 py-3 rounded-full text-lg font-semibold hover:scale-105 transition"
          >
            Detect Sarcasm 🔍
          </button>
        </div>

        {loading && (
          <div className="text-center mt-8">
            <i className="fas fa-spinner fa-spin text-4xl text-orange-600"></i>
            <p className="mt-2 font-medium"> Analyzing meme vibes... </p>
          </div>
        )}

        {result && (
          <div className="mt-10 bg-orange-50 border border-orange-300 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-orange-600 mb-3"> Analysis Result </h3>

            <p className="text-lg mb-2"><b>Sarcasm Level:</b> {result.score}%
            </p>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-orange-600 h-2 rounded transition-all"
                style={{ width: `${result.score}%` }}
              ></div>
            </div>

            <p className="mt-4 text-xl font-semibold"> {result.label} </p>

            <p className="text-gray-600 mt-2"> Our AI analyzed visual cues, expressions, and meme context to determine the sarcasm intensity.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home