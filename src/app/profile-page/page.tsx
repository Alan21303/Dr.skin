/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Camera, CheckCircle, AlertCircle, Calendar, Clock } from 'lucide-react'

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [activeTab, setActiveTab] = useState('medical-history')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    dateOfBirth: '1990-01-01',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    medicalId: 'DR1234567',
    medicalHistory: 'No known allergies. Had appendectomy in 2015.',
    medications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
    chronicDiseases: ['Hypertension', 'Type 2 Diabetes']
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoSaving) {
        setAutoSaving(false)
        setSuccessMessage('Changes auto-saved successfully')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData, autoSaving])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setAutoSaving(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setSaving(true)
    // Simulating API call
    setTimeout(() => {
      setSaving(false)
      setSuccessMessage('Profile updated successfully')
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 2000)
  }

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
              { name: 'History', href: '/prediction-history' },
              { name: 'User Profile', href: '/profile-page' },
              { name: 'Logout', href: '/login-page' }
            ].map((item) => (
              <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.href}
                  className={`text-white hover:text-blue-200 hover:underline transition-colors ${
                    item.name === 'Profile' ? 'underline' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
          <User className="text-white" size={24} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto pt-20 px-4 flex-grow">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 mt-8">Your Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <motion.div
              className="w-40 h-40 rounded-full border-4 border-blue-400 shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              {profileImage ? (
                <Image src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <User size={64} className="text-gray-400" />
                </div>
              )}
            </motion.div>
            <motion.button
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={20} />
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="medicalId" className="block text-sm font-medium text-gray-700 mb-1">
                Medical ID
              </label>
              <input
                type="text"
                id="medicalId"
                name="medicalId"
                value={formData.medicalId}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-1">
                Medical History Summary
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Medical Information Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            {['Medical History', 'Current Medications', 'Doctor Visits'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 text-center py-3 px-4 font-medium ${
                  activeTab === tab.toLowerCase().replace(' ', '-')
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'medical-history' && (
                <motion.div
                  key="medical-history"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h4 className="text-lg font-semibold mb-4">Medical History</h4>
                  <ul className="list-disc pl-5">
                    <li>Appendectomy in 2015</li>
                    <li>No known allergies</li>
                    <li>Family history of hypertension</li>
                  </ul>
                </motion.div>
              )}
              {activeTab === 'current-medications' && (
                <motion.div
                  key="current-medications"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h4 className="text-lg font-semibold mb-4">Current Medications</h4>
                  <ul className="list-disc pl-5">
                    {formData.medications.map((medication, index) => (
                      <li key={index}>{medication}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {activeTab === 'doctor-visits' && (
                <motion.div
                  key="doctor-visits"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h4 className="text-lg font-semibold mb-4">Recent Doctor Visits</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Calendar className="mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">Annual Check-up</p>
                        <p className="text-sm text-gray-600">March 15, 2024</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">Dermatology Consultation</p>
                        <p className="text-sm text-gray-600">January 5, 2024</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>

        {/* Feedback Messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
            >
              <CheckCircle className="mr-2" />
              {successMessage}
            </motion.div>
          )}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50  }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
            >
              <AlertCircle className="mr-2" />
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-save Indicator */}
        {autoSaving && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="flex items-center">
              <Clock className="mr-2 animate-spin" size={16} />
              Auto-saving...
            </span>
          </div>
        )}
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
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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