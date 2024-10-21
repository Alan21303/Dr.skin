'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ZoomIn } from 'lucide-react'
import Link from 'next/link'

// Mock data for predictions
const mockPredictions = [
  { id: 1, disease: 'Melanoma', date: '2023-10-15', description: 'Melanoma is a type of skin cancer that develops from the pigment-producing cells known as melanocytes. It is the most dangerous form of skin cancer.', image: '/placeholder.svg?height=300&width=300' },
  { id: 2, disease: 'Eczema', date: '2023-09-22', description: 'Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough. The condition is also called atopic dermatitis.', image: '/placeholder.svg?height=300&width=300' },
  { id: 3, disease: 'Psoriasis', date: '2023-08-30', description: 'Psoriasis is a skin disorder that causes skin cells to multiply up to 10 times faster than normal. This makes the skin build up into bumpy red patches covered with white scales.', image: '/placeholder.svg?height=300&width=300' },
  { id: 4, disease: 'Rosacea', date: '2023-07-18', description: 'Rosacea is a common skin condition that causes redness and visible blood vessels in your face. It may also produce small, red, pus-filled bumps.', image: '/placeholder.svg?height=300&width=300' },
  { id: 5, disease: 'Acne', date: '2023-06-05', description: 'Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells. It often causes whiteheads, blackheads or pimples.', image: '/placeholder.svg?height=300&width=300' },
]

export default function PredictionHistory() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch predictions
    setTimeout(() => {
      setPredictions(mockPredictions)
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-400 p-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h1 className="text-white text-2xl font-bold">Dr. Skin</h1>
          </div>
          <ul className="flex space-x-4">
            {[
              { name: 'Home', href: '/dr-skin-landing' },
              { name: 'Predictions', href: '/skin-disease-interface' },
              { name: 'History', href: '#skin-history' },
              { name: 'profile', href: '/profile-page' }
            ].map((item) => (
              <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.href}
                  className={`text-white hover:text-blue-200 hover:underline transition-colors ${
                    item.name === 'History' ? 'underline' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto pt-20 px-4 flex-grow">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 mt-8">Prediction History</h2>

        {/* Loader */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-blue-900 text-lg">Loading your history, please wait...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Grid */}
        <div id="skin-history" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {!loading &&
              predictions.map((prediction) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedPrediction(prediction)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">{prediction.disease}</h3>
                  <p className="text-gray-600 text-center">{prediction.date}</p>
                  <div className="mt-4 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
                    >
                      View Details <ChevronRight className="ml-1" size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Detailed View Modal */}
        <AnimatePresence>
          {selectedPrediction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedPrediction(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-blue-900">{selectedPrediction.disease}</h3>
                  <button
                    onClick={() => setSelectedPrediction(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{selectedPrediction.date}</p>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Disease Description</h4>
                    <p className="text-gray-700">{selectedPrediction.description}</p>
                  </div>
                  <div className="md:w-1/2">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Uploaded Image</h4>
                    <div className="relative">
                      <img
                        src={selectedPrediction.image}
                        alt={selectedPrediction.disease}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => setShowImageModal(true)}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <ZoomIn size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-size Image Modal */}
        <AnimatePresence>
          {showImageModal && selectedPrediction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedPrediction.image}
                  alt={selectedPrediction.disease}
                  className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                />
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>Powered by Dr. Skin AI</p>
              <div className="flex space-x-4 mt-2">
                <Link href="/privacy-policy" className="hover:text-blue-200 transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-blue-200 transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/social/facebook" className="hover:text-blue-200 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="/social/twitter" className="hover:text-blue-200 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0  01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936  4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39  0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="/social/instagram" className="hover:text-blue-200 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 17.176c-.76.856-1.633 1.5-2.632 1.917-1 .417-2.143.625-3.425.625-1.563 0-2.93-.305-4.102-.914-1.173-.61-2.075-1.506-2.707-2.687-.632-1.182-.948-2.564-.948-4.148 0-2.22.657-4.075 1.97-5.563 1.314-1.489 3.076-2.233 5.286-2.233 1.497 0 2.818.3 3.96.9 1.143.6 2.023 1.456 2.64 2.567.617 1.11.925 2.398.925 3.863 0 1.297-.234 2.425-.703 3.384-.47.958-1.134 1.693-1.993 2.204-.86.51-1.82.766-2.883.766-.552 0-.996-.114-1.333-.343-.337-.228-.54-.53-.61-.905h-.06c-.417.723-.97 1.288-1.66 1.694-.69.407-1.464.61-2.323.61-.99 0-1.78-.305-2.37-.914-.59-.61-.884-1.42-.884-2.433 0-1.297.395-2.425 1.184-3.384.79-.958 1.844-1.694 3.162-2.204 1.318-.51 2.764-.766 4.34-.766.58 0 1.158.038 1.734.114.576.076 1.138.19 1.684.343v-.458c0-.76-.21-1.367-.63-1.82-.42-.454-1.003-.68-1.748-.68-.552 0-1.05.114-1.494.343-.444.228-.84.532-1.187.91l-1.853-1.82c.52-.588 1.2-1.047 2.037-1.377.837-.33 1.718-.495 2.642-.495 1.702 0 3.054.418 4.056 1.255 1.002.837 1.503 2.102 1.503 3.795v8.63zm-7.963-1.49c.474 0 .907-.1 1.298-.298.39-.2.693-.477.908-.832.214-.355.32-.756.32-1.203 0-.74-.224-1.31-.673-1.71-.45-.4-1.074-.6-1.874-.6-.52 0-1.025.097-1.516.292-.49.194-.938.477-1.343.847-.405.37-.673.806-.804 1.308.58.74 1.292 1.307 2.135 1.7.842.394 1.686.59 2.53.59z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}