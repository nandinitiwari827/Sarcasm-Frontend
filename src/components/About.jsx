import React, { useEffect } from "react";
import nandini from "../assets/nandini.jpg"
import avi from "../assets/avi.jpeg"
import sanky from "../assets/sanky.jpeg"
import story from "../assets/story.png"
import { motion } from "framer-motion"

let About = () => {

  useEffect(() => {
    let highlights = document.querySelectorAll(".sarcasm-highlight")

    highlights.forEach((highlight) => {
      highlight.addEventListener("mouseover", function () {
        this.style.animation = "none";
        void this.offsetWidth;
        this.style.animation = "sarcasmPulse 0.5s";
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 font-[Comic_Neue] text-gray-800 overflow-x-hidden">

      <section className="bg-gradient-to-br from-blue-100 to-purple-100 py-10 md:py-16 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{fontFamily:"cursive"}}>
          About <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">Us</span>{" "}
          <span className="text-sm align-top">*not really</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto" style={{fontFamily:"cursive"}}>
          We're building a <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">multimodal AI system </span> 
          that understands sarcasm, humor, and satire the way humans do — by analyzing text, images, speech tone, and visual context together.
        </p>
        <p className="text-xs md:text-base mb-8 max-w-3xl mx-auto" style={{fontFamily:"cursive"}}>
          Designed as a research-driven project to bridge the gap between human expression and machine understanding.</p>

        <div className="border-4 border-dashed border-red-400 rounded-xl max-w-xs md:max-w-sm mx-auto overflow-hidden bg-white">
          <img src="https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:85c4a9b5-ce9d-51ae-a972-663b328197eb/component?assetType=TEMPLATE&etag=b54e51fd01ab4822894553392fdeb900&revision=8e9aa898-91c9-40da-b2be-41f5864807e6&component_id=fd5c739c-ed7a-4cc7-90f7-f1692ca61c67"
            alt="meme"
            className="w-full"
          />
          <p className="p-2 text-sm italic">
            Our model detected 98.7% sarcasm here. The remaining 1.3% was emotional damage.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <motion.h2 animate={{ scale: [1, 1.06, 1], }}
      transition={{duration: 2.5, repeat: Infinity, ease: "easeInOut",
       }}
         className="text-2xl md:text-4xl font-semibold mb-6 md:mb-10 text-center" style={{fontFamily:"cursive"}}>
          <i className="fa-solid fa-book-open mr-4 text-3xl text-black"></i>
          Our <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">Totally True</span> Origin Story
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-lg">
            <p>
             This project began with a simple observation — modern online communication is rarely literal.
            </p>
            <p>
              Sarcasm, humor, satire, and exaggeration dominate memes, reels, and social media conversations, yet traditional AI systems struggle to understand them.
            </p>
            <p>
              Our earlier work focused on meme-based sarcasm detection using image-text inconsistency. This project extends that idea into a full-scale multimodal framework capable of deeper behavioral analysis.
            </p>
            <p>
              The goal was not just prediction, but interpretation — enabling AI to explain why content is sarcastic, humorous, or satirical.
            </p>
          </div>

          <img
            src={story}
            alt="devs"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      <section className="bg-yellow-50 p-10 mx-4 rounded-xl border-2 border-dashed border-yellow-300">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center" style={{fontFamily:"cursive"}}>
          <i className="fa-solid fa-fire-extinguisher text-3xl mr-3 text-black"></i>
          The <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">Complex Problem</span> We Solve
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-purple-700" style={{fontFamily:"cursive"}}>
              <i className="fa-solid fa-triangle-exclamation text-purple-700 mr-2"></i>
              The Crisis</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sarcasm is rarely literal</li>
              <li>Meaning often lies between words and visuals</li>
              <li>Humor depends on cultural and contextual cues</li>
              <li>Spoken sarcasm relies on tone, pitch, and facial expression</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-700" style={{fontFamily:"cursive"}}>
              <i className="fa-solid fa-lightbulb text-blue-700 mr-3"></i>
              Our Solution</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Text semantics using transformer models</li>
              <li>Visual cues using image encoders</li>
              <li>Audio tone using prosody features</li>
              <li>Cross-modal relationships using fusion networks</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-[#f5f5f5] text-[#333] px-4 py-16">
      <section className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-7 md:mb-12" style={{fontFamily:"cursive"}}>
          <i className="fas fa-users mr-2"></i>
          Meet Our <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">Highly Qualified</span> Team
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="team-card bg-white p-8 rounded-2xl shadow-md transition duration-300 transition-all duration-300 ease-in-out hover:rotate-[2deg] hover:translate-x-2 hover:shadow-2xl">
            <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-purple-300">
              <img src={nandini}
                alt="team"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold">Nandini Tiwari</h3>
            <p className="text-gray-600 mb-3">MERN Stack Developer</p>

            <p className="italic text-sm mb-4">
              "Responsible for designing and developing the complete web interface of the Sarcasm Detection System, including authentication, user experience, responsiveness, and seamless frontend–backend integration."
            </p>

           <div className="flex justify-center gap-4 text-lg">
              <a href="https://www.instagram.com/heyitsnandini.28/" target="_blank" className="text-pink-500 hover:text-pink-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/nandini-tiwari-b1058b250/" target="_blank" className="text-blue-700 hover:text-blue-900">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/nandinitiwari827" target="_blank" className="text-gray-700 hover:text-black">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="team-card bg-white p-8 rounded-2xl shadow-md transition duration-300 transition-all duration-300 ease-in-out hover:rotate-[2deg] hover:translate-x-2 hover:shadow-2xl">
            <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-blue-300">
              <img src={sanky}
                alt="team"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold">Sankeerth Latheesh</h3>
            <p className="text-gray-600 mb-3">AI Engineer</p>

            <p className="italic text-sm mb-4">
              "Worked on building and training the sarcasm detection model using machine learning and deep learning techniques. Focused on text understanding, contextual analysis, and improving prediction accuracy."
            </p>

            <div className="flex justify-center gap-4 text-lg">
              <a href="https://www.instagram.com/sankeerrrth/" target="_blank" className="text-pink-500 hover:text-pink-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://in.linkedin.com/in/sankeerth-latheesh-a88bb1353" target="_blank" className="text-blue-700 hover:text-blue-900">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/sankeerthl/" target="_blank" className="text-gray-700 hover:text-black">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="team-card bg-white p-8 rounded-2xl shadow-md transition duration-300 transition-all duration-300 ease-in-out hover:rotate-[2deg] hover:translate-x-2 hover:shadow-2xl">
            <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-yellow-300">
              <img src={avi}
                alt="team"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold">Avi Bindal</h3>
            <p className="text-gray-600 mb-3"> Frontend & AI Developer </p>

            <p className="italic text-sm mb-4">
              "Contributed to frontend development and assisted in AI integration. Worked on connecting the trained model with the user interface and improving real-time prediction flow."
            </p>

             <div className="flex justify-center gap-4 text-lg">
              <a href="https://www.instagram.com/avi_bindal_/" target="_blank" className="text-pink-500 hover:text-pink-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/avi-bindal-720b46354/" target="_blank" className="text-blue-700 hover:text-blue-900">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/avibindal" target="_blank" className="text-gray-700 hover:text-black">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>

      <section className="container mx-auto px-4 py-10 md:py-16 bg-gradient-to-r from-purple-300 to-blue-300">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-7 md:mb-10" style={{fontFamily:"cursive"}}>
          <i className="fa-solid fa-gears text-3xl mr-3"></i>
          How It <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">Works</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-xl font-bold mb-2">1. Input Understanding</h3>
            <p>
              Upload meme images, text, or video clips. The system automatically identifies the input modality and prepares it for analysis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-xl font-bold mb-2">2. AI Analysis & Sarcasm Detection</h3>
            <p>
              The AI model analyzes linguistic tone, emotional cues, contextual meaning, and visual features to determine whether the content is sarcastic or literal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <div className="text-4xl mb-3">🎭</div>
            <h3 className="text-xl font-bold mb-2">3. Interpretable Output</h3>
            <p>
             After processing, the system presents the final prediction along with meaningful insights, helping users understand how sarcasm was identified and how human communication patterns influence AI interpretation.
            </p>
          </div>

        </div>
      </section>

<section className="container mx-auto px-4 py-12 md:py-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mt-20">

  <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ fontFamily: "cursive" }}>
    <i className="fa-solid fa-graduation-cap text-3xl mr-3"></i>
    Academic <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent italic">
      Relevance
    </span>
  </h2>

  <p className="text-center max-w-4xl mx-auto text-lg mb-10 text-gray-700">
    This project is designed as a <b>research-oriented AI system</b> focusing on multimodal learning, human communication patterns, and explainable artificial intelligence.
  </p>

  <div className="grid md:grid-cols-3 gap-8">
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition hover:scale-[1.03]">
      <div className="text-4xl mb-3 text-purple-600 text-center">
        <i className="fa-solid fa-brain"></i>
      </div>

      <h3 className="text-xl font-bold text-center mb-2"> Multimodal Learning </h3>

      <p className="text-center text-gray-600">
        Combines text, image, audio, and video understanding into a unified AI model, demonstrating real-world multimodal intelligence.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition hover:scale-[1.03]">
      <div className="text-4xl mb-3 text-blue-600 text-center">
        <i className="fa-solid fa-diagram-project"></i>
      </div>

      <h3 className="text-xl font-bold text-center mb-2"> Research-Oriented Architecture </h3>

      <p className="text-center text-gray-600">
        Implements transformer models, feature extraction pipelines, and fusion strategies aligned with modern AI research methodologies.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition hover:scale-[1.03]">
      <div className="text-4xl mb-3 text-green-600 text-center">
        <i className="fa-solid fa-magnifying-glass-chart"></i>
      </div>

      <h3 className="text-xl font-bold text-center mb-2"> Explainable AI </h3>

      <p className="text-center text-gray-600">
        Focuses on interpretability by explaining why content is sarcastic, humorous, or satirical — not just predicting outcomes.
      </p>
    </div>
  </div>

  <div className="mt-12 text-center text-gray-700 italic">
    "Built to explore how Artificial Intelligence understands human emotions, humor, and real-world communication."
  </div>
 </section>
  </div>
  )
}

export default About