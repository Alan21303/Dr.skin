'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Info, ChevronDown, ChevronUp, Facebook, Twitter, Instagram } from 'lucide-react'

export default function SkinDiseaseInterface() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<{ disease: string } | null>(null)
  const [diseaseInfo, setDiseaseInfo] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      analyzeImage(selectedFile)
    }
  }

  const analyzeImage = (file: File) => {
    if (!file) return
    setIsAnalyzing(true)
    // Simulating image analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setPrediction({ disease: 'Melanoma' })
    }, 3000)
  }

  const fetchDiseaseInfo = () => {
    // Simulating API call to LLM
    setDiseaseInfo('Melanoma is a type of skin cancer that develops from the pigment-producing cells known as melanocytes. It is the most dangerous form of skin cancer. Symptoms include changes in existing moles or the development of new, unusual pigmented areas. Early detection and treatment are crucial for the best outcomes.')
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cream-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-400 p-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h1 className="text-white text-2xl font-bold">Dr. Skin</h1>
          </motion.div>
          <ul className="flex space-x-4">
            {[
              { name: 'Home', href: '/dr-skin-landing' },
              { name: 'Predictions', href: '/skin-disease-interface' },
              { name: 'History', href: 'prediction-history' },
              { name: 'profile', href: '/profile-page' }
            ].map((item) => (
              <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href={item.href} className="text-white hover:text-blue-200 hover:underline transition-colors">
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container mx-auto pt-20 px-4">
        {/* Image Upload Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Upload Skin Image for Disease Prediction</h2>
          <p className="text-gray-600 mb-6">Upload a clear image of the affected area for accurate results.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center mx-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="mr-2" />
            Upload Image
          </motion.button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png"
            className="hidden"
          />
          <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG. Max size: 5MB.</p>
          {file && (
            <div className="mt-4">
              <Image src={URL.createObjectURL(file)} alt="Uploaded skin" className="max-w-xs mx-auto rounded-lg shadow-md" />
              <button
                className="mt-2 text-red-500 hover:text-red-700 transition-colors"
                onClick={() => setFile(null)}
              >
                Remove Image
              </button>
            </div>
          )}
        </motion.section>

        {/* Loader Section */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <div className="inline-block">
                <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-blue-900 mt-4">Analyzing your image, please wait...</p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Disease Prediction Results Section */}
        <AnimatePresence>
          {prediction && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Predicted Disease</h2>
              <p className="text-gray-600 mb-4">Here&apos;s the result based on your uploaded image.</p>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">{prediction.disease}</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
                  onClick={fetchDiseaseInfo}
                >
                  <Info className="mr-2" />
                  Learn More
                </motion.button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Detailed Disease Description Section */}
        <AnimatePresence>
          {diseaseInfo && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Disease Information</h2>
              <p className="text-gray-600 mb-4">Detailed description of the predicted disease, symptoms, and possible treatments.</p>
              <div className="bg-gray-50 rounded-lg shadow-md p-6">
                <p className="text-gray-800 mb-4">{diseaseInfo}</p>
                {['Symptoms', 'Prevention', 'Treatment Options'].map((section) => (
                  <div key={section} className="mb-4">
                    <button
                      className="flex justify-between items-center w-full text-left text-blue-900 font-semibold py-2 border-b border-gray-200"
                      onClick={() => toggleSection(section)}
                    >
                      {section}
                      {expandedSection === section ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {expandedSection === section && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-700"
                      >
                        {section === 'Treatment Options' ? (
                          <p>Please consult with a certified doctor for proper treatment options.</p>
                        ) : (
                          <p>Detailed information about {section.toLowerCase()} would be displayed here.</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-500 text-white mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>Powered by Dr. Skin AI</p>
              <p className="text-sm">Contact: info@drskin.ai</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/social/facebook" className="hover:text-blue-200 transition-colors">
                <Facebook />
              </Link>
              <Link href="/social/twitter" className="hover:text-blue-200 transition-colors">
                <Twitter />
              </Link>
              <Link href="/social/instagram" className="hover:text-blue-200 transition-colors">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}